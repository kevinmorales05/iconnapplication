import { PaymentWallet } from "rtk";
import React from 'react';
import { ICONN_DOLLAR_CIRCLE } from "assets/images";
import { TextContainer } from "components/molecules";
import { Image, StyleSheet } from "react-native";
import { Container } from "../Container";
import theme from "components/theme/theme";

interface PaymentCardProps {
    payment: PaymentWallet;
  }
  
  const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
    return (
      <Container row style={styles.serviceCard}>
        <Container crossCenter circle height={32} backgroundColor={theme.brandColor.iconn_green_original} style={{ padding: 4 }}>
          <Image source={ICONN_DOLLAR_CIRCLE} style={{ height: 24, width: 24 }} />
        </Container>
        <Container>
          <TextContainer text={payment.paymentType} marginLeft={16} fontSize={12} textColor={theme.fontColor.placeholder} />
          <TextContainer text={payment.addressee} fontBold marginLeft={16} fontSize={14} marginTop={2} />
          <TextContainer text={payment.bank} marginLeft={16} fontSize={14} marginTop={2} />
        </Container>
      </Container>
    );
  };

  export default PaymentCard;
  
  const styles = StyleSheet.create({
    serviceCard: {
      paddingLeft: 16,
      marginLeft: 16,
      paddingTop: 28,
      borderBottomColor: '#e9edf7',
      borderBottomWidth: 1,
      paddingBottom: 15.5
    }
  });