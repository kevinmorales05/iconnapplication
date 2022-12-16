import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { ICON_HELPMYACCOUNT, ICON_HELPPAYMENTSANDWALLET, ICON_HELPPURCHASESANDORDERS, ICON_HELPBILLING, ICON_HELPREWARDS, ICON_HELPCALLUS } from 'assets/images';
import { RootState, useAppSelector } from 'rtk';
import { HomeStackParams } from 'navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useToast } from 'context';

interface Props {

}

const HelpItemsController: React.FC<Props> = () => {
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
    ['callUs', ICON_HELPCALLUS]
  ]);

  const { flagError } = route.params;

  const fetchData = useCallback(async () => {
    setHelpModules(helpCenterModules);
  }, []);

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
      <HelpItemsScreen modulesData = {helpModules} icons = {helpModulesIcons} />
    </SafeArea>
  );
};

export default HelpItemsController;
