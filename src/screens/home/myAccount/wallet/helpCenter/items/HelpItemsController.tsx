import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import {
  ICON_HELPMYACCOUNT,
  ICON_HELPPAYMENTSANDWALLET,
  ICON_HELPPURCHASESANDORDERS,
  ICON_HELPBILLING,
  ICON_HELPREWARDS,
  ICON_HELPCALLUS,
  ICONN_HELP_TOUR
} from 'assets/images';
import { RootState, useAppSelector } from 'rtk';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';

interface Props {}

const HelpItemsController: React.FC<Props> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { helpCenterModules } = useAppSelector((state: RootState) => state.helpCenterModules);
  const toast = useToast();
  const route = useRoute<RouteProp<HomeStackParams, 'HelpItems'>>();
  const [helpModules, setHelpModules] = useState([]);
  const helpModulesIcons = new Map([
    ['myAccount', ICON_HELPMYACCOUNT],
    ['paymentsAndWallet', ICON_HELPPAYMENTSANDWALLET],
    ['purchasesAndOrders', ICON_HELPPURCHASESANDORDERS],
    ['billing', ICON_HELPBILLING],
    ['rewards', ICON_HELPREWARDS],
    ['callUs', ICON_HELPCALLUS],
    ['virtualTour', ICONN_HELP_TOUR]
  ]);

  const { flagError } = route.params;

  const fetchData = useCallback(async () => {
    setHelpModules(helpCenterModules);
  }, []);

  const onPressTour = () => {
    navigate('VirtualTour', { step: 1 });
  };

  useEffect(() => {
    if (flagError === 'error') {
      toast.show({
        message: 'No se pudo enviar tu evaluación. Por favor intenta más tarde.',
        type: 'error'
      });
    } else if (flagError === 'success') {
      toast.show({
        message: '¡Muchas gracias! Tu opinión es muy importante para nosotros.',
        type: 'success'
      });
    }
  }, [flagError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <HelpItemsScreen modulesData={helpModules} icons={helpModulesIcons} onPressTour={onPressTour} />
    </SafeArea>
  );
};

export default HelpItemsController;
