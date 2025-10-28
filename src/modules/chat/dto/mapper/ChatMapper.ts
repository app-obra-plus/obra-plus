import { Message} from "../../../../generated/prisma";
import { ChatParticipantWithChat } from "../ChatParticipantWithChat";
import { ChatSummaryDto } from "../ChatSummaryDto";
import { ChatWithParticipants } from "../ChatWithParticipants";
import { MessageDto } from "../MessageDto";
import {ChatResponseDto} from "../ResponseChatDto";


export class ChatMapper {

  static toResponseDto(chat: ChatWithParticipants): ChatResponseDto {
    return {
      id: chat.id,
      name: chat.name,
      type: chat.type,
      createdAt: chat.createdAt.toISOString(),
      participants: chat.participants.map((p) => ({
        role: p.role,
        joinedAt: p.joinedAt.toISOString(),
        user: {
          id: p.user.id,
          email: p.user.email,
          first_name: p.user.first_name,
          last_name: p.user.last_name,
          profile_picture: p.user.profile_picture,
        },
      })),
    };
  }

  static toMessageDto(message: Message): MessageDto {
    const response: MessageDto = {
      chatId: message.chatId,
      senderId: message.senderId,
      content: message.content,
    }
    return response;
  }

  static toSummaryList(chatParticipants: ChatParticipantWithChat[]): ChatSummaryDto[] {
    return chatParticipants.map((p): ChatSummaryDto => ({
      id: p.chat.id,
      name: p.chat.name,
      type: p.chat.type,
      createdAt: p.chat.createdAt.toISOString(),
      role: p.role,
      joinedAt: p.joinedAt.toISOString(),
      participants: p.chat.participants.map((participant) => ({
        role: participant.role,
        joinedAt: participant.joinedAt.toISOString(),
        user: {
          id: participant.user.id,
          first_name: participant.user.first_name,
          last_name: participant.user.last_name,
          profile_picture: participant.user.profile_picture,
        },
      })),
      lastMessage: p.chat.messages[0]
        ? {
            id: p.chat.messages[0].id,
            content: p.chat.messages[0].content,
            createdAt: p.chat.messages[0].createdAt.toISOString(),
            sender: {
              first_name: p.chat.messages[0].sender.first_name,
              last_name: p.chat.messages[0].sender.last_name,
            },
          }
        : null,
    }));
  }
}