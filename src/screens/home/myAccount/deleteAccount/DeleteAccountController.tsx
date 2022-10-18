import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, setInvoicingInitialState } from 'rtk';
import DeleteAccountScreen from './DeleteAccountScreen';
import { authServices } from 'services';

const DeleteAccountController: React.FC = () => {
  const dispatch = useAppDispatch();
  const logOut = async () => {
    try {
      await authServices.logOutUser();
    } catch (error) {
      console.log('LOGOUT ERROR', error);
    } finally {
      dispatch(setAppInitialState());
      dispatch(setAuthInitialState());
      dispatch(setGuestInitialState());
      dispatch(setInvoicingInitialState());
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
