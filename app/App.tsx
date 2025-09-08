import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './src/routes/Main.routes';
import "./global.css"
import ToastContainer from './src/components/Toast/ToastContainer';
import { colors } from './src/theme/colors';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient();

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  }
} as typeof DefaultTheme;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={myTheme}>
        <AppRouter/>
        <ToastContainer />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
