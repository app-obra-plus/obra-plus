

export interface ChatWithParticipants {
  id: string;
  name: string | null;
  type: "PRIVATE" | "GROUP";
  createdAt: Date;
  participants: {
    role: "MEMBER" | "ADMIN";
    joinedAt: Date;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      profile_picture: string | null;
    };
  }[];
}

