import React from 'react';
import { Button, TextContainer } from '../../molecules';
import { Container } from '../../atoms';
import { Image, Platform, ScrollView } from 'react-native';
import { QRDepositInterface } from 'rtk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import theme from 'components/theme/theme';
import { PenSvg } from 'components/svgComponents/PenSvg';
import { TrashSvg } from 'components/svgComponents/TrashSvg';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { BANCOPPEL_LOGO, BANORTE_LOGO, BANREGIO_LOGO, BANSI_LOGO, BBVA_LOGO, CITIBANAMEX_LOGO, SANTANDER_LOGO } from 'assets/images';

interface Props {
  onPressEditButton: () => void;
  onPressDeleteButton: () => void;
  service: QRDepositInterface | undefined;
}

const ServicePaymentQRDetailDeposits: React.FC<Props> = ({ onPressEditButton, onPressDeleteButton, service }) => {
  const insets = useSafeAreaInsets();

  const getImage = (name: string) => {
    switch (name) {
      case 'BBVA':
        return BBVA_LOGO;
      case 'BanCoppel':
        return BANCOPPEL_LOGO;
      case 'Bansi':
        return BANSI_LOGO;
      case 'Banorte':
        return BANORTE_LOGO;
      case 'Banregio':
        return BANREGIO_LOGO;
      case 'Santander':
        return SANTANDER_LOGO;
      case 'Citibanamex':
        return CITIBANAMEX_LOGO;
    }
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex style={{ paddingHorizontal: moderateScale(15) }}>
        <Container>
          <TextContainer text={'Presenta este QR en tienda para poder realizar un depósito más rápido.'} numberOfLines={2} marginTop={24} />
          <Container middle style={{ backgroundColor: theme.brandColor.iconn_white, paddingVertical: 16, marginHorizontal: 35, marginTop: moderateScale(20) }}>
            <Container center crossCenter style={{ marginBottom: 16 }}>
              <Image source={getImage(service?.bank)} style={{ width: moderateScale(114), height: moderateScale(40), resizeMode: 'cover' }} />
            </Container>
            <QRCode value={`${service?.qrCode}`} size={moderateScale(190)} />

            <TextContainer text={service?.tag!} marginTop={24} fontBold typography="h4" />
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Tarjeta o cuenta" fontBold />
            <TextContainer text={`****${service?.accountCard.substring(service?.accountCard.length - 4, service?.accountCard.length)}`} />
          </Container>
          <Container row space="between" style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_med_grey, paddingBottom: 16, marginTop: 24 }}>
            <TextContainer text="Beneficiario" fontBold />
            <TextContainer text={`${service?.name}`} />
          </Container>
        </Container>
        <Container style={{ marginTop: verticalScale(30), paddingBottom: moderateScale(40) }}>
          <Button outline round fontBold fontSize="h4" onPress={onPressEditButton} leftIcon={<PenSvg size={moderateScale(20)} />}>
            Editar
          </Button>
          <Button
            round
            fontBold
            fontSize="h4"
            onPress={onPressDeleteButton}
            leftIcon={<TrashSvg size={moderateScale(20)} />}
            color="iconn_background"
            fontColor="dark"
            borderColor="iconn_med_grey"
            marginTop={12}
          >
            Eliminar
          </Button>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default ServicePaymentQRDetailDeposits;
