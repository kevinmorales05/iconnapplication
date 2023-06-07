import React from 'react';
import { BasketCounter, EcommerceHeader, InConstructionScreen } from 'components';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { TabNavigator } from 'navigation/TabNavigator';
import { Touchable } from '../../components';
import { useNavigation } from '@react-navigation/native';
import AboutUsController from 'screens/home/myAccount/aboutUs/AboutUsController';
import AddressesController from 'screens/home/myAccount/addresses/AddressesController';
import AddRFCController from 'screens/home/myAccount/manageTaxInfo/AddRFC/AddRFCController';
import AddTicketPetroController from 'screens/home/invoicing/invoicingPetro/AddTicketPetro/AddTicketPetroController';
import AddTicketSevenController from 'screens/home/invoicing/invoicingSeven/AddTicketSeven/AddTicketSevenController';
import CategoryProductsScreen from 'screens/categories/categoryProducts/CategoryProductsScreen';
import ChangedPasswordController from 'screens/auth/onboarding/ChangedPassword/ChangedPasswordController';
import ChangePasswordController from 'screens/home/myAccount/changePassword/ChangePasswordController';
import CheckoutController from 'screens/home/shoppingCart/Checkout/CheckoutController';
import CodeReaderController from 'screens/home/invoicing/invoicingSeven/CodeReader/CodeReaderController';
import CommentOrderController from 'screens/home/myAccount/myOrders/CommentOrder/CommentOrderController';
import ContactInformationController from 'screens/home/shoppingCart/ContactInformation/ContactInformationController';
import ContactUsController from 'screens/home/myAccount/wallet/helpCenter/contactUs/ContactUsController';
import CreateTaxProfileController from 'screens/home/invoicing/CreateTaxProfile/CreateTaxProfileController';
import DeleteAccountController from 'screens/home/myAccount/deleteAccount/DeleteAccountController';
import EditEmailController from 'screens/auth/onboarding/EditEmail/EditEmailController';
import EditEmailOtpController from 'screens/auth/onboarding/EditEmailOtp/EditEmailOtpController';
import EditPasswordController from 'screens/auth/onboarding/EditPassword/EditPasswordController';
import FavoriteController from 'screens/home/favoriteScreen/FavoriteController';
import HelpItemsController from 'screens/home/myAccount/wallet/helpCenter/items/HelpItemsController';
import Icon from 'react-native-vector-icons/AntDesign';
import InitialPage from 'screens/home/initialPage/InitPage';
import InviteSignUpController from 'screens/home/inviteSignUp/InviteSignUpController';
import InvoiceController from 'screens/home/invoicing/Invoice/InvoiceController';
import InvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceGeneratedPetro/InvoiceGeneratedPetroController';
import InvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceGeneratedSeven/InvoiceGeneratedSevenController';
import InvoiceHistoryController from 'screens/home/invoicing/InvoiceHistory/InvoiceHistoryController';
import InvoiceTicketPetroController from 'screens/home/invoicing/invoicingPetro/InvoiceTicketPetro/InvoiceTicketPetroController';
import InvoiceTicketSevenController from 'screens/home/invoicing/invoicingSeven/InvoiceTicketSeven/InvoiceTicketSevenController';
import LegalController from 'screens/home/myAccount/aboutUs/Legal/LegalController';
import LiveStatusWidgetController from 'screens/home/myAccount/liveStatusWidget/LiveStatusWidgetController';
import MyAccountController from 'screens/home/myAccount/MyAccountController';
import MyOrdersController from 'screens/home/myAccount/myOrders/MyOrdersController';
import OtherProductsScreen from 'screens/home/viewMore/OtherProductsScreen';
import PostalCodeController from 'screens/ecommerce/postalCode/PostalCodeController';
import ProductDetailController from 'screens/ecommerce/productDetail/ProductDetailController';
import ProductZoomController from 'screens/home/productZoom/ProductoZoomController';
import ProfileController from 'screens/home/myAccount/profile/ProfileController';
import PromotionsScreen from 'screens/home/promotions/PromotionsScreen';
import QuestionsController from 'screens/home/myAccount/wallet/helpCenter/questions/QuestionsController';
import RateOrderController from 'screens/home/myAccount/myOrders/RateOrder/RateOrderController';
import RecomendedForYouScreen from 'screens/home/viewMore/RecommededForYou';
import SearchProductResultsScreen from 'screens/search/searchProductResult/SearchProductResult';
import SearchScreen from 'screens/search/SearchScreen';
import SearchSellerController from 'screens/ecommerce/seller/SearchSellerController';
import ShopCartController from 'screens/home/shoppingCart/ShopCartController';
import StepsController from 'screens/home/myAccount/wallet/helpCenter/steps/StepsController';
import TaxInfoController from 'screens/home/myAccount/manageTaxInfo/TaxInfo/TaxInfoController';
import theme from 'components/theme/theme';
import ViewInvoiceGeneratedPetroController from 'screens/home/invoicing/invoicingPetro/ViewInvoiceGeneratedPetro/ViewInvoiceGeneratedPetroController';
import ViewInvoiceGeneratedSevenController from 'screens/home/invoicing/invoicingSeven/ViewInvoiceGeneratedSeven/ViewInvoiceGeneratedSevenController';
import VirtualTourController from 'screens/home/myAccount/wallet/helpCenter/items/VirtualTour/VirtualTourController';
import WalletStack from './nested/WalletStack';
import EvaluateStack from './nested/EvaluateStack';
import CollectionsProducts from 'screens/home/collenctions/CollectionsController';
import WhoWeAreController from 'screens/home/myAccount/aboutUs/About/WhoWeAreController';
import analytics from '@react-native-firebase/analytics';
import { RootState, useAppSelector } from 'rtk';
import AccumulateCoffeeController from 'screens/home/myAccount/accumulateCoffee/AccumulateCoffeeController';
import AccumulateLitresControlller from 'screens/home/myAccount/accumulateLitres/AccumulateLitresController';
import PromoDetailController from 'screens/home/myAccount/accumulateLitres/PromoDetailController';
import AddTicketLitresController from 'screens/home/myAccount/accumulateLitres/addTicket/AddTicketLitresController';
import CouponsController from 'screens/home/myAccount/coupons/CouponsController';
import CouponDetail from 'screens/home/myAccount/coupons/CouponDetail';
import ActivatedCoupon from 'screens/home/myAccount/coupons/ActivatedCoupon';
import HomeServices from 'screens/home/demoServices'
import HeaderCheckSvg from 'components/svgComponents/HeaderCheckSvg';
import ServicesCategories from 'screens/home/demoServices/CategoriesServices';
import SearchScreenService from 'screens/home/demoServices/SearchScreenService';
import PayRecharge from 'screens/home/demoServices/PayRecharge';
import AmountRecharge from 'screens/home/demoServices/AmountRecharge';
import OptionsPay from 'screens/home/demoServices/OptionsPay';
import ConfirmPay from 'screens/home/demoServices/ConfirmPay';
import SuccesPay from 'screens/home/demoServices/SuccesPay'
import TicketPay from 'screens/home/demoServices/TicketPay'

