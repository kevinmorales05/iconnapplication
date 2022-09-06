import React from 'react';
import { Image, View } from 'react-native';
import { Container, Touchable } from 'components';
import { ICONN_CARD_SEVEN } from 'assets/images';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const EcommerceHeader = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <Touchable
      onPress={() => {
        goBack();
      }}
    >
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
    </Touchable>
  );
};

export default EcommerceHeader;
