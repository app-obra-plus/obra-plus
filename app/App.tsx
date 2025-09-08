import { NavigationContainer } from '@react-navigation/native';
import AppRouter from './src/routes/Main.routes';
import "./global.css"
import ToastContainer from './src/components/Toast/ToastContainer';

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter/>
      <ToastContainer />
    </NavigationContainer>
  )
}
