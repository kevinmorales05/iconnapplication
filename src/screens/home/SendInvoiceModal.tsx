import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import { Button } from 'components/molecules';
import theme from 'components/theme/theme';
import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_EMAIL } from 'assets/images';
import { Result } from 'screens/home/invoicing/InvoiceHistory/InvoiceHistory';
import { useAlert, useLoading, useToast } from 'context';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { emailsList } from 'utils/rules';
import { forwardInvoiceThunk, useAppDispatch } from 'rtk';

const DEFAULT_COUNTDOWN_TIME = 30;
interface SendInvoiceModalProps {
  visible: boolean;
  onPressOut: () => void;
  invoice: Result;
  seconds: number;
  startCountdown: (seconds: number) => void;
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({ visible, onPressOut, invoice, seconds, startCountdown }) => {
  const { containerStyle } = styles;
  const dispatch = useAppDispatch();
  const toast = useToast();

  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm({
    mode: 'onChange'
  });

  const loader = useLoading();
  const alert = useAlert();

  const submit = async (fields: FieldValues) => {
    loader.show();
    onPressOut();
    try {
      const response = await dispatch(
        forwardInvoiceThunk({
          uuid: invoice.invoice_uuid,
          emails: fields.emailsList.split(',')
        })
      ).unwrap();
      if (response.responseCode === 901) {
        startCountdown(DEFAULT_COUNTDOWN_TIME);
        alert.show(
          {
            title: 'Factura reenviada',
            message: `Tu factura se ha enviado a: \n\n${fields.emailsList}`,
            acceptTitle: 'Aceptar',
            onAccept() {
              alert.hide();
            }
          },
          'success'
        );
        reset({ emailsList: '' });
      } else {
        toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      }
    } catch (error) {
      // console.warn(error);
    }
  };

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <View
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
            <Container style={{ height: 200 }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Reenviaremos esta factura a tu email registrado:" />
                <View
                  style={{
                    height: 40,
                    marginVertical: 12,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    flexDirection: 'row',
                    borderColor: '#dadadb',
                    minHeight: 100
                  }}
                >
                  <Image style={{ width: 20, height: 20, marginRight: 10 }} source={ICONN_EMAIL} />
                  <Controller
                    name="emailsList"
                    rules={emailsList(3)}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{ width: '100%', height: '100%' }}
                        onBlur={onBlur}
                        onChangeText={val => onChange(val)}
                        value={value}
                        multiline
                        textAlignVertical="center"
                        placeholder=""
                        keyboardType="default"
                        maxLength={300}
                      />
                    )}
                  />
                </View>
                <View>
                  <CustomText
                    textColor={theme.brandColor.iconn_grey}
                    text="Puedes agregar otros correos adicionales separándolos con un espacio."
                    typography="placeholder"
                  />
                </View>
              </View>
            </Container>
            <Container row space="between" style={{ marginTop: 29 }}>
              <Button length="short" color="iconn_light_grey" fontColor="dark" round fontBold fontSize="h4" onPress={onPressOut}>
                Cancelar
              </Button>
              <Button
                disabled={!isValid || seconds > 0}
                length="short"
                round
                fontBold
                fontSize="h4"
                leftIcon={seconds === 0 ? <Feather name="send" size={20} color={theme.fontColor.white} /> : undefined}
                onPress={handleSubmit(submit)}
              >
                {seconds > 0 ? `Reenviar (${seconds})` : 'Reenviar'}
              </Button>
            </Container>
          </Container>
        </View>
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
