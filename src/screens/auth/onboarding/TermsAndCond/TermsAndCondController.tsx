import React, { useEffect } from 'react';
import TermsAndCondScreen from './TermsAndCondScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { RootState, setUserId, useAppDispatch, useAppSelector, setIsLogged } from 'rtk';
import { registerWithFirebaseThunk, signInWithEmailAndPasswordThunk, signUpUserWithEmailAndPasswordThunk } from 'rtk/thunks/auth.thunks';
import { useAlert, useLoading, useToast } from 'context';
import theme from 'components/theme/theme';

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

  /**
   * 1. Register email and pass into firebase.
   * 2. Register into DB.
   * 3. Firebase signIn.
   */
  const onSubmit = async () => {
    loader.show();
    let userToRegister = {...user};
    if (user.sign_app_modes_id === 1) {
      const { payload: signUpResponse } = await dispatch(signUpUserWithEmailAndPasswordThunk({email: user.email!, pass: user.pass!}));
      if (signUpResponse.user.uid) {
        userToRegister = { ...userToRegister, user_id: signUpResponse.user.uid };
        dispatch(setUserId({user_id: signUpResponse.user.uid}));
      }
    }
    const { payload: registerResponse } = await dispatch(registerWithFirebaseThunk(userToRegister));
    if (registerResponse.responseCode === 200) {
      if (user.sign_app_modes_id === 1) {
        const { payload: payloadSingIn } = await dispatch(signInWithEmailAndPasswordThunk({email: user.email!, pass: user.pass!}));
        // TODO: we will need to manage the session token given by SingIn firebase imediately after a signup.
        // This would be needed to request to the backend.
      }
      dispatch(setIsLogged({isLogged: true}));
      toast.show({message: 'Cuenta creada exitosamente.', type: 'success'});
    } else {
      alert.show({
        title: registerResponse.responseMessage
      });
    }
  };

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="white"
      barStyle="dark"
      css={styles.backgroundImage}
    >
      <TermsAndCondScreen goBack={goBack} onSubmit={onSubmit}/>
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
