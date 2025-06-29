import { create } from "zustand";
import { z } from "zod";
import { signUpSchema } from "../schemas/signUpSchema";

interface ISignUpStore {
  data: z.infer<typeof signUpSchema>;
  setData: (newData: Partial<ISignUpStore>) => void;
}

const useSignUpStore = create<ISignUpStore>((set) => ({
  data: {
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_picture: "",
  },
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));

export default useSignUpStore;