export interface CreateUserDto{
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    profile_picture?: string;
    active: boolean;
}


