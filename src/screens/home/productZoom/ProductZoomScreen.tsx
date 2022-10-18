import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, Section, SafeArea, Touchable, TextContainer } from 'components';

import { Image, StyleProp, ViewStyle } from 'react-native';
import { object, text } from '@storybook/addon-knobs';
import items from 'assets/files/sellers.json';
import Icon from 'react-native-vector-icons/AntDesign';
import IconO from 'react-native-vector-icons/FontAwesome5'
import { ConnectionItem } from 'components/organisms/ConnectionItem';
import { useAlert, useLoading, useToast } from 'context';
import { ImageZoom } from 'components/molecules/ImageZoom';

interface Props {
  
}


import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, InvoicingProfileInterface } from 'rtk';
import { WidthType } from '../../../components/types/width-type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../navigation/types';

const ProductZoomScreen: React.FC<Props> = ({  }) => {
  const toast = useToast();
  const alert = useAlert();

  const fetchData = useCallback(async () => {
    console.log('fetchData...');

  }, []);

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container flex crossCenter style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', padding: 0 }}>
      <ImageZoom></ImageZoom>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center'
  }
});

export default ProductZoomScreen;
