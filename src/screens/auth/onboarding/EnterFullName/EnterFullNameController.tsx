import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterFullNameScreen from './EnterFullNameScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import { useAppDispatch } from 'rtk';
import { setFullName } from 'rtk/slices/authSlice';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const dispatch = useAppDispatch();

  const onSubmit = (fields: any) => {
    console.log('Nombre: ', fields.name);
    console.log('Apellido: ', fields.lastName);
    dispatch(setFullName({ name: fields.name, lastName: fields.lastName }));
    navigate('TermsAndCond');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <EnterFullNameScreen goBack={goBack} onSubmit={onSubmit} />
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
