import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { ICON_HELPMYACCOUNT, ICON_HELPPAYMENTSANDWALLET, ICON_HELPPURCHASESANDORDERS, ICON_HELPBILLING, ICON_HELPREWARDS, ICON_HELPCALLUS } from 'assets/images';

interface Props {

}

const HelpItemsController: React.FC<Props> = () => {

  const [helpModules, setHelpModules] = useState([]);
  const [helpModulesIcons, setHelpModulesIcons] = useState(new Map([
    ['myAccount', ICON_HELPMYACCOUNT],
    ['paymentsAndWallet', ICON_HELPPAYMENTSANDWALLET],
    ['purchasesAndOrders', ICON_HELPPURCHASESANDORDERS],
    ['billing', ICON_HELPBILLING],
    ['rewards', ICON_HELPREWARDS],
    ['callUs', ICON_HELPCALLUS]
  ]));

  const fetchData = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocsByDocDataEntity('HM');
    setHelpModules(data);
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
      <HelpItemsScreen modulesData = {helpModules} icons = {helpModulesIcons}
      />
    </SafeArea>
  );
};

export default HelpItemsController;
