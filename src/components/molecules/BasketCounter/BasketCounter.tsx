import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ICONN_BASKET, ICONN_REVERSE_BASKET } from 'assets/images';
import { Container, CustomText, Touchable } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { InvoicingProfileInterface, Colony, RootState, useAppDispatch, useAppSelector } from 'rtk';

const BasketCounter = () => {
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const [counter, setCounter] = useState(0);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const getCount = () => {
    const { items, messages } = cart;
    let withoutStockM = new Map();
    if(messages){
      if (messages.length > 0) {
        messages.map((value) => {
          if (value.code == 'withoutStock' || value.code == 'cannotBeDelivered') {
            withoutStockM.set(parseInt(value.fields.itemIndex), value.text);
          }
        })
      }
    }

    let totalItems = 0;
    if(items!=undefined){
    if (items.length > 0) {
      items.map((value, index) => {
        if (withoutStockM.get(index)) {
        } else {
          totalItems = (totalItems + value.quantity);
        }
      })
    }
  }

    setCounter( items!=undefined ? totalItems:0);
  };

  useEffect(() => {
    getCount();
  }, [cart]);

  const openShoppingCart = () => {
    navigate('ShopCart');
   }

  return (
    <Touchable
      onPress={() => {
        openShoppingCart();
      }}
    >
      <Container
        row={counter > 0}
        flex={counter > 0}
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
              <Image style={styles.image} source={ICONN_REVERSE_BASKET} />
            </Container>
            <Container style={{ marginHorizontal: 2, marginTop: 2 }}>
              <CustomText fontSize={17} alignSelf="center" textColor={theme.brandColor.iconn_white} text={String(counter)} fontBold />
            </Container>
          </>
        ) : (
          <>
            <Container>
              <Image style={styles.image} source={ICONN_BASKET} />
            </Container>
          </>
        )}
      </Container>
    </Touchable>
  );
};

export default BasketCounter;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  highlight: {
    backgroundColor: theme.brandColor.iconn_green_original
  }
});
