import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { useAppDispatch, setAppInitialState, setAuthInitialState, setInvoicingInitialState, setShoppingCartInitialState, useAppSelector, setPromotionsInitialState, RootState } from 'rtk';
import { emptyShoppingCar, clearShoppingCartMessages } from 'services/vtexShoppingCar.services';
import DeleteAccountScreen from './DeleteAccountScreen';
import { authServices, vtexDocsServices } from 'services';

const DeleteAccountController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { cart } = useAppSelector((state: RootState) => state.cart);

  const logOut = async () => {
    const dataUser = {
      email: user.email,
      name: user.name,
      userId: user.userId,
      clientId: `CL-${user.id}`
    }
    const response = await vtexDocsServices.createDoc('CD', dataUser);
    if(!!response.DocumentId){
      try {
        await clearShoppingCartMessages(cart.orderFormId, {});
        await emptyShoppingCar(cart.orderFormId, {})
        await authServices.logOutUser();
      } catch (error) {
        console.log('LOGOUT ERROR', error);
      } finally {
        dispatch(setAppInitialState());
        dispatch(setAuthInitialState());
        dispatch(setInvoicingInitialState());
        dispatch(setShoppingCartInitialState());
        dispatch(setPromotionsInitialState());
      }
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
      <DeleteAccountScreen logOut={logOut}/>
    </SafeArea>
  );
};

export default DeleteAccountController;
