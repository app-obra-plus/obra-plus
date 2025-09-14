import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './src/routes/Main.routes';
import "./global.css"
import ToastContainer from './src/components/Toast/ToastContainer';
import { colors } from './src/theme/colors';
import { StatusBar } from 'react-native';
import { useLocationStore } from './src/stores/useLocationStore';
import { getCurrentPositionAsync, LocationAccuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import { useEffect } from 'react';
import { set } from 'zod';

const queryClient = new QueryClient();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  }
} as typeof DefaultTheme;

export default function App() {
  const { setLocation, setIsLoading, setLocationAllowed, locationAllowed } = useLocationStore();

  useEffect(() => {
    let subscription: any;

    const startWatching = async () => {
      setIsLoading(true);
      const { status } = await requestForegroundPermissionsAsync();
      
      if (status === "granted") {
        subscription = await watchPositionAsync(
          { accuracy: LocationAccuracy.High, timeInterval: 200, distanceInterval: 10 },
          (loc) => {
            setLocation(loc);
            setIsLoading(false);
            setLocationAllowed(true);
          } 
        );
      } else {
        setLocationAllowed(false);
        setIsLoading(false);
      }
    };

    startWatching();
    return () => subscription?.remove();
  }, [locationAllowed]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={myTheme}>
        <AppRouter/>
        <ToastContainer />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
