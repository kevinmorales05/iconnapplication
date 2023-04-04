import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, NavigationMenuItem, Container, TextContainer, Touchable } from 'components';
import { useNavigation } from '@react-navigation/native';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

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
import { RootState, useAppSelector } from 'rtk';
import { getStatusModuleFather } from 'utils/modulesApp';
import { modulesRemoteConfig } from '../../../common/modulesRemoteConfig';
import { useNotEnabledModal } from 'context/notEnabled.context';
import analytics from '@react-native-firebase/analytics';
import { logEvent } from 'utils/analytics';
import { ICONN_ACCOUNT_COUPON, ICONN_HOME_OPTION_LITRES } from 'assets/images';

interface HomeScreenProps {
  logOut: () => void;
  onPressVersion: () => void;
  app_version: string;
}

const MyAccountScreen: React.FC<HomeScreenProps> = ({ logOut, onPressVersion, app_version }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { appModules } = useAppSelector((state: RootState) => state.app);
  const modalNotEnabled = useNotEnabledModal();

  //helpCenter
  const helpCenter: boolean | undefined = getStatusModuleFather(appModules ? appModules : [], modulesRemoteConfig.helpCenter);

  //sucursales
  const stores: boolean | undefined = getStatusModuleFather(appModules ? appModules : [], modulesRemoteConfig.helpCenter);

  //wallet
  const wallet: boolean | undefined = getStatusModuleFather(appModules ? appModules : [], modulesRemoteConfig.myWallet || modulesRemoteConfig.services);

  const inConstruction = useInConstruction();

  const onPressSendAnalyticst = async (analyticsName: string, analyticsDecription: string) => {
    await analytics().logEvent(analyticsName, {
      id: user.id,
      description: analyticsDecription
    });
  };

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 8 }}>
        <NavigationMenuItem
          text="Perfil"
          disable={false}
          icon={<ProfileSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            logEvent('accProfile', {
              id: user.id,
              description: 'Abrir perfil desde el menú de cuenta'
            });
            navigate('Profile');
          }}
        />
        <NavigationMenuItem
          text="Direcciones"
          disable={false}
          icon={<PinMapSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            logEvent('accAddresses', {
              id: user.id,
              description: 'Abrir direcciones desde el menú de cuenta'
            });
            navigate('Address');
          }}
        />
        <NavigationMenuItem
          text="Pedidos"
          disable={false}
          icon={<ReceiptSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            logEvent('accProfileOrders', {
              id: user.id,
              description: 'Abrir historial de pedidos desde menú de cuenta'
            });
            navigate('MyOrders');
          }}
        />
        <NavigationMenuItem
          text="Favoritos"
          disable={false}
          icon={<HeartSvgOutline size={moderateScale(24)} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            logEvent('accFavorites', {
              id: user.id,
              description: 'Abrir favoritos desde menú de cuenta'
            });
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
            logEvent('accOffersPromotions', {
              id: user.id,
              description: 'Abrir promociones desde menú de cuenta'
            });
            navigate('Promotions');
          }}
        />

        <NavigationMenuItem
          text="Cuponera"
          disable={false}
          icon={<Image source={ICONN_ACCOUNT_COUPON} style={{ height: moderateScale(24), width: moderateScale(24) }} />}
          onPressNavigateTo={() => {
            navigate('Coupons');
          }}
        />

        <NavigationMenuItem
          text="Acumula café"
          disable={false}
          icon={<CoffeSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            logEvent('accOffersCoupons', {
              id: user.id,
              description: 'Abrir cuponera desde menú de cuenta'
            });
            onPressSendAnalyticst('accOffersCoupons', 'Abrir cuponera desde menú de cuenta');
            inConstruction.show(true);
            navigate('AccumulateCoffee');
          }}
        />

        <NavigationMenuItem
          text="Acumula litros"
          disable={false}
          icon={<Image source={ICONN_HOME_OPTION_LITRES} style={{ marginLeft: 2, height: moderateScale(23), width: moderateScale(23) }} />}
          onPressNavigateTo={() => {
            navigate('AccumulateLitres');
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
          disable={!stores}
          icon={<PlacesSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            if (stores) {
              // navigateToTab('BranchesScreen');
              inConstruction.show(true);
            } else {
              modalNotEnabled.show();
            }
            logEvent('accServicesStoreUbications', {
              id: user.id,
              description: 'Abrir ubicación de tiendas y estaciones desde menú de cuenta'
            });
            //navigateToTab('BranchesScreen');
          }}
        />
        <NavigationMenuItem
          text="Wallet"
          disable={!wallet}
          icon={<WalletSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            if (wallet) {
              // navigate('WalletStack');
              inConstruction.show(true);
            } else {
              modalNotEnabled.show();
            }
            //navigate('WalletStack');
            logEvent('accServicesWallet', {
              id: user.id,
              description: 'Abrir wallet desde menú de cuenta'
            });
            navigate('WalletStack');
            //inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Datos fiscales"
          disable={false}
          icon={<DocumentCashSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            navigate('TaxInfo');
            logEvent('accServicesInvoicingProfiles', {
              id: user.id,
              description: 'Abrir Información fiscal desde menú de cuenta'
            });
            //inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Facturación"
          disable={false}
          icon={<TargetSvg size={moderateScale(24)} />}
          onPressNavigateTo={async () => {
            logEvent('accServicesInvoicing', {
              id: user.id,
              description: 'Abrir facturación desde menú de cuenta'
            });
            navigate('Invoice');
            //inConstruction.show(true);
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
            logEvent('accInformationAboutUs', {
              id: user.id,
              description: 'Abrir Acerca de nosotros desde menú de cuenta'
            });
            //inConstruction.show(true);
          }}
        />
        <NavigationMenuItem
          text="Centro de ayuda"
          disable={!helpCenter}
          icon={<HelpSupportSvg size={moderateScale(24)} />}
          onPressNavigateTo={() => {
            if (helpCenter) {
              navigate('HelpItems');
              //inConstruction.show(true);
            } else {
              modalNotEnabled.show();
            }
            logEvent('accInformationHelpCenter', {
              id: user.id,
              description: 'Abrir centro de ayuda desde menú de cuenta'
            });
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
          onPress={() => {
            logEvent('accLogOut', {
              id: user.id,
              description: 'Cerrar sesión'
            });
            logOut();
          }}
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
