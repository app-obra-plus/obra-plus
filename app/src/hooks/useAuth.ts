import AsyncStorage from "@react-native-async-storage/async-storage";
import { userMdl } from "../api/usersMdl";
import { SignUpForm } from "../schemas/signUpSchema";

export const useAuth = () => {
  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const register = async (params: SignUpForm) => {
    const response = await userMdl.create(params);
    if (response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  };

  const login = async (email: string, password: string) => {
    const response = await userMdl.defaultPostRequest<{ token: string }>("/login",
      { email, password }
    );
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response;
  };

  return { register, login, getUser };
};
