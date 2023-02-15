import React from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container } from '../../atoms';
import { encode } from 'base-64';
import { Image, Platform, ScrollView } from 'react-native';
import { QRInterface, RootState, ServicePaymentInterface, useAppSelector } from 'rtk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config from 'react-native-config';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
import QRCode from 'react-native-qrcode-svg';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

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

  const subStrUser = user.id?.substring(0, 7);
  // console.log('Los 7 digitos del id de usuario:', subStrUser);

  const fullUserName = `${user.name}${user.lastName}${user.secondLastName}`;
  // console.log('fullUserName:', fullUserName);

  const fullUserNameWithoutSpaces = fullUserName.replace(/\s/g, '');
  // console.log('fullUserName sin espacios:', fullUserNameWithoutSpaces);

  // console.log('fullUserName longitud sin espacios:', fullUserNameWithoutSpaces.length);
  let subStrUserName = '';
  if (fullUserNameWithoutSpaces.length === 0) {
    subStrUserName = 'unknown';
  } else {
    subStrUserName = fullUserName.substring(0, 7);
  }

  // console.log('Los 7 digitos del full username:', subStrUserName);
  // console.log('la longitud del subStrUserName:', subStrUserName.length);

  let userIdName = subStrUser + '\\' + subStrUserName;
  //let userIdName = '1111111' + '\\' + subStrUserName;
  // console.log('El valor que se codifica es:', userIdName);
  const encryption = encode(userIdName);
  // console.log('encryption', encryption);
  // const decryption = decode(encryption);
  // console.log('decryption', decryption);
  const QRString = `${ARCUS_QR_PREFIX}|${servicePayment.UPC}|${servicePayment.SKU}|${service?.billId}||${encryption}|`;
  //TO DO: change service.billId with the account number input, after the validation of the existence of ARCUS
  //console.log('El string del QR es', QRString);
  //  const QRString = `${ARCUS_QR_PREFIX}|${servicePayment.SKU}|${servicePayment.UPC}|${service?.billId}||${encryption}|`;  // console.log('El string del QR es', QRString);

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
              <Image
                source={{ uri: servicePayment.imageURL }}
                style={
                  servicePayment.slug === 'CFE'
                    ? { width: moderateScale(160), height: moderateScale(50), resizeMode: 'cover' }
                    : { width: moderateScale(160), height: moderateScale(50), resizeMode: 'contain' }
                }
              />
            </Container>
            <QRCode value={QRString} size={140} />

            <TextContainer text={service?.alias!} marginTop={24} fontBold typography="h4" />
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Saldo" fontBold />
            {+service?.balance === 0 ? (
              <Container row>
                <AntDesign name="checkcircle" color={theme.brandColor.iconn_green_original} size={15} />
                <TextContainer text="Pagado" marginLeft={8} />
              </Container>
            ) : (
              <TextContainer
                text={`$${parseFloat(service?.balance as string)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
              />
            )}
            {/* <TextContainer
              text={`$${parseFloat(service?.balance as string)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
            /> */}
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Vencimiento" fontBold />
            <TextContainer text={`${moment(service?.expirationDate).format('YYYY-MM-DD')}`} />
          </Container>
          <Container row space="between" style={{ paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text={'Número de contrato\no servicio'} fontBold numberOfLines={2} />
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
            leftIcon={
              <Octicons
                name="pencil"
                size={theme.avatarSize.xxxsmall}
                color={theme.brandColor.iconn_green_original}
                style={{ marginRight: -moderateScale(5) }}
              />
            }
          >
            Editar
          </Button>
          <Button
            round
            fontBold
            fontSize="h4"
            onPress={onPressDeleteButton}
            leftIcon={
              <EvilIcons name="trash" size={theme.actionButtonSize.xxsmall} color={theme.brandColor.iconn_error} style={{ marginRight: -moderateScale(10) }} />
            }
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
