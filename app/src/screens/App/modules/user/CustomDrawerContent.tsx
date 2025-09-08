import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, View, Text } from 'react-native';
import { colors } from '../../../../theme/colors';

export function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={require('../../../../../assets/logo/branca.png')}
          style={{ }}
          width={200}
          height={70}
          resizeMethod='resize'
        />
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
