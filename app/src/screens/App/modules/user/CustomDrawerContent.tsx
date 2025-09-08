import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, View, Text } from 'react-native';
import { colors } from '../../../../theme/colors';
import Button from '../../../../components/Button';
import { useAuthStore } from '../../../../stores/useAuthStore';

export function CustomDrawerContent(props: any) {
  const {signOut} = useAuthStore()

  return (
    <DrawerContentScrollView {...props} className='h-'>
      <View className='p-12'>
        <Image
          source={require('../../../../../assets/logo/branca.png')}
          style={{ }}
          width={200}
          height={70}
          resizeMethod='resize'
        />
      </View>
      <DrawerItemList {...props} />
      <View className='h-12' />
      <View className='flex-1'>
        <Button text="Sair" type='outline' color='light' onPress={signOut} />
      </View>
    </DrawerContentScrollView>
  );
}
