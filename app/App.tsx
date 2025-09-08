import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppRouter from './src/routes/Main.routes';
import "./global.css"
import ToastContainer from './src/components/Toast/ToastContainer';
import { colors } from './src/theme/colors';
import { StatusBar } from 'react-native';

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  }
} as typeof DefaultTheme;

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <AppRouter/>
      <ToastContainer />
    </NavigationContainer>
  )
}
