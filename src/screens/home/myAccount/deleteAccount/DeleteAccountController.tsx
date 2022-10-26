import React from 'react';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, setInvoicingInitialState, useAppSelector, RootState } from 'rtk';
import DeleteAccountScreen from './DeleteAccountScreen';
import { authServices, vtexDocsServices } from 'services';

const DeleteAccountController: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

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
        await authServices.logOutUser();
      } catch (error) {
        console.log('LOGOUT ERROR', error);
      } finally {
        dispatch(setAppInitialState());
        dispatch(setAuthInitialState());
        dispatch(setGuestInitialState());
        dispatch(setInvoicingInitialState());
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
