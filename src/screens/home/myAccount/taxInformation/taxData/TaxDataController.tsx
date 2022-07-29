import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxDataScreen from './TaxDataScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import theme from 'components/theme/theme';

const TaxDataController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const goToAddRFC = () => navigate('Billing');

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <TaxDataScreen addRFC={goToAddRFC} />
    </SafeArea>
  );
};

export default TaxDataController;
