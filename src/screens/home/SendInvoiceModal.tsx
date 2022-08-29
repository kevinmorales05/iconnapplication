import { ActionButton, Container, CustomModal, CustomText, Input } from 'components/atoms';
import { Button, TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_EMAIL } from 'assets/images';
import { useForm } from 'react-hook-form';
import { emailRules } from 'utils/rules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface SendInvoiceModalProps {
  visible: boolean;
  onPressOut: () => void;
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({ visible, onPressOut }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const { control, register } = useForm({
    mode: 'onChange'
  });

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
            <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Reenviar factura" typography="h3" fontBold />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <View style={{ height: 100 }}>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Reenviaremos esta factura a tu email registrado:" />
              <Input
                {...register('email')}
                name="email"
                control={control}
                autoCorrect={false}
                keyboardType="email-address"
                placeholder={`a.ramirez.corp@hotmail.com`}
                blurOnSubmit={false}
                maxLength={30}
                marginTop={40}
                prefixImage={ICONN_EMAIL}
              />
            </View>
            <Container style={{ marginVertical: 10 }}>
              <CustomText
                textColor={theme.brandColor.iconn_grey}
                text="Puedes agregar otros correos adicionales separándolos con un espacio."
                typography="placeholder"
              />
            </Container>
            <Container row space="between" style={{ marginTop: 29 }}>
              <Button length="short" color="iconn_light_grey" fontColor="dark" round fontBold fontSize="h4" onPress={() => {}}>
                Cancelar
              </Button>
              <Button length="short" round fontBold fontSize="h4" leftIcon={<Feather name="send" size={20} color={theme.fontColor.white} />} onPress={() => {}}>
                Reenviar
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

export default SendInvoiceModal;
