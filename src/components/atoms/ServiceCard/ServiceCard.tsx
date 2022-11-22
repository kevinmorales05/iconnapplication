import { TextContainer } from 'components/molecules';
import React, { useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { RechargeAmount, ServiceQRType } from 'rtk';
import { Container } from '../Container';
import theme from 'components/theme/theme';
import { Touchable } from 'components';
import { vtexDocsServices } from 'services';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WalletStackParams } from 'navigation/types';

interface ServiceCardProps {
  service: ServiceQRType;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  //const qrData: string = `711APPU|${amountSupplier?.UPC}|${amountSupplier?.SKU}|${rechargeFields.telephone}|${amountSupplier?.ammount}00`;
  const { CATEGORIES_ASSETS } = Config;
  const getDataforQr = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocsByDocDataEntity('AR');
    let amountQR: RechargeAmount;
    if (data.length > 0) {
      for (const dat of data) {
        if (dat.supplierName === service.supplierName && dat.ammount === service.amount) {
          amountQR = {
            ammount: dat.ammount,
            id: dat.id,
            imageUrl: CATEGORIES_ASSETS + `${dat.supplierName}Logo.png`,
            productName: dat.productName,
            SKU: dat.SKU,
            supplierName: dat.supplierName,
            UPC: dat.UPC
          };
          return amountQR;
        }
      }
    }
  }, []);

  const setQR = async () => {
    const amountQR = await getDataforQr();
    const qrData: string = `711APPU|${amountQR?.UPC}|${amountQR?.SKU}|${service.reference}|${amountQR?.ammount}00`;
    navigate('RechargeQR', { rechargeUser: service, qrData: qrData, amount: amountQR });
  };
  return (
    <Touchable onPress={service.qrType === 'air' ? setQR : () => {}}>
      {/* </Touchable><Touchable onPress={() => navigate('RechargeQR', { rechargeUser: service })}> */}
      <Container row style={styles.serviceCard}>
        <Image source={{ uri: service.imageURL }} style={{ height: 48, width: 48 }} resizeMode={'contain'} />
        <Container>
          <TextContainer
            text={service.qrType === 'service' ? 'Pago de servicio' : 'Recarga Tiempo Aire'}
            textColor={theme.fontColor.placeholder}
            fontSize={12}
            marginLeft={16}
          />
          <TextContainer text={service.label} fontBold fontSize={14} marginLeft={16} marginTop={6} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  containerCardDot: {
    borderColor: theme.brandColor.iconn_grey,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 65,
    marginTop: 16,
    paddingTop: 50,
    paddingBottom: 50,
    height: 164,
    width: 261
  },
  cardIcon: {
    height: 32,
    width: 32
  },
  serviceCard: {
    paddingLeft: 16,
    marginLeft: 16,
    paddingTop: 28,
    borderBottomColor: '#e9edf7',
    borderBottomWidth: 1,
    paddingBottom: 15.5
  }
});
