import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../types/IAuthResponse';
import { authMdl } from '../api/auth/authMdl';
import { userMdl } from '../api/usersMdl';
import { SignUpForm } from '../schemas/signUpSchema';

type AuthState = {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: SignUpForm) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: IUser | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      login: async (email, password) => {
        const res = await authMdl.login({ email, password });
        if (res.data) {
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
          set({ user: res.data.user });
        }
      },

      register: async (data) => {
        const res = await userMdl.create(data);
        if (res.data) {
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
          set({ user: res.data.user });
        }
      },

      signOut: async () => {
        await AsyncStorage.multiRemove(['user', 'token']);
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