const HomeStack: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const Stack = createNativeStackNavigator<HomeStackParams>();
  const { goBack } = useNavigation<any>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const closeShoppingCart = () => {
    navigate('Home', { paySuccess: false });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: 'black', fontWeight: 'bold' },
        headerTintColor: `${theme.brandColor.iconn_accent_secondary}`,
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerBackImageSource: require('../../assets/images/back-button/left_arrow.png')
      }}
      initialRouteName="InitialPage"
      id="HomeStack"
    >
      <Stack.Screen name="InitialPage" component={InitialPage} options={{ headerShown: false }} />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => <EcommerceHeader />,
          headerRight: () => <BasketCounter />,
          headerBackVisible: false
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
      <Stack.Screen
        options={{ title: 'Nuevo Perfil Fiscal', gestureEnabled: false, headerBackTitleVisible: false, headerBackVisible: false }}
        name="AddRFC"
        component={AddRFCController}
      />
      <Stack.Screen options={{ title: 'Datos Fiscales', headerBackTitleVisible: false }} name="TaxInfo" component={TaxInfoController} />
      <Stack.Screen options={{ title: 'Facturación', headerBackTitleVisible: false }} name="Invoice" component={InvoiceController} />
      <Stack.Screen
        options={{ title: 'Perfil Fiscal', gestureEnabled: false, headerBackTitleVisible: false, headerBackVisible: false }}
        name="CreateTaxProfile"
        component={CreateTaxProfileController}
      />
      <Stack.Screen name="ChangedPassword" options={{ headerShown: false }} component={ChangedPasswordController} />
      <Stack.Screen
        options={{
          title: 'Historial de facturas',
          headerBackTitleVisible: false
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
      <Stack.Screen options={{ headerShown: true, title: 'Direcciones', headerBackTitle: '' }} name="Address" component={AddressesController} />
      <Stack.Screen options={{ headerShown: true, title: 'Cupones', headerBackTitle: '' }} name="Coupons" component={CouponsController} />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.couponInfo.name,
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                goBack();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        })}
        name="CouponDetail"
        component={CouponDetail}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          title: route.params.couponInfo.name,
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                if (route.params.origin === 'Coupons') {
                  navigate('Coupons');
                } else if (route.params.origin === 'Home') {
                  navigate('Home');
                }
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        })}
        name="ActivatedCoupon"
        component={ActivatedCoupon}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mi Canasta',
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={async () => {
                try {
                  await analytics().logEvent('cartClose', {
                    id: user.id,
                    description: 'Cerrar canasta'
                  });
                  //console.log('succesfully added to firebase!');
                } catch (error) {
                  //console.log(error);
                }
                closeShoppingCart();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        }}
        name="ShopCart"
        initialParams={{ messageType: '', countProducts: 0, cartItems: 0 }}
        component={ShopCartController}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Evalúa tu compra',
          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: false
        }}
        name="CommentOrder"
        component={CommentOrderController}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Tour Virtual',
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                goBack();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        }}
        name="VirtualTour"
        component={VirtualTourController}
      />
      <Stack.Screen name="ProductZoom" options={{ title: '' }} component={ProductZoomController} />
      <Stack.Screen name="DeleteAccount" options={{ title: 'Eliminar cuenta' }} component={DeleteAccountController} />
      <Stack.Screen name="Promotions" options={{ title: 'Promociones', headerRight: () => <BasketCounter /> }} component={PromotionsScreen} />
      <Stack.Screen name="PostalCode" options={{ title: '', headerShadowVisible: false }} component={PostalCodeController} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Evalúa tu compra',
          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: false
        }}
        name="RateOrder"
        component={RateOrderController}
      />
      <Stack.Screen name="SearchSeller" options={{ title: 'Selecciona tienda' }} component={SearchSellerController} />
      <Stack.Screen name="ChangePassword" options={{ title: 'Editar contraseña' }} component={ChangePasswordController} />
      <Stack.Screen
        name="HelpItems"
        initialParams={{ flagError: '' }}
        options={{
          title: 'Ayuda',
          headerBackTitleVisible: false
        }}
        component={HelpItemsController}
      />
      <Stack.Screen
        name="HelpQuestions"
        options={{
          title: 'Ayuda',
          headerBackTitleVisible: false
        }}
        component={QuestionsController}
      />
      <Stack.Screen
        name="HelpSteps"
        options={{
          title: 'Ayuda',
          headerBackTitleVisible: false
        }}
        component={StepsController}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Pedidos'
        }}
        name="MyOrders"
        component={MyOrdersController}
      />
      <Stack.Screen options={{ headerShown: false }} name="WalletStack" component={WalletStack} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailController}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerRight: () => <BasketCounter />
        }}
      />
      <Stack.Screen
        name="RecomendedForYou"
        component={RecomendedForYouScreen}
        options={{
          headerShown: true,
          headerTitle: 'Recomendados para ti',
          headerRight: () => <BasketCounter />
        }}
      />
      <Stack.Screen
        name="OtherProducts"
        component={OtherProductsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Otros productos',
          headerRight: () => <BasketCounter />
        }}
      />
      <Stack.Screen
        options={{
          title: '',
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
      <Stack.Screen name="Legal" options={{ title: 'Legal', headerBackTitleVisible: false }} component={LegalController} />
      <Stack.Screen name="AboutOptions" options={{ title: 'Sobre nosotros', headerBackTitleVisible: false }} component={WhoWeAreController} />
      <Stack.Screen
        name="ContactInformation"
        options={{ title: 'Información de contacto', headerBackTitleVisible: false }}
        component={ContactInformationController}
      />
      <Stack.Screen name="ContactUs" options={{ title: 'Contáctanos', headerBackTitleVisible: false }} component={ContactUsController} />
      <Stack.Screen name="Checkout" options={{ title: 'Confirmar pedido', headerBackTitleVisible: false }} component={CheckoutController} />
      <Stack.Screen
        options={{
          title: 'Favoritos',
          headerRight: () => <BasketCounter />
        }}
        name="FavoriteProducts"
        component={FavoriteController}
      />
      <Stack.Screen name="InConstruction" options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} component={InConstructionScreen} />
      <Stack.Screen
        options={{
          title: '',
          headerBackTitleVisible: false
        }}
        name="LiveStatusWidget"
        component={LiveStatusWidgetController}
      />
      <Stack.Screen name="EvaluateStack" options={{ headerShown: false }} component={EvaluateStack} />
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => <BasketCounter />
        }}
        name="CollectionsProducts"
        component={CollectionsProducts}
      />
      <Stack.Screen name="AccumulateCoffee" options={{ title: 'Acumula café' }} component={AccumulateCoffeeController} />
      <Stack.Screen name="AccumulateLitres" options={{ title: 'Acumula litros' }} component={AccumulateLitresControlller} />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          title: route.params.promo.name,
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                goBack();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        })}
        name="PromoDetailLitres"
        component={PromoDetailController}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Registrar ticket',
          headerBackVisible: false,
          headerLeft: () => {
            return <></>;
          },
          headerRight: () => (
            <Touchable
              onPress={() => {
                goBack();
              }}
            >
              <Icon name="close" size={20} />
            </Touchable>
          )
        }}
        name="AddTicketLitres"
        component={AddTicketLitresController}
      />
      <Stack.Screen
        options={{
          title: 'Pago de servicios',
          headerRight: () => <HeaderCheckSvg size={24} />,
          headerBackTitleVisible: false
        }}
        name="HomeServices"
        component={HomeServices}
      />
      <Stack.Screen
        options={{
          title: 'Categorías',
          headerBackTitleVisible: false
        }}
        name="ServicesCategories"
        component={ServicesCategories}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="SearchScreenService"
        component={SearchScreenService}
      />
      <Stack.Screen
        options={{
          title: 'Telcel',
          headerBackTitleVisible: false
        }}
        name="PayRecharge"
        component={PayRecharge}
      />
      <Stack.Screen
        options={{
          title: 'Monto de recarga',
          headerBackTitleVisible: false
        }}
        name="AmountRecharge"
        component={AmountRecharge}
      />
      <Stack.Screen
        options={{
          title: 'Método de pago',
          headerBackTitleVisible: false
        }}
        name="OptionsPay"
        component={OptionsPay}
      />
      <Stack.Screen
        options={{
          title: 'Confirmar y pagar',
          headerBackTitleVisible: false
        }}
        name="ConfirmPay"
        component={ConfirmPay}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: false
        }}
        name="SuccesPay"
        component={SuccesPay}
      />
      <Stack.Screen
        options={{
          title: 'Recibo',
          headerBackTitleVisible: false
        }}
        name="TicketPay"
        component={TicketPay}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
