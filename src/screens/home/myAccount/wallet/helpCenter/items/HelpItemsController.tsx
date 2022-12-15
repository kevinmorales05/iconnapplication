import React, { useState, useEffect, useCallback } from 'react';
import HelpItemsScreen from './HelpItemsScreen';
import {
  ICON_HELPMYACCOUNT,
  ICON_HELPPAYMENTSANDWALLET,
  ICON_HELPPURCHASESANDORDERS,
  ICON_HELPBILLING,
  ICON_HELPREWARDS,
  ICON_HELPCALLUS
} from 'assets/images';
import { RootState, useAppSelector } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface Props {}

const HelpItemsController: React.FC<Props> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
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

  const onPressTour = () => {
    navigate('VirtualTour', { step: 1 });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <HelpItemsScreen modulesData={helpModules} icons={helpModulesIcons} onPressTour={onPressTour} />;
};

export default HelpItemsController;
