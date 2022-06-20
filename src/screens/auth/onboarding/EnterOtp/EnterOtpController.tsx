import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterOtpScreen from './EnterOtpScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';

const EnterOtpController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  
  const onSubmit = (email: string) => {
    console.log('vamos! ' + email);
    //navigate('...')
  };

  return (      
    <SafeArea
    topSafeArea={false}
    bottomSafeArea={false}
    backgroundColor="transparent"
    barStyle="dark"
    >
    <EnterOtpScreen
      goBack={goBack}
      onSubmit={onSubmit}        
    />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EnterOtpController;
