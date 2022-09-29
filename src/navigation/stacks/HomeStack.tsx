import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import HomeController from 'screens/home/HomeController'; /** relocated to tabNavigator */
import MyAccountController from 'screens/home/myAccount/MyAccountController';
import EditEmailController from 'screens/auth/onboarding/EditEmail/EditEmailController';
import EditEmailOtpController from 'screens/auth/onboarding/EditEmailOtp/EditEmailOtpController';
import EditPasswordController from 'screens/auth/onboarding/EditPassword/EditPasswordController';
import ProfileController from 'screens/home/myAccount/profile/ProfileController';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import AddRFCController from 'screens/home/myAccount/manageTaxInfo/AddRFC/AddRFCController';
import TaxInfoController from 'screens/home/myAccount/manageTaxInfo/TaxInfo/TaxInfoController';
import InvoiceController from 'screens/home/invoicing/Invoice/InvoiceController';
import CreateTaxProfileController from 'screens/home/invoicing/CreateTaxProfile/CreateTaxProfileController';
import AddTicketPetroController from 'screens/home/invoicing/invoicingPetro/AddTicketPetro/AddTicketPetroController';
import AddTicketSevenController from 'screens/home/invoicing/invoicingSeven/AddTicketSeven/AddTicketSevenController';
import InvoiceTicketPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceTicketPetro/InvoiceTicketPetroController';
import InvoiceTicketSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceTicketSeven/InvoiceTicketSevenController';
import InvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceGeneratedPetro/InvoiceGeneratedPetroController';
import InvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceGeneratedSeven/InvoiceGeneratedSevenController';
import InvoiceHistoryController from 'screens/home/invoicing/InvoiceHistory/InvoiceHistoryController';
import ViewInvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/ViewInvoiceGeneratedPetro/ViewInvoiceGeneratedPetroController';
import ViewInvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/ViewInvoiceGeneratedSeven/ViewInvoiceGeneratedSevenController';
import CodeReaderController from 'screens/home/invoicing/invoicingSeven/CodeReader/CodeReaderController';
import AddressesController from 'screens/home/myAccount/addresses/AddressesController';
import ShopCartController from 'screens/home/shoppingCart/ShopCartController';
import ProductZoomController from 'screens/home/productZoom/ProductoZoomController';
import { BasketCounter, EcommerceHeader } from 'components';
import PostalCodeController from 'screens/ecommerce/postalCode/PostalCodeController';
import SearchSellerController from 'screens/ecommerce/seller/SearchSellerController';
import MyOrdersController from 'screens/home/MyOrdersController';
import Icon from 'react-native-vector-icons/AntDesign';
import { Touchable } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabNavigator } from 'navigation/TabNavigator';
import ChangedPasswordController from 'screens/auth/onboarding/ChangedPassword/ChangedPasswordController';
import ProductDetailController from 'screens/ecommerce/productDetail/ProductDetailController';
import AboutUsController from 'screens/home/myAccount/aboutUs/AboutUsController';
import theme from 'components/theme/theme';
import LegalController from 'screens/home/myAccount/aboutUs/Legal/LegalController';
import ContactInformationController from 'screens/home/shoppingCart/ContactInformation/ContactInformationController';
import CheckoutController from 'screens/home/shoppingCart/Checkout/CheckoutController';

const HomeStack: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const Stack = createNativeStackNavigator<HomeStackParams>();

  const closeShoppingCart = () => {
    navigate('Home');
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="PostalCode" id="HomeStack">
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <EcommerceHeader />,
          headerRight: () => <BasketCounter />
        }}
        name="Home"
        component={TabNavigator}
      />
      <Stack.Screen name="MyAccount" component={MyAccountController} />
      <Stack.Screen name="Profile" options={{ title: 'Mi Perfil' }} component={ProfileController} />
      <Stack.Screen name="EditEmail" options={{ title: 'Editar Correo' }} component={EditEmailController} />
      <Stack.Screen name="EnterOtp" options={{ title: 'Editar Correo' }} component={EditEmailOtpController} />
      <Stack.Screen name="EditPassword" component={EditPasswordController} />
      <Stack.Screen name="InviteSignUp" component={InviteSignUpController} />
      <Stack.Screen options={{ title: 'Nuevo Perfil Fiscal' }} name="AddRFC" component={AddRFCController} />
      <Stack.Screen options={{ title: 'Datos Fiscales' }} name="TaxInfo" component={TaxInfoController} />
      <Stack.Screen options={{ title: 'Facturar' }} name="Invoice" component={InvoiceController} />
      <Stack.Screen options={{ title: 'Perfil Fiscal' }} name="CreateTaxProfile" component={CreateTaxProfileController} />
      <Stack.Screen name="ChangedPassword" options={{ headerShown: false }} component={ChangedPasswordController} />
      <Stack.Screen
        options={{
          title: 'Historial de facturas'
        }}
        name="InvoiceHistory"
        component={InvoiceHistoryController}
      />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="AddTicketPetro" component={AddTicketPetroController} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="AddTicketSeven" component={AddTicketSevenController} />
      <Stack.Screen options={{ headerShown: false }} name="InvoiceTicketPetro" component={InvoiceTicketPetroController} />
      <Stack.Screen options={{ headerShown: false }} name="InvoiceTicketSeven" component={InvoiceTicketSevenController} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="InvoiceGeneratedPetro" component={InvoiceGeneratedPetroController} />
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="InvoiceGeneratedSeven" component={InvoiceGeneratedSevenController} />
      <Stack.Screen options={{ headerShown: false }} name="ViewInvoiceGeneratedPetro" component={ViewInvoiceGeneratedPetroController} />
      <Stack.Screen options={{ headerShown: false }} name="ViewInvoiceGeneratedSeven" component={ViewInvoiceGeneratedSevenController} />
      <Stack.Screen options={{ headerShown: false }} name="CodeReader" component={CodeReaderController} />
      <Stack.Screen
        options={{ headerShown: true, title: 'Direcciones', headerBackTitle: '', headerTintColor: 'black' }}
        name="Address"
        component={AddressesController}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mi Canasta',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                closeShoppingCart();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          ),

          headerTitleAlign: 'center'
        }}
        name="ShopCart"
        component={ShopCartController}
      />
      <Stack.Screen name="ProductZoom" options={{ title: '' }} component={ProductZoomController} />
      <Stack.Screen name="PostalCode" options={{ title: '' }} component={PostalCodeController} />
      <Stack.Screen name="SearchSeller" options={{ title: 'Selecciona tienda' }} component={SearchSellerController} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mis Pedidos',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
        }}
        name="MyOrders"
        component={MyOrdersController}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailController}
        options={{
          headerShown: true,
          headerTitle: '',
          headerRight: () => <BasketCounter />
        }}
      />
      <Stack.Screen name="AboutUs" options={{ title: 'Quiénes somos', headerTintColor: theme.fontColor.dark }} component={AboutUsController} />
      <Stack.Screen
        name="Legal"
        options={{ title: 'Legal', headerTintColor: theme.fontColor.dark, headerBackTitleVisible: false }}
        component={LegalController}
      />
      <Stack.Screen
        name="ContactInformation"
        options={{ title: 'Información de contacto', headerTintColor: theme.fontColor.dark, headerBackTitleVisible: false }}
        component={ContactInformationController}
      />
      <Stack.Screen
        name="Checkout"
        options={{ title: 'Confirmar pedido', headerTintColor: theme.fontColor.dark, headerBackTitleVisible: false }}
        component={CheckoutController}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
