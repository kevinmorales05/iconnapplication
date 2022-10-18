import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, setIsGuest } from 'rtk';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';

const ContinueWithController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();
  const { getProvidersLoginEffect, providersAuth, authToken } = useOnboarding();

  const onPressSocialMedia = (socialMedia: string) => {
    navigate('LoginWhitSocialNetwork', { authenticationToken: authToken, providerLogin: socialMedia });
  };

  const onContinueWithEmail = () => {
    navigate('EnterEmail');
  };

  const onContinueAsGuest = () => {
    dispatch(setIsGuest({ isGuest: true }));
  };

  useEffect(() => {
    getProvidersLoginEffect();
  }, []);

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
          onPressContinueAsGuest={onContinueAsGuest}
          providers={providersAuth}
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
