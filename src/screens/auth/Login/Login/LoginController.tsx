import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';
import { SafeArea } from 'components/atoms/SafeArea';
import { AboutEmail } from 'components/organisms/AboutEmail';
import { useLoading } from 'context';
import { RootState, useAppSelector } from 'rtk';
import LoginScreen from './LoginScreen';

const LoginController: React.FC = () => {
  const { goBack, navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [aboutEmailVisible, setAboutEmailVisible] = useState<boolean>(false);
  const loader = useLoading();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const onPressEmailInfo = () => {
    setAboutEmailVisible(true);
  };

  const onPressOut = () => {
    setAboutEmailVisible(false);
  };

  const onSubmit = async (email: string) => {    
    navigate('EnterPassword');    
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <LoginScreen
        goBack={goBack}
        onSubmit={onSubmit}
        onPressInfo={onPressEmailInfo}
      />
      <AboutEmail
        visible={aboutEmailVisible}
        onUnderstood={onPressOut}
        onPressOut={onPressOut}
      />
    </SafeArea>
  );
};

export default LoginController;
