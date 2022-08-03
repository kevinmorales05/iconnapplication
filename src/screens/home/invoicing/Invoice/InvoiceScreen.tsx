import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CardBilling, TaxInfoCard, AnnounceItem, CardAction } from 'components';
import theme from 'components/theme/theme';
import { InvoicingProfileInterface } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  onSubmit: () => void;
  invoicingProfileList: InvoicingProfileInterface[];
  defaultProfile: InvoicingProfileInterface;
}

const InvoiceScreen: React.FC<Props> = ({ onSubmit, invoicingProfileList, defaultProfile }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16
      }}
    >
      <TextContainer typography="h2" fontBold text="Datos fiscales" marginTop={20} marginBottom={8} />

      {defaultProfile ? (
        <>
          <TaxInfoCard
            rfc={defaultProfile.rfc}
            name={defaultProfile.business_name}
            onPress={() => {
              console.log('TODO: change profile...');
            }}
            withExchange
          />
          <AnnounceItem
            message="Verifica tu correo para facturar"
            icon={<AntDesign name="warning" size={25} color={theme.brandColor.iconn_white} />}
          ></AnnounceItem>
          <Container style={{ marginTop: 36 }}>
            <CardAction
              text="Historial de Facturas"
              onPress={() => {}}
              icon={<AntDesign name="copy1" size={25} color={theme.brandColor.iconn_accent_secondary} />}
            />
          </Container>
        </>
      ) : (
        <>
          <Container
            backgroundColor={theme.brandColor.iconn_white}
            height={90}
            style={{ paddingHorizontal: 16, borderTopStartRadius: 8, borderTopEndRadius: 8, marginTop: 4 }}
          >
            <Button length="long" round onPress={onSubmit} fontSize="h4" fontBold marginTop={16}>
              Crear perfil fiscal
            </Button>
          </Container>
          <Container backgroundColor={'#DDE8F3'} center crossCenter height={58} style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
            <TextContainer text="Deberás verificar tu correo para facturar." />
          </Container>
        </>
      )}

      <Container style={{ marginTop: 34 }}>
        <TextContainer text="Nueva Factura" typography="h3" fontBold />
      </Container>
      {/* // TODO: We must disable CardBillling until defaultProfile email is verified. */}
      <Container style={{ marginTop: 18 }}>
        <CardBilling text="Facturar ticket" type="seven" disable={invoicingProfileList.length === 0} onPress={() => {}} />
      </Container>
      <Container style={{ marginTop: 8 }}>
        <CardBilling text="Facturar ticket" type="petro" disable={invoicingProfileList.length === 0} onPress={() => {}} />
      </Container>
    </ScrollView>
  );
};

export default InvoiceScreen;
