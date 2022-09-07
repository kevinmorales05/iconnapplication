import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText, Button, Container, Touchable, ShippingDropdown, CustomModal } from 'components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
interface Props {
  onPressMyAccount: () => void;
  onPressShopCart: () => void;
  onPressInvoice: () => void;
  onPressShowAddressesModal: () => void;
  onPressAddNewAddress: () => void;
  onPressLogOut: () => void;
  name?: string;
  email?: string;
}

const HomeScreen: React.FC<Props> = ({
  onPressMyAccount,
  onPressShopCart,
  onPressInvoice,
  onPressShowAddressesModal,
  onPressAddNewAddress,
  onPressLogOut,
  name,
  email
}) => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [toggle, setToggle] = useState(false);

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <Touchable
          onPress={() => {
            setToggle(current => {
              return !current;
            });
          }}
        >
          <Container style={{ paddingVertical: 20, paddingHorizontal: 10, display: 'flex', justifyContent: 'space-between' }} row>
            <CustomText text={'¿Como quieres recibir tus productos?'} fontBold />
            {toggle ? <Icon name="up" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
          </Container>
        </Touchable>
        {toggle && (
          <CustomModal visible={toggle} onDismiss={() => {}}>
              <ShippingDropdown
                onPressOut={() => {
                  setToggle(false);
                }}
              />
          </CustomModal>
        )}
      </Container>
      <Container flex crossCenter>
        <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text={name ? `¡Hola ${name}!` : '¡Hola!'} typography="h4" fontBold />
        </Container>
        <Button round onPress={onPressInvoice} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Facturación
        </Button>
        <Button round onPress={onPressShowAddressesModal} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Modal con direcciones
        </Button>
        <Button round onPress={onPressAddNewAddress} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Boton para agregar nueva direccion
        </Button>
        <Button round onPress={onPressMyAccount} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Mi cuenta
        </Button>
        <Button round onPress={onPressShopCart} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
          Carrito de compras
        </Button>
        <Button round onPress={onPressLogOut} fontSize="h4" fontBold style={{ marginTop: 8 }} icon={<SimpleLineIcons name="logout" size={24} color="white" />}>
          Salir
        </Button>
        <Button
          round
          onPress={() => {
            navigate('EcommerceStack');
          }}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          icon={<SimpleLineIcons name="logout" size={24} color="white" />}
        >
          Ecommerce
        </Button>
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
