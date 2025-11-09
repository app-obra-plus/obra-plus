
export interface ChatResponseDto {
  id: string;
  name: string | null;
  type: "PRIVATE" | "GROUP";
  createdAt: string;
  participants: {
    role: "MEMBER" | "ADMIN";
    joinedAt: string;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      profile_picture: string | null;
    };
  }[];
}