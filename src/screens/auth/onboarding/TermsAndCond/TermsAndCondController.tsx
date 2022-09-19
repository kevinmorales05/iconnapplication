import React, { useEffect } from 'react';
import TermsAndCondScreen from './TermsAndCondScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams, HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { RootState, setUserId, useAppDispatch, useAppSelector, setIsLogged } from 'rtk';
import { registerWithFirebaseThunk, signInWithEmailAndPasswordThunk, signUpUserWithEmailAndPasswordThunk } from 'rtk/thunks/auth.thunks';
import { useAlert, useLoading, useToast } from 'context';
import theme from 'components/theme/theme';

import { authServices } from 'services';

const TermsAndCondController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const loader = useLoading();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const alert = useAlert();
  const toast = useToast();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const route = useRoute<RouteProp<AuthStackParams, 'TermsAndCond'>>();

  const { authenticationToken, accessKey, newPassword } = route.params;

  /**
   * 1. Register email and pass into firebase.
   * 2. Register into DB.
   * 3. Firebase signIn.
   */
  const onSubmit = async () => {
    loader.show();
    try {
      const response = await authServices.createUser(user.email as string);

      console.log('creation response:', response);

      const { userId, authStatus } = await authServices.createPassword(newPassword, accessKey, user.email as string, authenticationToken);
      loader.hide();

      console.log('userId response:', userId);

      if (authStatus === 'Success') {
        dispatch(setUserId({ user_id: userId }));
        dispatch(setIsLogged({ isLogged: true }));
      } else {
      }
    } catch (e) {
      console.log('error');
    }
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="white" barStyle="dark" css={styles.backgroundImage}>
      <TermsAndCondScreen goBack={goBack} onSubmit={onSubmit} />
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

export default TermsAndCondController;
