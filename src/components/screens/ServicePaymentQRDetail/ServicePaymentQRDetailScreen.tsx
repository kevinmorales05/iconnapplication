import React from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container } from '../../atoms';
import { encode } from 'base-64';
import { Image, Platform, ScrollView } from 'react-native';
import { QRInterface, RootState, ServicePaymentInterface, useAppSelector } from 'rtk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config from 'react-native-config';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
import QRCode from 'react-native-qrcode-svg';
import theme from 'components/theme/theme';

interface Props {
  onPressEditButton: () => void;
  onPressDeleteButton: () => void;
  service?: QRInterface;
  servicePayment: ServicePaymentInterface;
}

const ServicePaymentQRDetailScreen: React.FC<Props> = ({ onPressEditButton, onPressDeleteButton, service, servicePayment }) => {
  const insets = useSafeAreaInsets();
  const { ARCUS_QR_PREFIX } = config;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const userIdName = `${user.id}\\${user.name}${user.lastName}${user.secondLastName}`;
  // console.log('userIdName', userIdName);
  const encryption = encode(userIdName);
  // console.log('encryption', encryption);
  // const decryption = decode(encryption);
  // console.log('decryption', decryption);
  const QRString = `${ARCUS_QR_PREFIX}|${servicePayment.SKU}|${servicePayment.UPC}|${service?.contractNumber}||${encryption}|`;
  // console.log('El string del QR es', QRString);

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container>
          <TextContainer text={'Presenta este QR en tienda para poder realizar\nel pago del servicio.'} numberOfLines={2} marginTop={24} />
          <Container middle style={{ backgroundColor: theme.brandColor.iconn_white, paddingVertical: 16, marginHorizontal: 35, marginTop: 16 }}>
            <Container center crossCenter style={{ marginBottom: 16 }}>
              <Image source={{ uri: servicePayment.imageURL }} style={{ width: 100, height: 40, resizeMode: 'cover' }} />
            </Container>
            <QRCode value={QRString} size={140} />

            <TextContainer text={service?.alias!} marginTop={24} fontBold typography="h4" />
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Saldo" fontBold />
            <TextContainer text={`$${service?.balance}`} />
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Vencimiento" fontBold />
            <TextContainer text={`${moment(service?.expirationDate).format('YYYY-MM-DD')}`} />
          </Container>
          <Container row space="between" style={{ paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text={'Número de contrato\no de servicio'} fontBold numberOfLines={2} />
            <TextContainer text={`${service?.contractNumber}`} />
          </Container>
        </Container>
        <Container>
          <Button
            outline
            round
            fontBold
            fontSize="h4"
            onPress={onPressEditButton}
            leftIcon={<Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_green_original} style={{ marginRight: 5 }} />}
          >
            Editar
          </Button>
          <Button
            round
            fontBold
            fontSize="h4"
            onPress={onPressDeleteButton}
            leftIcon={<EvilIcons name="trash" size={theme.actionButtonSize.xxsmall} color={theme.brandColor.iconn_error} />}
            color="iconn_background"
            fontColor="dark"
            borderColor="iconn_med_grey"
            marginTop={12}
          >
            Eliminar
          </Button>
          <TextContainer
            text={`Actualización: ${moment(service?.updatedAt).format('YYYY-MM-DD')}`}
            textColor={theme.fontColor.placeholder}
            typography="h6"
            textAlign="center"
            marginTop={16}
          />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default ServicePaymentQRDetailScreen;
