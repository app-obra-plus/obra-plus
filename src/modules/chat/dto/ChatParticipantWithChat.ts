import { Prisma } from "../../../generated/prisma";

export type ChatParticipantWithChat = Prisma.ChatParticipantGetPayload<{
  select: {
    role: true;
    joinedAt: true;
    chat: {
      select: {
        id: true;
        name: true;
        type: true;
        createdAt: true;
        participants: {
          select: {
            role: true;
            joinedAt: true;
            user: {
              select: {
                id: true;
                first_name: true;
                last_name: true;
                profile_picture: true;
              };
            };
          };
        };
        messages: {
          orderBy: { createdAt: "desc" };
          take: 1;
          select: {
            id: true;
            content: true;
            createdAt: true;
            sender: {
              select: {
                first_name: true;
                last_name: true;
              };
            };
          };
        };
      };
    };
  };
}>;
