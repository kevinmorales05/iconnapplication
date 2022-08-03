import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import TaxInfoScreen from './TaxInfoScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';

const TaxInfoController: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const goToAddRFC = () => navigate('AddRFC');

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <TaxInfoScreen invoicingProfileList={invoicingProfileList} addRFC={goToAddRFC} />
    </SafeArea>
  );
};

export default TaxInfoController;
