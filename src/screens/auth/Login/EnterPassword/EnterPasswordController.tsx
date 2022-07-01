import EnterPasswordScreen from './EnterPasswordScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import React, { useEffect, useState } from 'react';

const EnterPasswordController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const loader = useLoading();

  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const { email } = user;

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);
  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterPasswordScreen goBack={goBack} email={email} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default EnterPasswordController;