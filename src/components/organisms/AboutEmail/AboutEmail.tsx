import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  ActionButton,
  Container,
  CustomModal,
  CustomText
} from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  onUnderstood: () => void;
  onPressOut: () => void;
}

const AboutEmail: React.FC<Props> = ({ visible, onUnderstood, onPressOut }) => {
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
            <Container
              row
              space="between"
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              <Container>
                <CustomText
                  textColor={theme.brandColor.iconn_dark_grey}
                  text="Acerca del correo electrónico"
                  typography="h3"
                  fontBold
                />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={
                    <Ionicons
                      name="close-outline"
                      size={20}
                      color={theme.fontColor.dark_grey}
                    />
                  }
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container>
              <CustomText
                textColor={theme.brandColor.iconn_dark_grey}
                text={`Utiliza un correo electrónico válido al que puedas acceder, enviaremos un código de verificación para registrar tu cuenta.
                \nPodrás modificar el correo electrónico asociado a tu cuenta más tarde. (Esto no sería posible si registras tu cuenta con una red social).`}
                typography="paragraph"
              />

              <Button
                color="iconn_light_grey"
                fontColor="dark"
                round
                fontBold
                fontSize="h4"
                onPress={onUnderstood}
                style={{ marginTop: 8 }}
              >
                Entendido
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

export default AboutEmail;
