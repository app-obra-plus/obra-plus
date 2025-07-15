import AsyncStorage from "@react-native-async-storage/async-storage";
import { userMdl } from "../api/usersMdl";
import { SignUpForm } from "../schemas/signUpSchema";
import { authMdl } from "../api/authMdl";
import { useNavigation } from "@react-navigation/native";
import { IUser } from "../types/IAuthResponse";
import { use, useState } from "react";

export const useAuth = () => {
  const { navigate } = useNavigation();
  const [user, setUser] = useState<IUser | null>(null);

  const updateUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) return signOut();

    setUser(JSON.parse(storedUser));
  }

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');

    navigate('auth', {
      screen: 'signIn'
    })
  };

  const register = async (params: SignUpForm) => {
    const response = await userMdl.create(params);
    if (response.data) {
      await Promise.all([
        AsyncStorage.setItem('token', response.data.token),
        AsyncStorage.setItem('user', JSON.stringify(response.data.user))
      ]);
      setUser(response.data.user);
    }
    return response;
  };

  const login = async (email: string, password: string) => {
    const response = await authMdl.login({ email, password });
    if (response.data) {
      console.log('Login response:', response.data);
      await Promise.all([
        AsyncStorage.setItem('token', response.data.token),
        AsyncStorage.setItem('user', JSON.stringify(response.data.user))
      ]);
      setUser(response.data.user);
    }
    return response;
  };

  return { register, login, signOut, user, updateUserFromStorage};
};
