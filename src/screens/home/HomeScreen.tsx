import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import theme from 'components/theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText, Button, Container, Touchable, ShippingDropdown, CustomModal } from 'components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Address } from 'rtk';
interface Props {
  onPressMyAccount: () => void;
  onPressShopCart: () => void;
  onPressInvoice: () => void;
  onPressShowAddressesModal: () => void;
  onPressAddNewAddress: () => void;
  onPressLogOut: () => void;
  onPressProducts: () => void;
  name?: string;
  defaultAddress: Address;
  showShippingDropDown?: boolean;
}

const HomeScreen: React.FC<Props> = ({
  onPressMyAccount,
  onPressShopCart,
  onPressInvoice,
  onPressShowAddressesModal,
  onPressAddNewAddress,
  onPressLogOut,
  name,
  defaultAddress,
  onPressProducts,
  showShippingDropDown
}) => {
  const [toggle, setToggle] = useState(showShippingDropDown);

  useEffect(() => {
    setToggle(showShippingDropDown);
  }, [showShippingDropDown]);

  return (
    <View style={{ position: 'absolute', width: '100%', display: 'flex', alignItems: 'center', height: '100%' }}>
      <View style={{ zIndex: 0, width: '100%' }}>
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
      </View>
      <View style={{ zIndex: 0 }}>
        <Container flex>
          <Container row crossCenter style={{ marginVertical: 16 }}>
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
          <Button round onPress={onPressProducts} fontSize="h4" fontBold style={{ marginTop: 8 }} outline>
            Productos
          </Button>
          <Button
            round
            onPress={onPressLogOut}
            fontSize="h4"
            fontBold
            style={{ marginTop: 8 }}
            icon={<SimpleLineIcons name="logout" size={24} color="white" />}
          >
            Salir
          </Button>
        </Container>
      </View>
      {toggle && <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%', zIndex: 1, position: 'absolute', top: 60 }} />}
      {toggle && (
        <View style={{ zIndex: 2, position: 'absolute', top: 60, width: '100%' }}>
          <ShippingDropdown
            onPressAddAddress={onPressAddNewAddress}
            onPressShowAddressesModal={onPressShowAddressesModal}
            address={defaultAddress}
            onPressToogle={() => setToggle(false)}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
