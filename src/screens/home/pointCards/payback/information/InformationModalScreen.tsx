import React, { useState }  from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Container, TextContainer, AnimatedCarousel } from 'components';
import { CustomModal } from '../../../../../components/atoms';
import { ActionButton } from '../../../../../components/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CarouselItem } from 'rtk';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  onPressClose: () => void;
  visible: boolean;
  cards: CarouselItem[];
}

const InformationModalScreen: React.FC<Props> = ({ onPressClose, visible, cards }) => {
  const [visibl, setVisibl] = useState<boolean>(false);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const insets = useSafeAreaInsets();
  
  const onPressOut = () => {
    setVisibl(!visible);
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
          <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
            <Container />
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text='Número de tarjeta PAYBACK' typography="h3" fontBold />
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
                  <Container style={{ marginTop: 15, marginBottom: 15 }}>
                    <Container space='center' style={{ height:moderateScale(173), width:'100%', backgroundColor:theme.brandColor.iconn_background}}>
                    <AnimatedCarousel cards items={cards} />
                    </Container>
                    <TextContainer
                      text="Recuerda que el número del monedero no es el mismo que se solicita para dar de alta tu Tarjeta de PAYBACK."
                      fontSize={14}
                      marginTop={35}
                    ></TextContainer>
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

export default InformationModalScreen;
