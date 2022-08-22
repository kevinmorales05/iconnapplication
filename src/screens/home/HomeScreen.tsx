import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText, Button, Container, SafeArea } from 'components';
import InvoicingHelpModal from './InvoicingHelpModal';
import SendInvoiceModal from './SendInvoiceModal';
import InvoicesFilterModal from './InvoiceFilterModal';
import AmmountModal from './AmmountModal';

interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;
  onPressLogOut: () => void;
  name?: string;
  email?: string;
}

const HomeScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, name, email }) => {
  const insets = useSafeAreaInsets();
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex crossCenter>
        <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text={name ? `¡Hola ${name}!` : '¡Hola!'} typography="h4" fontBold />
        </Container>
        <Button round onPress={onPressInvoice} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Facturación
        </Button>
        <Button round onPress={onPressMyAccount} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Mi cuenta
        </Button>
        <Button round onPress={onPressLogOut} fontSize="h4" fontBold style={{ marginTop: 8 }} icon={<SimpleLineIcons name="logout" size={24} color="white" />}>
          Salir
        </Button>
        <Button
          round
          onPress={() => {
            setModal1(true);
          }}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
        >
          Invoicing help modal
        </Button>
        <Button
          round
          onPress={() => {
            setModal2(true);
          }}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
        >
          Send invoice modal
        </Button>
        <Button
          round
          onPress={() => {
            setModal3(true);
          }}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
        >
          Invoices filter modal
        </Button>
        <Button
          round
          onPress={() => {
            setModal4(true);
          }}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
        >
          Ammount Modal
        </Button>
        {/* Temp modals */}
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <InvoicingHelpModal
            visible={modal1}
            onPressOut={() => {
              setModal1(false);
            }}
          />
        </SafeArea>
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <SendInvoiceModal
            visible={modal2}
            onPressOut={() => {
              setModal2(false);
            }}
          />
        </SafeArea>
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <InvoicesFilterModal
            visible={modal3}
            onPressOut={() => {
              setModal3(false);
            }}
          />
        </SafeArea>
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <AmmountModal
            visible={modal4}
            onPressOut={() => {
              setModal4(false);
            }}
          />
        </SafeArea>
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
