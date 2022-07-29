import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxInfoScreen from './TaxInfoScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import theme from 'components/theme/theme';

const TaxInfoController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const goToAddRFC = () => navigate('AddRFC');

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <TaxInfoScreen addRFC={goToAddRFC} />
    </SafeArea>
  );
};

export default TaxInfoController;
