import { TextContainer } from 'components/molecules';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ServiceQRType } from 'rtk';
import { Container } from '../Container';
import theme from 'components/theme/theme';

interface ServiceCardProps {
  service: ServiceQRType;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Container row style={styles.serviceCard}>
      <Image source={{ uri: service.imageURL }} style={{ height: 48, width: 48 }} resizeMode={'contain'} />
      <Container>
        <TextContainer
          text={service.qrType == 'service' ? 'Pago de servicio' : 'Recarga Tiempo Aire'}
          textColor={theme.fontColor.placeholder}
          fontSize={12}
          marginLeft={16}
        />
        <TextContainer text={service.label} fontBold fontSize={14} marginLeft={16} marginTop={6} />
      </Container>
    </Container>
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
