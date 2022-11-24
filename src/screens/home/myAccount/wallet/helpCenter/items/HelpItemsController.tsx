import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';

interface Props {

}

const HelpItemsController: React.FC<Props> = () => {

  const [helpModules, setHelpModules] = useState([]);
  const [helpModulesIcons, setHelpModulesIcons] = useState(new Map([
    ['myAccount', 'user'],
    ['paymentsAndWallet', 'wallet'],
    ['purchasesAndOrders', 'shopping-bag'],
    ['billing', 'money-bill'],
    ['rewards', 'inbox'],
    ['nothing', 'phone-call']
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
