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

interface Props {
  onPressClose: () => void;
  visible: boolean;
}

const PointCardsModalScreen: React.FC<Props> = ({ onPressClose, visible }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const insets = useSafeAreaInsets();

  const showPreferenteScreen = async () => {
    onPressClose();
  };

  const showPayBackScreen = async () => {
    onPressClose();
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
          <Container style={{ marginBottom: 16, alignItems: 'center' }}>
            <Container style={{ alignItems: 'flex-end', width: '100%' }}>
              <ActionButton
                style={{ shadowColor: 'none' }}
                size="xxsmall"
                onPress={onPressClose}
                color="white"
                icon={<Ionicons name="close" size={24} color={theme.fontColor.dark_grey} />}
              />
            </Container>
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Tarjeta de puntos" typography="h3" fontBold />
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
