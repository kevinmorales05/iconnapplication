import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CardBilling, TaxInfoCard, CustomText, CardAction, SafeArea } from 'components';
import theme from 'components/theme/theme';
import { InvoicingProfileInterface } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { ICONN_INVOICE } from 'assets/images';

interface Props {
  onSubmit: () => void;
  invoicingProfileList: InvoicingProfileInterface[];
  defaultProfile: InvoicingProfileInterface | null;
  resendEmail: () => void;
  goToAddTicketPetro: () => void;
  goToAddTicketSeven: () => void;
}



const InvoiceScreen: React.FC<Props> = ({ onSubmit, invoicingProfileList, defaultProfile, resendEmail, goToAddTicketPetro, goToAddTicketSeven }) => {

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
      <Container style={styles.empty}>
        <Container center style={styles.content}>
          <Container center>
            <Image source={ICONN_INVOICE} />
          </Container>
          <Container style={styles.title}>
            <CustomText textAlign="center" text="NO TIENES FACTURAS DISPONIBLES" alignSelf="center" typography="h3" fontBold fontSize={12} />
          </Container>
          <Container style={styles.placeholder}>
            <CustomText
              fontSize={12}
              textAlign="center"
              alignSelf="center"
              textColor={theme.brandColor.iconn_grey}
              text="Las facturas que realicez con tu cuenta aparecerán aquí."
              typography="h3"
            />
          </Container>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  empty: { flex: 1, marginTop: 100 },
  content: {},
  title: { marginTop: 20 },
  placeholder: { marginTop: 15, width: 235 }
});
