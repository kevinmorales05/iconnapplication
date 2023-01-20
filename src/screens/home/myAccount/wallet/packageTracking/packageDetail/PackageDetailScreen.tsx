import { ICONN_ESTAFETA_DELIVERED, ICONN_ESTAFETA_LOGO, ICONN_ESTAFETA_ONTRANSIT, ICONN_ESTAFETA_RETURNED } from 'assets/images';
import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PackageDetail, PackageVtex, TrackingHistory } from 'rtk';

const WhereaboutsCard = (historyStep: TrackingHistory) => {
  return (
    <Container style={{ borderBottomColor: '#e9edf7', borderBottomWidth: 1, paddingRight: 100 }}>
      <TextContainer text={historyStep.eventPlaceName as string} fontBold fontSize={14} marginTop={15.5} />
      <TextContainer text={historyStep.eventDateTime} fontSize={14} marginTop={4} />
      <Container style={{ marginTop: 2, marginBottom: 15.5 }}>
        <Text numberOfLines={1} ellipsizeMode="clip" style={{ fontSize: 14 }}>
          {historyStep.eventDescriptionSPA}
        </Text>
      </Container>
    </Container>
  );
};

interface Props {
  packageInfo: PackageDetail;
  packageVtex: PackageVtex;
  onDelete: (id: string) => void;
}

const PackageDetailScreen: React.FC<Props> = ({ packageInfo, onDelete, packageVtex }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {packageInfo ? (
        <Container>
          <Container center style={{ marginTop: 23.5 }}>
            <Image source={ICONN_ESTAFETA_LOGO} style={{ height: 48, width: 140 }} />
          </Container>
          <Container style={{ paddingHorizontal: 16 }}>
            <Container row space="between" style={{ marginTop: 24 }}>
              <TextContainer text="Número de guía:" fontBold fontSize={14} />
              <TextContainer text={packageInfo.waybill as string} fontSize={14} />
            </Container>
            <Container height={1} backgroundColor={theme.brandColor.iconn_med_grey} style={{ marginTop: 15.5 }} />
            <Container row space="between" style={{ marginTop: 15.5 }}>
              <TextContainer text="Código de rastreo:" fontBold fontSize={14} />
              <TextContainer text={packageInfo.shortWaybillId as string} fontSize={14} />
            </Container>
          </Container>
          <Container row style={{ marginTop: 32 }} crossCenter center>
            <Image
              source={
                packageInfo.statusENG === 'DELIVERED'
                  ? ICONN_ESTAFETA_DELIVERED
                  : packageInfo.statusENG === 'ON_TRANSIT'
                  ? ICONN_ESTAFETA_ONTRANSIT
                  : ICONN_ESTAFETA_RETURNED
              }
              style={{ height: 32, width: 190 }}
            />
          </Container>
          <Container center>
            <Container
              style={
                packageInfo.statusENG === 'DELIVERED'
                  ? styles.containerDelivered
                  : packageInfo.statusENG === 'ON_TRANSIT'
                  ? styles.containerInTransit
                  : styles.containerSent
              }
            >
              <TextContainer
                text={packageInfo.statusENG === 'DELIVERED' ? 'Entregado' : packageInfo.statusENG === 'ON_TRANSIT' ? 'En tránsito' : 'Devuelto'}
                fontSize={12}
                textColor={packageInfo.statusENG === 'DELIVERED' ? theme.fontColor.white : theme.fontColor.paragraph}
                textAlign="center"
              />
            </Container>
          </Container>
          <Container row style={{ paddingHorizontal: 16, marginTop: 16 }} space="between">
            <Container>
              <TextContainer text="Origen" fontBold fontSize={16} />
              <TextContainer text={packageInfo.trackingHistory[0].eventPlaceName as string} fontSize={14} marginTop={4} />
              <TextContainer text="09/05/2022, 8:00 h" fontSize={14} marginTop={2} />
            </Container>
            <Container backgroundColor={theme.brandColor.iconn_med_grey} height={32} width={1} /* style={{ marginLeft: 24, marginTop: 25 }} */ />
            <Container>
              <TextContainer text="Destino" fontBold fontSize={16} textAlign="right" />
              <TextContainer text="Cuernavaca" fontSize={14} marginTop={4} textAlign="right" />
              <TextContainer text="09/05/2022, 8:00 h" fontSize={14} marginTop={2} textAlign="right" />
            </Container>
          </Container>
          <TextContainer text="Historial" fontBold fontSize={16} marginTop={32} marginLeft={16} />
          <Container row backgroundColor={theme.brandColor.iconn_white}>
            <Container style={{ marginTop: 19, paddingHorizontal: 16 }}>
              {packageInfo.trackingHistory
                ? packageInfo.trackingHistory.map((element, index) => {
                    return packageInfo.trackingHistory[index].isLast === true ? (
                      <Container>
                        <FontAwesome name="circle" size={12} color={theme.brandColor.iconn_green_original} />
                      </Container>
                    ) : (
                      <Container>
                        <FontAwesome name="circle" size={12} color={theme.brandColor.iconn_green_original} />
                        <Container height={77} width={2} backgroundColor={theme.brandColor.iconn_green_original} style={{ marginLeft: 4 }} />
                      </Container>
                    );
                  })
                : null}
            </Container>
            <Container>
              {packageInfo.trackingHistory
                ? packageInfo.trackingHistory.map((element, index) => {
                    return (
                      <WhereaboutsCard
                        eventDateTime={element.eventDateTime}
                        eventDescriptionSPA={element.eventDescriptionSPA}
                        eventPlaceName={element.eventPlaceName}
                        isLast={element.isLast}
                        key={index}
                      />
                    );
                  })
                : null}
            </Container>
          </Container>
          <Container style={{ marginHorizontal: 16, marginTop: 16, marginBottom: 30 }}>
            <Button
              onPress={() => onDelete(packageVtex)}
              color="iconn_grey_background"
              borderColor="iconn_med_grey"
              fontColor="paragraph"
              fontBold
              round
              icon={<MaterialCommunityIcons name="trash-can-outline" color={theme.brandColor.iconn_red_original} size={24} />}
            >
              Eliminar
            </Button>
          </Container>
        </Container>
      ) : null}
    </ScrollView>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  containerDelivered: {
    backgroundColor: theme.brandColor.iconn_green_original,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 17,
    width: 91
  },
  containerInTransit: {
    borderColor: '#34c28c',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 17,
    width: 95
    //marginHorizontal: 150
  },
  containerSent: {
    backgroundColor: theme.brandColor.iconn_med_grey,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 17,
    width: 91
  }
});
