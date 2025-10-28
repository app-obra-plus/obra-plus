import { prisma } from "../../database/client";
import { BadRequestError } from "../../exception/BadRequestError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { ForbiddenAccessError } from "../../exception/ForbiddenAccessError";
import { buildPagination } from "../../utils/pagination/pagination";
import { PaginatedResponse, PaginationParamsBase } from "../../utils/pagination/pagination.types";
import { ChatSummaryDto } from "./dto/ChatSummaryDto";
import { CreateChatDto } from "./dto/CreateChatDto";
import { ChatMapper } from "./dto/mapper/ChatMapper";
import { MessageDto, MessageResponse } from "./dto/MessageDto";
import { ChatResponseDto } from "./dto/ResponseChatDto";

export class ChatService {

    async getChatById(chatId: string): Promise<ChatResponseDto>{

        const fullChat = await prisma.chat.findUnique({
            where: { id: chatId },
            select: {
                id: true,
                name: true,
                type: true,
                createdAt: true,
                participants: {
                    select:{
                        role: true,
                        joinedAt: true,
                        user: {
                            select:{
                                id: true,
                                email: true,
                                first_name: true,
                                last_name: true,
                                profile_picture: true
                            }
                        }
                    }
                }
            }
        });

        if (!fullChat) {
            throw new EntityNotFoundError("Chat", chatId);
        }
        
        const response = ChatMapper.toResponseDto(fullChat);
        return response;
    }

    async createChat(chat: CreateChatDto): Promise<ChatResponseDto>{

        const chatDb = await prisma.chat.create({
            data:{name: chat.chatName}
        });

        const participantsData = chat.participantsId.map((userId) => ({
            chatId: chatDb.id,
            userId
        }));

        await prisma.chatParticipant.createMany({
            data: participantsData,
            skipDuplicates: true,
        });

        const fullChat = await this.getChatById(chatDb.id);
        
        return fullChat;
    }
    
    async sendMessage(message: MessageDto): Promise<MessageDto>{
        const data = message;
        await this.validateChatParticipant(data.senderId, data.chatId);
        const messageDb = await prisma.message.create({data});
        const  response = ChatMapper.toMessageDto(messageDb);
        return response;
    }

    async getAllChatsByUser(userId: string, params: PaginationParamsBase): Promise<PaginatedResponse<ChatSummaryDto>>{
        
        const { page, limit} = params;
        const skip = (page - 1) * limit;

        
        const [chats, total] = await Promise.all([
            prisma.chatParticipant.findMany({
                where: {
                    userId: userId,
                    isActive: true,
                },
                skip,
                take: limit,
                select: {
                    role: true,
                    joinedAt: true,
                    chat: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                            createdAt: true,
                            participants: {
                                select: {
                                    role: true,
                                    joinedAt: true,
                                    user: {
                                        select: {
                                            id: true,
                                            email: true,
                                            first_name: true,
                                            last_name: true,
                                            profile_picture: true,
                                        },
                                    },
                                },
                            },
                            messages: {
                                orderBy: { createdAt: "desc" },
                                take: 1,
                                select: {
                                    id: true,
                                    content: true,
                                    createdAt: true,
                                    sender: {
                                        select: {
                                            first_name: true,
                                            last_name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            prisma.chatParticipant.count({
                where:{
                    userId: userId,
                    isActive: true,
                }
            })
        ])

        const chatsResponse = ChatMapper.toSummaryList(chats);
        const sortedChats = chatsResponse.toSorted((a, b) => {
            const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
            const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
            return dateB - dateA; 
        });

        return {
            data: sortedChats,
            pagination: buildPagination({total, page, limit}),
        }
    }

    async getAllMessagesFromChatPage(chatId: string, userId: string, params: PaginationParamsBase): Promise<PaginatedResponse<MessageResponse>>{

        const { page, limit} = params;
        const skip = (page - 1) * limit;
        
        await this.validateChatParticipant(userId, chatId);
        
        const [messages, total] = await Promise.all([
            prisma.message.findMany({
                orderBy: { createdAt: "desc" },
                where:{chatId: chatId},
                skip,
                take: limit,
                select:{
                    senderId: true,
                    content: true,
                    createdAt: true
                }
            }),
            prisma.message.count({
                where:{chatId: chatId}
            })
        ])

        return {
            data: messages,
            pagination: buildPagination({total, page, limit}),
        }
    }

    async getNewMessagesFromChat(chatId: string,  userId: string, after: string, params: PaginationParamsBase): Promise<PaginatedResponse<MessageResponse>> {

        const { page, limit } = params;
        const skip = (page - 1) * limit;

        this.isValidISODateStrict(after);
        await this.validateChatParticipant(userId, chatId);

        const [messages, total] = await Promise.all([
            prisma.message.findMany({
            where: {
                chatId,
                createdAt: { gt: new Date(after) }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc'},
            select: {
                senderId: true,
                content: true,
                createdAt: true,
            }
            }),
            prisma.message.count({
            where: {
                chatId,
                createdAt: { gt: new Date(after) }
            }
            })
        ]);

        return {
            data: messages,
            pagination: buildPagination({ total, page, limit })
        };    
    }


    private async validateChatParticipant (senderId: string, chatId: string){
        const exists = await prisma.chatParticipant.count({
            where: {
                chatId: chatId,
                userId: senderId,
            },
        });

        const isSenderInChat = exists > 0;

        if(!isSenderInChat){
            throw new ForbiddenAccessError();
        }
    }

    private isValidISODateStrict(dateStr: string) {
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

        if(!(isoRegex.test(dateStr) && !Number.isNaN(Date.parse(dateStr)))){
            throw new BadRequestError("O parâmetro 'after' é obrigatório e deve estar no formato ISO 8601.");
        }
    }

}