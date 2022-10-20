import React from 'react';
import { ScrollView } from 'react-native';
import { Button, NavigationMenuItem, Container, TextContainer } from 'components';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

//import icons
import ProfileSvg from 'components/svgComponents/ProfileSvg/ProfileSvg';
import { PinMapSvg } from 'components/svgComponents/PinMapSvg';
import { moderateScale } from 'utils/scaleMetrics';
import { HeartSvgOutline } from 'components/svgComponents';
import { ReceiptSvg } from 'components/svgComponents/ReceiptSvg';
import { DiscountSvg } from 'components/svgComponents/DiscountSvg';
import { CoffeSvg } from 'components/svgComponents/CoffeSvg';
import { PlacesSvg } from 'components/svgComponents/PlacesSvg';
import { WalletSvg } from 'components/svgComponents/WalletSvg';
import { TargetSvg } from 'components/svgComponents/TargetSvg';
import { DocumentCashSvg } from 'components/svgComponents/DocumentCashSvg';
import { InfoSvg } from 'components/svgComponents/InfoSvg';
import { HelpSupportSvg } from 'components/svgComponents/HelpSupportSvg';
import { LogOutSvg } from 'components/svgComponents/LogOutSvg';

interface HomeScreenProps {
  logOut: () => void;
  app_version: string;
}

const MyAccountScreen: React.FC<HomeScreenProps> = ({ logOut, app_version }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Perfil"
          disable={false}
          icon={<ProfileSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('Profile');
          }}
        />
        <NavigationMenuItem
          text="Direcciones"
          disable={false}
          icon={<PinMapSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('Address');
          }}
        />
        <NavigationMenuItem
          text="Pedidos"
          disable={false}
          icon={<ReceiptSvg size={moderateScale(24)}/>}
          onPressNavigateTo={() => {
            navigate('MyOrders');
          }}
        />
        <NavigationMenuItem
          text="Favoritos"
          disable={false}
          icon={<HeartSvgOutline size={moderateScale(24)} color={theme.brandColor.iconn_dark_grey}/>}
          onPressNavigateTo={() => {
            navigate('FavoriteProducts');
          }}
        />

        <TextContainer
          text="Ofertas y recompensas"
          typography="h4"
          fontBold
          marginTop={16}
          textColor={theme.brandColor.iconn_green_original}
          marginLeft={8}
          marginBottom={12}
        />

        <NavigationMenuItem
          text="Promociones"
          disable={false}
          icon={<DiscountSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            console.log('Promociones...');
          }}
        />

        <NavigationMenuItem
          text="Cuponera"
          disable={false}
          icon={<CoffeSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            console.log('Cuponera...');
          }}
        />

        <TextContainer
          text="Servicios"
          typography="h4"
          fontBold
          marginTop={16}
          textColor={theme.brandColor.iconn_green_original}
          marginLeft={8}
          marginBottom={12}
        />

        <NavigationMenuItem
          text="Sucursales"
          disable={false}
          icon={<PlacesSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            console.log('Sucursales...');
          }}
        />
        <NavigationMenuItem
          text="Wallet"
          disable={false}
          icon={<WalletSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            console.log('Wallet...');
          }}
        />
        <NavigationMenuItem
          text="Datos fiscales"
          disable={false}
          icon={<DocumentCashSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('TaxInfo');
          }}
        />
        <NavigationMenuItem
          text="Facturación"
          disable={false}
          icon={<TargetSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('Invoice');
          }}
        />

        <TextContainer
          text="Ajustes e información"
          typography="h4"
          fontBold
          marginTop={16}
          textColor={theme.brandColor.iconn_green_original}
          marginLeft={8}
          marginBottom={12}
        />

        <NavigationMenuItem
          text="Quiénes somos"
          disable={false}
          icon={<InfoSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('AboutUs');
          }}
        />
        <NavigationMenuItem
          text="Centro de ayuda"
          disable={false}
          icon={<HelpSupportSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            console.log('Centro de ayuda...');
          }}
        />
      </Container>

      <Container style={{ marginLeft: 16, marginRight: 16, marginBottom: 24, marginTop: 24, justifyContent: 'center' }}>
        <Button
          outline
          borderColor="iconn_med_grey"
          round
          fontBold
          fontSize="h4"
          color="iconn_dark_grey"
          onPress={logOut}
          icon={<LogOutSvg size={moderateScale(24)} />}
        >
          Cerrar sesión
        </Button>
      </Container>

      <Container width={'100%'} height={32} center crossCenter backgroundColor={theme.brandColor.iconn_background}>
        <TextContainer text={app_version} textAlign="center" textColor={theme.fontColor.placeholder} />
      </Container>
    </ScrollView>
  );
};

export default MyAccountScreen;
