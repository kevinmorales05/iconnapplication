import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RechargeSupplier, ServiceQRType } from 'rtk';
import QRCode from 'react-native-qrcode-svg';

interface Props {
  supplier: RechargeSupplier;
  amount: number;
  fieldValues: any;
  qrData: string;
  rechargeUser?: ServiceQRType;
}

const RechargeQRScreen: React.FC<Props> = ({ supplier, amount, fieldValues, qrData, rechargeUser }) => {
  return rechargeUser ? (
    <ScrollView>
      <TextContainer text="Presenta este QR en tienda para poder realizar tu recarga de manera ágil." fontSize={14} marginHorizontal={16} marginTop={23.5} />
      <Container center backgroundColor={theme.brandColor.iconn_white} style={styles.amountContainer}>
        <Image source={{ uri: rechargeUser.imageURL }} style={{ height: 40, width: 114 }} />
        <Container style={{ height: 192, width: 192, marginTop: 4 }}>
          <QRCode value={qrData} size={192} />
        </Container>
        <TextContainer text={rechargeUser.label} fontBold fontSize={16} marginTop={8} />
      </Container>
      <Container row style={styles.containerData}>
        <TextContainer text="Teléfono celular" fontBold marginTop={24} fontSize={14} />
        <TextContainer text={rechargeUser.reference} marginTop={24} fontSize={14} />
      </Container>
      <Container style={styles.line} />
      <Container row style={styles.containerData}>
        <TextContainer text="Monto de recarga" fontBold marginTop={15.5} fontSize={14} />
        <TextContainer text={'$' + rechargeUser.amount} marginTop={24} fontSize={14} />
      </Container>
      <Container style={{ marginHorizontal: 16, marginTop: 32 }}>
        <Button
          color="iconn_grey_background"
          fontColor="light_green"
          fontBold
          fontSize="h4"
          borderColor="iconn_green_original"
          round
          onPress={() => {}}
          leftIcon={<Octicons name="pencil" color={theme.brandColor.iconn_green_original} size={20} />}
        >
          Editar
        </Button>
      </Container>
      <Container style={{ marginHorizontal: 16, marginTop: 12 }}>
        <Button
          color="iconn_grey_background"
          fontColor="dark_grey"
          fontBold
          fontSize="h4"
          borderColor="iconn_med_grey"
          round
          onPress={() => {}}
          leftIcon={<Ionicons name="md-trash-outline" color={theme.brandColor.iconn_red_original} size={20} />}
        >
          Eliminar
        </Button>
      </Container>
    </ScrollView>
  ) : (
    <ScrollView>
      <TextContainer text="Presenta este QR en tienda para poder realizar tu recarga de manera ágil." fontSize={14} marginHorizontal={16} marginTop={23.5} />
      <Container center backgroundColor={theme.brandColor.iconn_white} style={styles.amountContainer}>
        <Image source={{ uri: supplier.imageURL }} style={{ height: 40, width: 114 }} />
        <Container style={{ height: 192, width: 192, marginTop: 4 }}>
          <QRCode value={qrData} size={192} />
        </Container>
        <TextContainer text={fieldValues.alias} fontBold fontSize={16} marginTop={8} />
      </Container>
      <Container row style={styles.containerData}>
        <TextContainer text="Teléfono celular" fontBold marginTop={24} fontSize={14} />
        <TextContainer text={fieldValues.telephone} marginTop={24} fontSize={14} />
      </Container>
      <Container style={styles.line} />
      <Container row style={styles.containerData}>
        <TextContainer text="Monto de recarga" fontBold marginTop={15.5} fontSize={14} />
        <TextContainer text={'$' + amount} marginTop={24} fontSize={14} />
      </Container>
      <Container style={{ marginHorizontal: 16, marginTop: 32 }}>
        <Button
          color="iconn_grey_background"
          fontColor="light_green"
          fontBold
          fontSize="h4"
          borderColor="iconn_green_original"
          round
          onPress={() => {}}
          leftIcon={<Octicons name="pencil" color={theme.brandColor.iconn_green_original} size={20} />}
        >
          Editar
        </Button>
      </Container>
      <Container style={{ marginHorizontal: 16, marginTop: 12 }}>
        <Button
          color="iconn_grey_background"
          fontColor="dark_grey"
          fontBold
          fontSize="h4"
          borderColor="iconn_med_grey"
          round
          onPress={() => {}}
          leftIcon={<Ionicons name="md-trash-outline" color={theme.brandColor.iconn_red_original} size={20} />}
        >
          Eliminar
        </Button>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 52,
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 24
  },
  containerData: {
    marginHorizontal: 16,
    justifyContent: 'space-between'
  },
  line: {
    height: 1,
    backgroundColor: theme.brandColor.iconn_med_grey,
    marginTop: 15.5,
    marginHorizontal: 16
  }
});

export default RechargeQRScreen;
