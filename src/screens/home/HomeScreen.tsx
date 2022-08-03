import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText, Button, Container, CardBilling, SafeArea } from 'components';
import { NavigationContext } from '@react-navigation/native';
import InvoiceModal from "./InvoiceModal";

interface Props {
  onPressInvoice: () => void;
  onPressMyAccount: () => void;  
  onPressLogOut: () => void;
  name?: string;
  email?: string;
}

const HomeScreen: React.FC<Props> = ({ onPressMyAccount, onPressInvoice, onPressLogOut, name, email }) => {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const navigation = React.useContext(NavigationContext);

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
        <Button round onPress={() => {
          setVisible(true)
        }} fontSize="h4" fontBold style={{ marginTop: 8 }} icon={<SimpleLineIcons name="logout" size={24} color="white" />}>
          Datos Fiscales
        </Button>
        {/* <CardBilling text="Facturar ticket" onPress={() => console.log('funciona!!!')} type="seven"  /> */}
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <InvoiceModal
            visible={visible}
            handleCamera={() => {
            }}
            handleGallery={() => {
            }}
            onPressOut={() => {
              setVisible(false)
            }}
          />
        </SafeArea>
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
