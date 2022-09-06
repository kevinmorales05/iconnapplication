import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ICONN_BASKET, ICONN_REVERSE_BASKET } from 'assets/images';
import { Container, CustomText, Touchable } from 'components';
import theme from 'components/theme/theme';

const BasketCounter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <Touchable
      onPress={() => {
        setCounter(current => {
          return current + 1;
        });
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
            <Container style={{ marginHorizontal: 2, marginTop: 2 }}>
              <CustomText fontSize={17} alignSelf="center" textColor={theme.brandColor.iconn_white} text={String(counter)} fontBold />
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
