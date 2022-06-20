import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import ContinueWithScreen from './ContinueWithScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';
import { OtherInputMethods } from 'components/organisms/OtherInputMethods';

const ContinueWithController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [otherMethodsVisible, setotherMethodsVisible] =
    useState<boolean>(false);

  const onPressOtherMethods = () => {
    console.log('onPressOtherMethods');
    setotherMethodsVisible(true);
  };
  const onContinueWithEmail = () => {
    console.log('onContinueWithEmail');
    setotherMethodsVisible(false);
    navigate('EnterEmail')
  };
  const onContinueAsGuest = () => {
    console.log('onContinueAsGuest');
  };
  const onIhaveAccount = () => {
    console.log('OnIhaveAccount');
  };
  const onPressOut = () => {
    console.log('onPressOut');
    setotherMethodsVisible(false);
  };

  return (
    <ImageBackground
      source={ICONN_BACKGROUND_IMAGE}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={[
          '#000000',
          '#00000000',
          '#00000000',
          '#00000000',
          '#00000000',
          '#000000'
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      ></LinearGradient>
      <SafeArea
        topSafeArea={false}
        bottomSafeArea={false}
        backgroundColor="transparent"
        barStyle="light"
      >
        <ContinueWithScreen
          onPressFacebook={() => {}}
          onPressGoogle={() => {}}
          onPressEmail={onContinueWithEmail}
          onPressOthers={onPressOtherMethods}
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
