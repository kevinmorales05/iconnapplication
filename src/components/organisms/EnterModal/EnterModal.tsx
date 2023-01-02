import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { Button, TextContainer } from 'components/molecules';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProviderInterface } from 'rtk';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface EnterModalDataInterface {
  visible: boolean;
  secondaryMessage: string;
  onPressOut: () => void;
  onPressSocialButton: (type: string) => void;
  onPressEmail: () => void;
  providers: AuthProviderInterface[];
}

const EnterModal: React.FC<EnterModalDataInterface> = ({ visible, secondaryMessage, onPressOut, onPressSocialButton, onPressEmail, providers }) => {
  const { containerStyle } = styles;

  const renderButtons = () => {
    if (providers.length) {
      return providers.map(provider => {
        if (provider.providerName === 'Facebook' && Platform.OS === 'ios') {
          return (
            <Button
              key="facebookBtn"
              color="facebook"
              round
              onPress={() => {
                onPressSocialButton(provider.providerName);
              }}
              fontSize="h4"
              fontBold
              style={{ marginTop: 8 }}
              icon={<FontAwesome5 name="facebook" size={24} color="white" />}
            >
              Continúa con Facebook
            </Button>
          );
        } else if (provider.providerName === 'Google') {
          return (
            <Button
              key="googleBtn"
              color="google"
              round
              onPress={() => {
                onPressSocialButton(provider.providerName);
              }}
              fontSize="h4"
              fontBold
              style={{ marginTop: 8 }}
              icon={<FontAwesome5 name="google" size={24} color="white" />}
            >
              Continúa con Google
            </Button>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: 64,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row>
              <Container width={'95%'} center>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Ingresar a la app" typography="h3" fontBold />
                <TextContainer marginTop={16} textColor={theme.brandColor.iconn_dark_grey} text={secondaryMessage} typography="h5" />
              </Container>
              <Container width={'5%'} center crossAlignment="end">
                <ActionButton
                  style={{ marginRight: 6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container>
              {renderButtons()}
              <Button round onPress={onPressEmail} fontSize="h4" fontBold style={{ marginTop: 8 }} icon={<Fontisto name="email" size={24} color="white" />}>
                Continúa con tu correo
              </Button>
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

export type { EnterModalDataInterface };
export { EnterModal };
