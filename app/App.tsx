import { NavigationContainer } from '@react-navigation/native';
import AppRouter from './src/routes/Main.routes';

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter/>
    </NavigationContainer>
  )
}
