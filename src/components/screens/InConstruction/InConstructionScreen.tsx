import React from 'react';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, SafeArea, Touchable } from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ICONN_IN_CONSTRUCTION } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const InConstructionScreen: React.FC<any> = ({ route }) => {
  const { isSafeToClose } = route.params;
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const onClose = () => {
    if (isSafeToClose) {
      goBack();
    } else {
      onSubmit();
    }
  };

  const onSubmit = () => {
    RootNavigation.navigate('HomeScreen' as never, undefined as never);
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={true} barStyle="dark" childrenContainerStyle={{ paddingHorizontal: 0 }}>
      <Container style={{ marginTop: insets.top + 16 }} crossCenter>
        <Container style={{ position: 'absolute', right: 0 }}>
          <Touchable onPress={onClose} rounded marginHorizontal={16}>
            <AntDesign name="close" size={28} color="black" />
          </Touchable>
        </Container>
      </Container>
      <Container flex crossCenter center>
        <TextContainer text="En Construcción" fontSize={30} fontBold textAlign="center" />
        <TextContainer text={`Estamos trabajando para brindarte\nuna mejor experiencia.`} textAlign="center" marginTop={16} />
        <Button length="short" width="medium" round fontBold fontSize="h4" onPress={onSubmit} style={{ paddingHorizontal: 16 }} marginTop={48}>
          Ir a inicio
        </Button>
      </Container>
      <Image
        source={ICONN_IN_CONSTRUCTION}
        resizeMethod="resize"
        resizeMode="contain"
        style={{ height: moderateScale(171), width: moderateScale(309), bottom: 160 }}
      />
    </SafeArea>
  );
};

export default InConstructionScreen;
