import { LocationObject } from "expo-location";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LocationState {
  isLoading: boolean;
  locationAllowed: boolean;
  location: LocationObject | null;
  setIsLoading: (isLoading: boolean) => void;
  setLocationAllowed: (allowed: boolean) => void;
  setLocation: (location: LocationObject) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      isLoading: false,
      locationAllowed: false,
      location: null,
      setIsLoading: (isLoading) => set({ isLoading }),
      setLocationAllowed: (allowed) => set({ locationAllowed: allowed }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
