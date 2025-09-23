import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import Map from "./modules/map/Map";
import UserConfigRouter from "./modules/user/User.routes";
import { ChatScreen } from "./telas-mockadas";
import AdvertisementsConfigRouter from "./modules/Advertisements/Advertisements.routes";
import SearchScreen from "./modules/search/SearchScreen";
import SearchConfigRouter from "./modules/search/search.routes";



const tabsList: {
  name: string;
  component: React.ComponentType<any>;
  icon: React.ComponentProps<typeof Feather>['name'];
  title?: string;
  label: string;
  options: BottomTabNavigationOptions;
}[] = [
  { 
    name: "chat",
    title: "Minhas conversas",
    component: ChatScreen,
    icon: "message-circle",
    label: "Conversas",
    options: {}
  },
  {
    name: "search",
    component: SearchConfigRouter,
    title: "Pesquisar",
    icon: "search",
    label: "Pesquisar",
    options: {}
  },
  {
    name: "map",
    component: Map,
    title: "Mapa",
    icon: "map",
    label: "Mapa",
    options: {}
  },
  {
    name: "advertisements",
    component: AdvertisementsConfigRouter,
    title: "Meus anúncios",
    icon: "plus-circle",
    label: "Anúncios",
    options: {}
  },
  {
    name: "profile",
    component: UserConfigRouter,
    title: "Meu perfil",
    icon: "user",
    label: "Perfil",
    options: {
      headerShown: false,
    }
  }
]

export default tabsList;