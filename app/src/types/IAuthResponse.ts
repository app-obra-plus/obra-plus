export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  active: boolean;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}