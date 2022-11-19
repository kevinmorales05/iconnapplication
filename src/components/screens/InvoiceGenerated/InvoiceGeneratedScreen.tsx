import React from 'react';
import theme from 'components/theme/theme';
import { ICONN_INVOICING_SUCCESS_INVOICE_GENERATED } from 'assets/images';
import { Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, CardDivided, TextContainer } from '../../molecules';
import { Container } from '../../atoms';
import { InvoiceGeneratedResponseInterface, InvoicingProfileInterface } from 'rtk';

interface Props {
  finalize: () => void;
  newInvoice: () => void;
  viewGeneratedInvoice: () => void;
  resendGeneratedInvoice: () => void;
  defaultProfile: InvoicingProfileInterface;
  invoiceGenerated: InvoiceGeneratedResponseInterface;
}

const InvoiceGeneratedScreen: React.FC<Props> = ({ finalize, newInvoice, viewGeneratedInvoice, resendGeneratedInvoice, defaultProfile, invoiceGenerated }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex crossCenter>
        <Image source={ICONN_INVOICING_SUCCESS_INVOICE_GENERATED} style={{ width: 64, height: 64, alignSelf: 'center' }} />
        <TextContainer text="Factura generada" fontSize={theme.fontSize.h1} fontWeight={'800'} marginTop={24} textAlign="center" />
        <Container style={{ marginTop: 60 }} center>
          <TextContainer text="Tu factura se ha enviado al correo:" fontSize={theme.fontSize.h4} marginTop={2} />
          <TextContainer
            text={defaultProfile ? defaultProfile.email : 'Error'}
            textColor={theme.brandColor.iconn_green_original}
            fontBold
            fontSize={theme.fontSize.h4}
            marginTop={2}
          />
        </Container>
        <Container style={{ marginTop: 50 }}>
          <CardDivided
            rfcText={defaultProfile ? defaultProfile.rfc : 'Error'}
            textCard="Total:"
            actionText={invoiceGenerated ? `$${invoiceGenerated.total}` : 'Error'}
            typeImage={invoiceGenerated ? invoiceGenerated.establishment : undefined}
            textButtonLeft="Ver"
            textButtonRigth="Reenviar"
            onPressButtonLeft={viewGeneratedInvoice}
            onPressButtonRigth={resendGeneratedInvoice}
          />
        </Container>
      </Container>
      <Container flex row crossAlignment="end" space="between" style={{ marginBottom: 8 }}>
        <Button
          style={{ width: 170, height: 58, borderRadius: 12 }}
          length="short"
          round
          fontBold
          fontSize="h3"
          size="medium"
          marginTop={8}
          fontColor="dark"
          disabled={!true}
          onPress={newInvoice}
          color="iconn_light_grey"
        >
          Nueva factura
        </Button>
        <Button
          style={{ width: 170, height: 58, borderRadius: 12 }}
          round
          fontBold
          fontSize="h3"
          size="medium"
          marginTop={8}
          length="short"
          disabled={!true}
          fontColor="white"
          onPress={finalize}
          color="iconn_accent_principal"
        >
          Finalizar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default InvoiceGeneratedScreen;
