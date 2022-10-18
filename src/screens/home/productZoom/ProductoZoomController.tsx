import { SafeArea } from 'components';
import React from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch } from 'rtk';
import ProductZoomScreen from './ProductZoomScreen';
import { logoutThunk } from 'rtk/thunks/auth.thunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

const CONTAINER_HEIGHT = Dimensions.get('window').height / 6 - 20;

interface Props {
  carouselItems?: ItemProps;
}
interface ItemProps {
  image: ImageSourcePropType;
  text: string;
}
interface State {
  activeIndex: number;
  carouselItems: ItemProps[];
}

const ProductoZoomController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { user: userLogged } = useAppSelector((state: RootState) => state.auth);
  const { cart: dataFromCart } = useAppSelector((state: RootState) => state.cart);

  const { isLogged } = userLogged;
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const logOut = async () => {
    if (isLogged) {
      const { meta } = await dispatch(logoutThunk());
      if (meta.requestStatus === 'fulfilled') {
      }
    } else {
    }
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <ProductZoomScreen />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  modalBackground: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 1,
    height: CONTAINER_HEIGHT,
    marginVertical: CONTAINER_HEIGHT,
    marginHorizontal: 40,
    borderRadius: 16,
    paddingTop: 10
  },
  iconContainer: {
    backgroundColor: theme.brandColor.iconn_warm_grey,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
    padding: 8
  }
});

export default ProductoZoomController;
