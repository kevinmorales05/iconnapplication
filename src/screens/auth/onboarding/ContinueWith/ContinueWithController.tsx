import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';
import { OtherInputMethods } from 'components/organisms/OtherInputMethods';
import { useAppDispatch, setIsGuest, getLoginProvidersThunk, AuthProviderInterface } from 'rtk';

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const nowIsGuest = async () => {
    await delay(1000);
    dispatch(setIsGuest({ isGuest: true }));
  };

  const [providersAuth, setProvidersAuth] = useState<AuthProviderInterface[]>([]);
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    getProvidersLoginEffect();
  }, []);

  const onPressSocialMedia = (socialMedia: string) => {
    navigate('LoginWhitSocialNetwork', { authenticationToken: authToken, providerLogin: socialMedia });
  };

  const getProvidersLoginEffect = async () => {
    const providersRequest = await getProvidersLogin();
    if (providersRequest?.oauthProviders) {
      console.log({ providersRequest });
      setProvidersAuth(providersRequest?.oauthProviders);
      setAuthToken(providersRequest?.authenticationToken);
    }
  };
  const getProvidersLogin = async () => {
    return await dispatch(getLoginProvidersThunk()).unwrap();
  };

  const onContinueWithEmail = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail');
  };

  const onPressOtherMethods = () => {
    setotherMethodsVisible(true);
  };

  const onContinueAsGuest = () => {
    setotherMethodsVisible(false);
    console.log('Modal', otherMethodsVisible);
    nowIsGuest();
  };

  const onIhaveAccount = () => {
    setotherMethodsVisible(false);
    navigate('EnterEmail');
  };
  const onPressOut = () => {
    console.log('Modal', otherMethodsVisible);
    setotherMethodsVisible(false);
  };

  return (
    <ImageBackground source={ICONN_BACKGROUND_IMAGE} style={styles.backgroundImage}>
      <LinearGradient
        colors={['#000000', '#00000000', '#00000000', '#00000000', '#00000000', '#000000']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      ></LinearGradient>
      <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="transparent" barStyle="light">
        <ContinueWithScreen
          onPressSocialButton={onPressSocialMedia}
          onPressEmail={onContinueWithEmail}
          onPressOthers={onContinueAsGuest}
          providers={providersAuth}
        />
        <OtherInputMethods
          visible={otherMethodsVisible}
          onContinueEmail={onContinueWithEmail}
          onContinueGuest={onContinueAsGuest}
          onIhaveAccount={onIhaveAccount}
          onPressOut={onPressOut}
        />
      </SafeArea>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default ContinueWithController;
