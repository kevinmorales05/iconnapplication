import React, { useCallback, useEffect, useState } from 'react';
import WalletHomeScreen from './WalletHomeScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { StyleSheet } from 'react-native';
import { OrderInterface, RootState, useAppSelector, DeliveryChannel } from 'rtk';
import theme from 'components/theme/theme';
import { vtexordersServices } from 'services/vtexorder.services';
import { vtexsingleOrdersServices } from 'services';
import { useLoading } from 'context';

const WalletHomeController: React.FC = () => {
  
  return (
      <WalletHomeScreen navigate={() => {}} />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});

export default WalletHomeController;
