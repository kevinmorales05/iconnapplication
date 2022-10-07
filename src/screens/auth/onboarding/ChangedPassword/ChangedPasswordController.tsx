import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeArea } from 'components/atoms/SafeArea';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RootState, setAccountAuthCookie, setAuthCookie, setIsLogged, setUserId, useAppDispatch, useAppSelector } from 'rtk';
import { authServices } from 'services';
import ChangedPasswordScreen from './ChangedPasswordScreen';
import { useAlert } from 'context';

const ChangedPasswordController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  const alert = useAlert();

  const route = useRoute<RouteProp<AuthStackParams, 'ChangedPassword'>>();

  const { authenticationToken, password } = route.params;

  const onSubmit = async () => {
    try {
      const response = await authServices.login(email as string, password, authenticationToken);
      if (response.authStatus == 'Success') {
        dispatch(setAuthCookie(response.authCookie));
        dispatch(setAccountAuthCookie(response.accountAuthCookie));
        dispatch(setUserId({ user_id: response.userId }));
        dispatch(setIsLogged({ isLogged: true }));
      } else {
        alert.show({ title: 'Lo sentimos', message: 'No pudimos ingresar a tu cuenta en este momento. Por favor intenta más tarde.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="white" barStyle="dark" css={styles.backgroundImage}>
      <ChangedPasswordScreen goBack={goBack} onSubmit={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});

export default ChangedPasswordController;
