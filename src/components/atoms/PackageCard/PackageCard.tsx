import { ICONN_ESTAFETA_RETURN, ICONN_TRACKING_DELIVERED, ICONN_TRACKING_INTRANSIT } from 'assets/images';
import { TextContainer } from 'components/molecules';
import { Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container } from '../Container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { PackageVtex } from 'rtk';

const RightSwipeActions = (onPressDelete: (id: string) => void) => {
  return (
    <Touchable onPress={onPressDelete}>
      <Container
        center
        crossCenter
        backgroundColor={theme.brandColor.iconn_red_original}
        style={{ paddingLeft: 15, paddingRight: 14, paddingTop: 25, paddingBottom: 25 }}
      >
        <MaterialCommunityIcons name="trash-can-outline" color={theme.brandColor.iconn_white} size={24} />
        <TextContainer text="Eliminar" fontSize={16} fontBold textColor={theme.brandColor.iconn_white} marginTop={11.4} />
      </Container>
    </Touchable>
  );
};

interface Props {
  onPressDetail: (waybill: string) => void;
  packageVtex: PackageVtex;
  onPressDelete: (id: string) => void;
}

const PackageCard: React.FC<Props> = ({ onPressDetail, packageVtex, onPressDelete }) => {
  const pacakgeImageNotDelivered = packageVtex.status === 'ON_TRANSIT' ? ICONN_TRACKING_INTRANSIT : ICONN_ESTAFETA_RETURN;
  const packageStyleNotDelivered = packageVtex.status === 'ON_TRANSIT' ? styles.containerInTransit : styles.containerReturned;
  const packageTextNotDelivered = packageVtex.status === 'ON_TRANSIT' ? 'En tránsito' : 'Devolución';
  return (
    <Swipeable renderRightActions={() => RightSwipeActions(() => onPressDelete(packageVtex.id))}>
      <Container
        backgroundColor={theme.brandColor.iconn_white}
        row
        style={{ paddingTop: 16, borderBottomColor: '#e9edf7', paddingBottom: 15.5, borderBottomWidth: 1, paddingHorizontal: 16 }}
        space="between"
      >
        <Container row>
          <Image source={packageVtex.status === 'DELIVERED' ? ICONN_TRACKING_DELIVERED : pacakgeImageNotDelivered} style={{ height: 32, width: 32 }} />
          <Container>
            <TextContainer text="Número de guía" fontSize={12} marginLeft={16} textColor={theme.fontColor.placeholder} />
            <TextContainer text={packageVtex.waybill} fontBold fontSize={14} marginLeft={16} marginTop={2} textColor="#1F1E1F" />
            <Container style={packageVtex.status === 'DELIVERED' ? styles.containerDelivered : packageStyleNotDelivered}>
              <TextContainer
                text={packageVtex.status === 'DELIVERED' ? 'Entregado' : packageTextNotDelivered}
                fontSize={12}
                textColor={packageVtex.status === 'DELIVERED' ? theme.fontColor.white : theme.fontColor.paragraph}
                textAlign="center"
              />
            </Container>
          </Container>
        </Container>
        <Touchable onPress={onPressDetail}>
          <Container style={{ marginTop: 15 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} />
          </Container>
        </Touchable>
      </Container>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  containerDelivered: {
    backgroundColor: theme.brandColor.iconn_green_original,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
    marginLeft: 16,
    width: 91
  },
  containerInTransit: {
    borderColor: '#34c28c',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
    marginLeft: 16,
    width: 95
  },
  containerReturned: {
    backgroundColor: theme.brandColor.iconn_white,
    borderColor: theme.brandColor.iconn_red_original,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
    marginLeft: 16,
    width: 91
  }
});
export default PackageCard;
