import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { NotEnabledModal } from 'components/organisms/NotEnabledModal';

const DisableController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor="white" barStyle="dark">
      <NotEnabledModal onPressOut={goBack} visible={true} />
    </SafeArea>
  );
};

export default DisableController;
