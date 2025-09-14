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

const queryClient = new QueryClient();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  }
} as typeof DefaultTheme;

export default function App() {
  const { setLocation } = useLocationStore();

  useEffect(() => {
  let subscription: any;
  const startWatching = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      subscription = await watchPositionAsync(
        { accuracy: LocationAccuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (loc) => setLocation(loc)
      );
    }
  };

  startWatching();
  return () => subscription?.remove();
}, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={myTheme}>
        <AppRouter/>
        <ToastContainer />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
