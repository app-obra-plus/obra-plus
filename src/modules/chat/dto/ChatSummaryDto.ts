export interface ChatSummaryDto {
  id: string;
  name: string | null;
  type: "PRIVATE" | "GROUP";
  createdAt: string;
  role: "MEMBER" | "ADMIN";
  joinedAt: string;
  participants: {
    role: "MEMBER" | "ADMIN";
    joinedAt: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      profile_picture: string | null;
    };
  }[];
  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
    sender: {
      first_name: string;
      last_name: string;
    };
  } | null;
}