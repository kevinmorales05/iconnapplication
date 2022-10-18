import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch, ClientProfileDataInterface } from 'rtk';
import ShopCartScreen from './ShopCartScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { saveClientProfileDataThunk } from 'rtk/thunks/vtex-shoppingCart.thunks';
import { useLoading, useToast } from 'context';

const ShopCartController: React.FC = () => {
  const { user, isGuest } = useAppSelector((state: RootState) => state.auth);
  const routes = useNavigationState(state => state.routes);
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const loader = useLoading();
  const toast = useToast();

  const dispatch = useAppDispatch();
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const goToCheckout = async () => {
    if (isGuest) {
      navigate('Checkout');
      return;
    }

    loader.show();

    const clientProfileDataPayload: ClientProfileDataInterface = {
      email: user.email,
      firstName: user.name,
      lastName: user.lastName,
      documentType: '',
      document: '',
      phone: user.telephone,
      corporateName: '',
      tradeName: '',
      corporateDocument: '',
      stateInscription: '',
      corporatePhone: '',
      isCorporate: false
    };

    try {
      let response: any;
      response = await dispatch(saveClientProfileDataThunk({ orderFormId: cart.orderFormId, clientProfileData: clientProfileDataPayload })).unwrap();
      if (response) navigate('Checkout');
      else toast.show({ message: 'Error al procesar la informacion de su perfil.', type: 'warning' });
    } catch (error: any) {
      toast.show({ message: error, type: 'error' });
    } finally {
      loader.hide();
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
      <ShopCartScreen routes={routes} onPressCheckout={goToCheckout} onPressSeeMore={() => goBack()} />
    </SafeArea>
  );
};

export default ShopCartController;
