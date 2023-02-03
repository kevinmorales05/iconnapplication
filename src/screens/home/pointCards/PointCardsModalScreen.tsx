import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
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
import { moderateScale } from 'utils/scaleMetrics';
import { logEvent } from 'utils/analytics';
import { RootState, useAppSelector } from 'rtk';

interface Props {
  onPressClose: () => void;
  visible: boolean;
  onPressSendAnalytics: (analyticsName: string, analyticsData: any) => void;
}

const PointCardsModalScreen: React.FC<Props> = ({ onPressClose, visible, onPressSendAnalytics }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const insets = useSafeAreaInsets();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const showPreferenteScreen = async () => {
    onPressClose();
    logEvent('walAddCard', {
      id: user.id,
      description: 'El usuario toca el botón de agregar una tarjeta de puntos',
      cardType: 'ICONN Preferente'
    });
  };

  const showPayBackScreen = async () => {
    onPressClose();
    logEvent('walAddCard', {
      id: user.id,
      description: 'El usuario toca el botón de agregar una tarjeta de puntos',
      cardType: 'Monedero PAYBACK'
    });
  };

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
          <Container style={{ paddingBottom: moderateScale(15), alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <Container style={{ width: '90%', alignItems: 'center', paddingLeft: moderateScale(35) }}>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Tarjeta de puntos" typography="h3" fontBold />
            </Container>
            <Container style={{ width: '10%' }}>
              <ActionButton
                style={{ shadowColor: 'none' }}
                size="xxsmall"
                onPress={onPressClose}
                color="white"
                icon={<Ionicons name="close" size={24} color={theme.fontColor.dark_grey} />}
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
                    <TextContainer text="Selecciona el tipo de tarjeta de puntos que deseas agregar:" fontSize={14} marginTop={15} marginBottom={8} />
                  </Container>
                  <Container style={{ marginTop: 20, marginBottom: 25 }}>
                    <Container row space="evenly">
                      <Container>
                        <Touchable
                          onPress={() => {
                            showPreferenteScreen();
                            navigate('Preferred', { addOrShow: 0, cardNumberToShow: '' });
                            onPressSendAnalytics('walOpenNewCardButton', {
                              id: user.id,
                              description: 'El usuario ingresa a la sección para crear una tarjeta de puntos',
                              cardType: 'ICONN'
                            });
                          }}
                        >
                          <Image source={ICONN_POINT_CARD_MODAL_PREFERENTE} resizeMode="cover" style={{ width: 108, height: 108 }} />
                          <TextContainer text={'ICONN \nPreferente'} fontSize={14} marginTop={20} textAlign="center" marginBottom={8} />
                        </Touchable>
                      </Container>
                      <Container>
                        <Touchable
                          onPress={() => {
                            showPayBackScreen();
                            navigate('Payback', { addOrShow: 0, cardNumberToShow: '' });
                            onPressSendAnalytics('walOpenNewCardButton', {
                              id: user.id,
                              description: 'El usuario ingresa a la sección para crear una tarjeta de puntos',
                              cardType: 'PAYBACK'
                            });
                          }}
                        >
                          <Image source={ICONN_POINT_CARD_MODAL_PAYBACK} resizeMode="cover" style={{ width: 108, height: 108 }} />
                          <TextContainer text={'Monedero \nPAYBACK'} fontSize={14} marginTop={20} textAlign="center" marginBottom={8} />
                        </Touchable>
                      </Container>
                    </Container>
                    <Container />
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
