import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Container, Touchable, TextContainer } from 'components';
import { CustomModal } from '../../../components/atoms';
import { ActionButton } from '../../../components/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_POINT_CARD_MODAL_PREFERENTE, ICONN_POINT_CARD_MODAL_PAYBACK } from 'assets/images';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface Props {
  onPressClose: () => void;
  visible: boolean;
}

const PointCardsModalScreen: React.FC<Props> = ({ onPressClose, visible }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const insets = useSafeAreaInsets();

  const showPreferenteScreen = (async () => {
    console.log('pantalla preferente');
    onPressClose();
  })

  const showPayBackScreen = (async () => {
    console.log('pantalla payback');
    onPressClose();
  })

  const { containerStyle } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onPressClose} animationType="slide">
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
            <Container />
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text='Tarjeta de puntos' typography="h3" fontBold />
            </Container>
            <Container>
              <ActionButton
                style={{ marginTop: -6, shadowColor: 'none' }}
                size="xxsmall"
                onPress={onPressClose}
                color="white"
                icon={
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.fontColor.dark_grey}
                  />
                }

              />
            </Container>
          </Container>
          <ScrollView
            bounces={false}
            contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Container flex>
              <Container center>
                <Container space="between" style={{ width: '95%' }}>
                  <Container center>
                    <TextContainer
                      text="Selecciona el tipo de tarjeta de puntos que deseas agregar:"
                      fontSize={14}
                      marginTop={15}
                      marginBottom={8}
                    ></TextContainer>
                  </Container>
                  <Container style={{ marginTop: 20, marginBottom: 25 }}>
                    <Container row space='around'>
                      <Container>
                        <Touchable onPress={() => {
                          showPreferenteScreen()
                          navigate('Preferred');
                        }}>
                          <Image source={ICONN_POINT_CARD_MODAL_PREFERENTE} resizeMode="cover" style={{ width: 108, height: 108 }} />
                          <TextContainer
                            text={`ICONN \nPreferente`}
                            fontSize={14}
                            marginTop={20}
                            textAlign="center"
                            marginBottom={8}
                          ></TextContainer>
                        </Touchable>
                      </Container>
                      <Container>
                        <Touchable onPress={() => {
                          showPayBackScreen()
                          navigate('Payback');
                        }}>
                          <Image source={ICONN_POINT_CARD_MODAL_PAYBACK} resizeMode="cover" style={{ width: 108, height: 108 }} />
                          <TextContainer
                            text={`Monedero \nPAYBACK`}
                            fontSize={14}
                            marginTop={20}
                            textAlign="center"
                            marginBottom={8}
                          ></TextContainer>
                        </Touchable>
                      </Container>
                    </Container>
                    <Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </ScrollView>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
    maxHeight: '80%'
  }
});

export default PointCardsModalScreen;
