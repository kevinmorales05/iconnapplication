import React, { useEffect } from 'react';
import InviteSignUpScreen from './InviteSignUpScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { AuthStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import AuthStack from 'navigation/stacks/AuthStack';


const InviteSignUpController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigation = useNavigation();
  const onSubmit = () => {
    //navigation.navigate(AuthStack);
    navigate('AuthStack', {screen: 'ContinueWith'});
  };

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="white"
      barStyle="dark"
      css={styles.backgroundImage}
    >
      <InviteSignUpScreen goBack={goBack} onSubmit={onSubmit}/>
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

export default InviteSignUpController;