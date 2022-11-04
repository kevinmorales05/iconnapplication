import {
  ICONN_HOME_OPTION_ACUMMULATE,
  ICONN_HOME_OPTION_HEART,
  ICONN_HOME_OPTION_ORDERS,
  ICONN_HOME_OPTION_PETRO,
  ICONN_HOME_OPTION_SEVEN,
  ICONN_HOME_OPTION_WALLET
} from 'assets/images';
import { CardProduct, Container, CustomText, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import { CounterType } from 'components/types/counter-type';
import React from 'react';
import { Image, ImageStyle, StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { CarouselItem, ProductInterface } from 'rtk';

interface Props {
  icon: any;
  serviceName: string;
  onPressItem: () => void;
}

const AnimatedItemWithBorder: React.FC<Props> = ({ icon, serviceName, onPressItem }) => {
  {
    return (
      <Touchable
        onPress={() => {
          onPressItem();
        }}
      >
        <Container width={96} height={136} center backgroundColor={theme.brandColor.iconn_white} style={{borderRadius:8, paddingTop: 24, paddingBottom: 44, paddingHorizontal: 7, marginRight: 8}} >
          <Image source={icon} style={{ width: 35, height: 35, resizeMode: 'contain' }} />
          <TextContainer text={serviceName} marginTop={6} typography="h5" />
        </Container>
      </Touchable>
    );
  }
};

export default AnimatedItemWithBorder;
