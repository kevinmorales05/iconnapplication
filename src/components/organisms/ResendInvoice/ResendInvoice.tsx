import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, TextContainer } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { emailsList } from 'utils/rules';

interface Props {
  visible: boolean;
  message: string;
  secondMessage: string;
  onPressOut: () => void;
  resend: (fields: any) => void;
}

const ResendInvoice: React.FC<Props> = ({ visible, message, secondMessage, onPressOut, resend }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    mode: 'onChange'
  });

  return (
    <CustomModal visible={visible} onDismiss={onPressOut} animationType="slide">
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

            <Container style={{ height: 240 }}>
              <TextContainer text={message} marginBottom={12} />

              <Controller
                name="emailsList"
                rules={emailsList(3)}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ height: 89, paddingHorizontal: 12, borderColor: theme.brandColor.iconn_light_grey, borderWidth: 1, borderRadius: 8 }}
                    onBlur={onBlur}
                    onChangeText={val => onChange(val)}
                    value={value}
                    multiline
                    placeholder="Correos electrónicos"
                    keyboardType="default"
                    maxLength={300}
                  />
                )}
              />

              <TextContainer text={secondMessage} typography="description" textColor={theme.fontColor.grey} marginTop={16} />

              <Container flex row crossAlignment="end" space="between" style={{ marginBottom: 8, marginTop: 24 }}>
                <Button
                  style={{ width: 150, height: 58, borderRadius: 12 }}
                  length="short"
                  round
                  fontBold
                  fontSize="h3"
                  size="medium"
                  marginTop={8}
                  fontColor="dark"
                  disabled={false}
                  onPress={onPressOut}
                  color="iconn_light_grey"
                >
                  {`${'Cancelar'}`}
                </Button>
                <Button
                  style={{ width: 150, height: 58, borderRadius: 12 }}
                  round
                  fontBold
                  fontSize="h3"
                  size="medium"
                  marginTop={8}
                  length="short"
                  disabled={!isValid}
                  fontColor="white"
                  onPress={handleSubmit(resend)}
                  color="iconn_accent_principal"
                >
                  {`${'Reenviar'}`}
                </Button>
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

export default ResendInvoice;
