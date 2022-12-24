import React from 'react';
import { ScrollView } from 'react-native';
import { Button, NavigationMenuItem, Container, TextContainer, Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams, HomeTabScreens } from 'navigation/types';

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
import { useInConstruction } from 'context';

interface HomeScreenProps {
  logOut: () => void;
  onPressVersion: () => void;
  app_version: string;
}

const MyAccountScreen: React.FC<HomeScreenProps> = ({ logOut, onPressVersion, app_version }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { navigate: navigateToTab } = useNavigation<NativeStackNavigationProp<HomeTabScreens>>();
  const inConstruction = useInConstruction();

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
          icon={<ReceiptSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('MyOrders');
          }}
        />
        <NavigationMenuItem
          text="Favoritos"
          disable={false}
          icon={<HeartSvgOutline size={moderateScale(24)} color={theme.brandColor.iconn_dark_grey} />}
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
            navigate('Promotions');
          }}
        />

        <NavigationMenuItem
          text="Cuponera"
          disable={false}
          icon={<CoffeSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            inConstruction.show(true);
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
            inConstruction.show(true);
            //navigateToTab('BranchesScreen');
          }}
        />
        <NavigationMenuItem
          text="Wallet"
          disable={false}
          icon={<WalletSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            //navigate('WalletStack');
            inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Datos fiscales"
          disable={false}
          icon={<DocumentCashSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            //navigate('TaxInfo');
            inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Facturación"
          disable={false}
          icon={<TargetSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            //navigate('Invoice');
            inConstruction.show(true);
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
            //inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Centro de ayuda"
          disable={false}
          icon={<HelpSupportSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            //inConstruction.show(true);
            navigate('HelpItems');
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
        <Touchable
          onPress={() => {
            onPressVersion();
          }}
        >
          <TextContainer text={app_version} textAlign="center" textColor={theme.fontColor.placeholder} />
        </Touchable>
      </Container>
    </ScrollView>
  );
};

export default MyAccountScreen;
