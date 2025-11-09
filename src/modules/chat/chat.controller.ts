import { ChatService } from "./chat.service";
import { validateSchema } from "../../utils/validateRequest";
import { Request, Response} from "express";
import { CreateChatSchema } from "./dto/CreateChatDto";
import { MessageSchema } from "./dto/MessageDto";
import { PaginationQueryBase } from "../../utils/pagination/pagination.types";
import { getPaginationParams } from "../../utils/pagination/pagination";

const chatService = new ChatService();

export async function createChat(req: Request, res: Response) {

    const chatData = validateSchema(CreateChatSchema, req.body);
    const chat = await chatService.createChat(chatData);
    return res.status(201).json(chat);
}

export async function getChatById(req: Request, res: Response) {

    const { id } = req.params;
    const chat = await chatService.getChatById(id);
    return res.status(200).json(chat);
}

export async function sendMessage(req: Request, res: Response) {

    const { id } = req.params;
    const userId = (req as any).auth.userId;
    const messageRequest = {chatId: id, senderId: userId, ...req.body};
    const messageValidated = validateSchema(MessageSchema, messageRequest);
    const response =  await chatService.sendMessage(messageValidated);
    return res.status(200).json(response);
}

export async function getAllChatsByUser(req: Request, res: Response){
    
    const userId = (req as any).auth.userId;
    const query: PaginationQueryBase = req.query;
    const params = getPaginationParams(query);
    const chats =  await chatService.getAllChatsByUser(userId, params);
    return res.status(200).json(chats);
}

export async function getAllMessagesFromChatPage(req: Request, res: Response) {
    const { id } = req.params;
    const userId = (req as any).auth.userId;
    const query: PaginationQueryBase = req.query;
    const params = getPaginationParams(query);
    const chats =  await chatService.getAllMessagesFromChatPage(id, userId, params);
    return res.status(200).json(chats);
}

export async function getNewMessagesFromChat(req: Request, res: Response) {
    const { id } = req.params;
    const after = req.query.after as string
    const userId = (req as any).auth.userId;
    const query: PaginationQueryBase = req.query;
    const params = getPaginationParams(query);
    const chats =  await chatService.getNewMessagesFromChat(id, userId, after, params);
    return res.status(200).json(chats);
}

