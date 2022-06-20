import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterEmailScreen from './EnterEmailScreen';
import { ImageBackground, StyleSheet } from 'react-native';
import { ICONN_BACKGROUND_IMAGE } from 'assets/images';
import { SafeArea } from 'components/atoms/SafeArea';
import LinearGradient from 'react-native-linear-gradient';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  
  const onSubmit = (email: string) => {
    console.log('vamos! ' + email);
    //navigate('otp')
  };

  return (      
    <SafeArea
    topSafeArea={false}
    bottomSafeArea={false}
    backgroundColor="transparent"
    barStyle="dark"
    >
    <EnterEmailScreen
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

export default EnterEmailController;
