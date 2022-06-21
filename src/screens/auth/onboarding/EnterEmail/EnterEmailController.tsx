import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'types';
import EnterEmailScreen from './EnterEmailScreen';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';

const EnterEmailController: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  
  const onSubmit = (email: string) => {
    console.log('Correo electronico: ' + email);
    navigate('EnterOtp')
  };

  return (      
    <SafeArea
    topSafeArea={false}
    bottomSafeArea={false}    
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
