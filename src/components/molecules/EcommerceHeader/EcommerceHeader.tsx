import React from 'react';
import { Image, View } from 'react-native';
import { Container } from 'components';
import { ICONN_CARD_SEVEN } from 'assets/images';

const EcommerceHeader = () => {
  return (
    <Container row style={{ alignContent: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 120 }}>
        <Image
          style={{
            flex: 1,
            width: 25,
            height: 25,
            resizeMode: 'contain'
          }}
          source={ICONN_CARD_SEVEN}
        />
      </View>
    </Container>
  );
};

export default EcommerceHeader;
