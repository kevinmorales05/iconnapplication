import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, TouchableText } from 'components/molecules';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  onContinueEmail: () => void;
  onContinueGuest: () => void;
  onIhaveAccount: () => void;
  onPressOut: () => void;
}

const OtherInputMethods: React.FC<Props> = ({
  visible,
  onContinueEmail,
  onContinueGuest,
  onIhaveAccount,
  onPressOut
}) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row space='between' style={{ marginTop: 16, marginBottom: 16 }}>
              <Container>
                <CustomText
                  textColor={theme.brandColor.iconn_dark_grey}
                  text="Otros métodos de ingreso"
                  typography="h3"
                  fontBold
                />
              </Container>
              <Container>
                <ActionButton
                  style={{marginTop:-6, shadowColor:'none'}}
                  icon={<Ionicons
                        name="close-outline"
                        size={20}
                        color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color='iconn_med_grey'
                  circle
                />
              </Container>
            </Container>
            <Container>
              <Button marginTop={28} round fontBold fontSize="h4" onPress={onContinueEmail}
                icon={<Fontisto name="email" size={24} color="white" />}
              >
                Continúa con tu correo
              </Button>
              <Button
                color="iconn_light_grey"
                fontColor="dark"
                round
                fontBold
                fontSize="h4"
                onPress={onContinueGuest}
                style={{ marginTop: 8 }}
              >
                Entrar como invitado
              </Button>
              
              <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
                <TouchableText
                  underline
                  textColor={theme.brandColor.iconn_accent_principal}
                  text="Ya tengo cuenta"
                  typography="h4"
                  fontBold
                  onPress={onIhaveAccount}
                  marginTop={8}
                />
              </Container>
            </Container>
          </Container>
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
    padding: 16
  }
});

export default OtherInputMethods;
