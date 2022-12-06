import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import {
  ICON_HELPMYACCOUNT,
  ICON_HELPPAYMENTSANDWALLET,
  ICON_HELPPURCHASESANDORDERS,
  ICON_HELPBILLING,
  ICON_HELPREWARDS,
  ICON_HELPCALLUS
} from 'assets/images';
import { RootState, useAppSelector } from 'rtk';

interface Props {}

const HelpItemsController: React.FC<Props> = () => {
  const { helpCenterModules } = useAppSelector((state: RootState) => state.helpCenterModules);
  const [helpModules, setHelpModules] = useState([]);
  const helpModulesIcons = new Map([
    ['myAccount', ICON_HELPMYACCOUNT],
    ['paymentsAndWallet', ICON_HELPPAYMENTSANDWALLET],
    ['purchasesAndOrders', ICON_HELPPURCHASESANDORDERS],
    ['billing', ICON_HELPBILLING],
    ['rewards', ICON_HELPREWARDS],
    ['callUs', ICON_HELPCALLUS]
  ]);

  const fetchData = useCallback(async () => {
    setHelpModules(helpCenterModules);
  }, []);

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
      <HelpItemsScreen modulesData={helpModules} icons={helpModulesIcons} />
    </SafeArea>
  );
};

export default HelpItemsController;
