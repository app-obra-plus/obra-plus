import {create} from "zustand";
import { SignUpForm } from "../../../../schemas/signUpSchema";

interface SignUpStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  registerForm: SignUpForm;
  setRegisterForm: (form: SignUpForm) => void;
}

export const useSignUpStore = create<SignUpStore>()((set) => ({
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  registerForm: {} as SignUpForm,
  setRegisterForm: (form) => set({ registerForm: form })
}));
