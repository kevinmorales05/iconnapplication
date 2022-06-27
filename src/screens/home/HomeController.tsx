import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import { RootState, useAppSelector } from 'rtk';
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from 'navigation/types';

const HomeController: React.FC = () => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
	const logOut = () => {
		navigate('ContinueWith');
	}

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="transparent"
      barStyle="light"
    >
      <HomeScreen
				name={user.name}        
        onPressLogOut={logOut}
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

export default HomeController;
