import { UserResponseDto } from "../../users/dto/UserResponseDto";

export interface LoginResponseDto{
    token: string;
    user: UserResponseDto;
}