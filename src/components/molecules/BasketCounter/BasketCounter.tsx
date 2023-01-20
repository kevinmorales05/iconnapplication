import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ICONN_BASKET, ICONN_REVERSE_BASKET } from 'assets/images';
import { Container, CustomText, Touchable } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { RootState, useAppSelector } from 'rtk';
import { moderateScale } from 'utils/scaleMetrics';
import { BasketSvg } from 'components/svgComponents';
import analytics from '@react-native-firebase/analytics';

const BasketCounter = () => {
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [counter, setCounter] = useState(0);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const openCart = async () => {
    try {
      await analytics().logEvent('hmOpenCart', {
        id: user.id,
        description: 'Abrir Mi canasta'
      });
      //console.log('succesfully added to firebase!');
    } catch (error) {
      //console.log(error);
    }
  };

  const getCount = () => {
    const { items, messages } = cart;
    let withoutStockM = new Map();
    if (messages) {
      if (messages.length > 0) {
        messages.map(value => {
          // TODO: relocate message type to .ENV
          if (value.code == 'withoutStock' || value.code == 'cannotBeDelivered' || value.code == 'withoutPriceFulfillment') {
            withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
          }
        });
      }
    }

    let totalItems = 0;
    if (items != undefined) {
      if (items.length > 0) {
        items.map((value, index) => {
          if (withoutStockM.get(index)) {
          } else {
            totalItems = totalItems + value.quantity;
          }
        });
      }
    }

    setCounter(items != undefined ? totalItems : 0);
  };

  useEffect(() => {
    getCount();
  }, [cart]);

  const openShoppingCart = () => {
    openCart();
    navigate('ShopCart');
  };

  return (
    <Touchable
      onPress={() => {
        openShoppingCart();
      }}
    >
      <Container
        row={counter > 0}
        style={[
          {
            marginBottom: 10,
            alignContent: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 16
          },
          counter > 0 && styles.highlight
        ]}
      >
        {counter > 0 ? (
          <>
            <Container>
              <BasketSvg size={moderateScale(24)} color={theme.brandColor.iconn_white} />
            </Container>
            <Container style={{ marginHorizontal: 2, marginTop: 2 }}>
              <CustomText fontSize={17} alignSelf="center" textColor={theme.brandColor.iconn_white} text={String(counter)} fontBold />
            </Container>
          </>
        ) : (
          <>
            <Container center style={{ alignItems: 'flex-end' }} width={'100%'}>
              <BasketSvg size={moderateScale(24)} color={theme.brandColor.iconn_accent_principal} />
            </Container>
          </>
        )}
      </Container>
    </Touchable>
  );
};

export default BasketCounter;

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: theme.brandColor.iconn_green_original
  }
});
