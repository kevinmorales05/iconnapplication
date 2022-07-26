import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxDataScreen from './TaxDataScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const TaxDataController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const goToAddRFC = () => navigate('Billing');

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
      <TaxDataScreen addRFC={goToAddRFC} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default TaxDataController;