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
import PromotionsController from 'screens/home/promotions/PromotionsController';
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
import AdultAgeVerificationController from 'screens/home/adultAgeVerification/AdultAgeVerificationController';
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
import CategoryProductsScreen from 'screens/categories/categoryProducts/CategoryProductsScreen';
import SearchScreen from 'screens/search/SearchScreen';
import SearchProductResultsScreen from 'screens/search/searchProductResult/SearchProductResult';
import AboutUsController from 'screens/home/myAccount/aboutUs/AboutUsController';
import theme from 'components/theme/theme';
import LegalController from 'screens/home/myAccount/aboutUs/Legal/LegalController';
import ContactInformationController from 'screens/home/shoppingCart/ContactInformation/ContactInformationController';
import CheckoutController from 'screens/home/shoppingCart/Checkout/CheckoutController';
import FavoriteController from 'screens/home/favoriteScreen/FavoriteController';
import ChangePasswordController from 'screens/home/myAccount/changePassword/ChangePasswordController';
import DeleteAccountController from 'screens/home/myAccount/deleteAccount/DeleteAccountController';
import SeeMoreScreen from 'screens/home/viewMore/SeeMoreScreen';

const HomeStack: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const Stack = createNativeStackNavigator<HomeStackParams>();

  const closeShoppingCart = () => {
    navigate('Home', { paySuccess: false });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitleStyle: {color:'black', fontWeight: 'bold'}, headerTintColor:`${theme.brandColor.iconn_accent_principal}`}} initialRouteName="PostalCode" id="HomeStack">
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <EcommerceHeader />,
          headerRight: () => <BasketCounter />
        }}
        name="Home"
        initialParams={{ paySuccess: false }}
        component={TabNavigator}
      />
      <Stack.Screen name="MyAccount" component={MyAccountController} />
      <Stack.Screen name="Profile" options={{ title: 'Perfil' }} component={ProfileController} />
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
      <Stack.Screen name="DeleteAccount" options={{ title: 'Eliminar cuenta' }} component={DeleteAccountController} />
      <Stack.Screen name="Promotions" options={{ title: 'Promociones' }} component={PromotionsController} />
      <Stack.Screen name="PostalCode" options={{ title: '', headerShadowVisible:false}} component={PostalCodeController} />
      <Stack.Screen name="SearchSeller" options={{ title: 'Selecciona tienda' }} component={SearchSellerController} />
      <Stack.Screen name='ChangePassword' options={{title: 'Editar contraseña'}} component={ChangePasswordController}/>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Pedidos',
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
       <Stack.Screen
        name="SeeMore"
        component={SeeMoreScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerRight: () => <BasketCounter />
        }}
      />
      <Stack.Screen
        options={{
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: () => <BasketCounter />
        }}
        name="CategoryProducts"
        component={CategoryProductsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="SearchProducts"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="SearchProductsResults"
        component={SearchProductResultsScreen}
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
      <Stack.Screen
        options={{
          title: 'Favoritos',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: () => <BasketCounter />
        }}
        name="FavoriteProducts"
        component={FavoriteController}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
