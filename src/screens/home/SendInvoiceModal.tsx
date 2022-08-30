import { ActionButton, Container, CustomModal, CustomText, Input } from 'components/atoms';
import { Button, TextContainer } from 'components/molecules';
import theme from 'components/theme/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_EMAIL } from 'assets/images';
import { Result } from 'screens/home/invoicing/InvoiceHistory/InvoiceHistory';
import { invoicingServices } from 'services';
import { useAlert, useLoading } from 'context';

interface SendInvoiceModalProps {
  visible: boolean;
  onPressOut: () => void;
  invoice: Result;
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({ visible, onPressOut, invoice }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  const [value, onChangeText] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const loader = useLoading();
  const alert = useAlert();

  useEffect(() => {
    let emails = value.split(' ');

    emails = emails.filter(e => {
      return validateEmail(e);
    });

    setEmails(emails);
  }, [value]);

  useEffect(() => {
    console.log('emails:', emails);
  }, [emails]);

  function validateEmail(email: string) {
    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    return re.test(email);
  }

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
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    flexDirection: 'row',
                    borderColor: '#dadadb',
                    alignContent: 'center',
                    minHeight: 100
                  }}
                >
                  <Image style={{ width: 20, height: 20, marginRight: 10 }} source={ICONN_EMAIL} />
                  <TextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={text => {
                      if (emails.length >= 10) return;

                      onChangeText(text.toLowerCase());
                    }}
                    value={value}
                    style={{ padding: 10, width: '90%' }}
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
              <Button length="short" color="iconn_light_grey" fontColor="dark" round fontBold fontSize="h4" onPress={() => {}}>
                Cancelar
              </Button>
              <Button
                disabled={emails.length === 0}
                length="short"
                round
                fontBold
                fontSize="h4"
                leftIcon={<Feather name="send" size={20} color={theme.fontColor.white} />}
                onPress={async () => {
                  if (!value) return;
                  if (emails.length === 0) return;
                  loader.show();
                  onPressOut();

                  try {
                    await invoicingServices.sendInvoiceEmail(emails, invoice.invoice_uuid);

                    alert.show(
                      {
                        title: 'Factura reenviada',
                        message: `Tu factura se ha enviado a:`,
                        acceptTitle: 'Aceptar',
                        secondMessage: (() => {
                          return emails.join(' \n ');
                        })(),
                        onAccept() {
                          alert.hide();
                        }
                      },
                      'success'
                    );
                  } catch (e) {}
                  loader.hide();
                }}
              >
                Reenviar
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
