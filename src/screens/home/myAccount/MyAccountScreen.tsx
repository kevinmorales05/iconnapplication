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
          text="Mi Perfil"
          disable={false}
          icon={<MaterialCommunityIcons name="account-circle-outline" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            navigate('Profile');
          }}
        />
        <NavigationMenuItem
          text="Direcciones"
          disable={false}
          icon={<Ionicons name="location-outline" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            navigate('Address');
          }}
        />
        <NavigationMenuItem
          text="Mis pedidos"
          disable={false}
          icon={<Octicons name="list-unordered" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            navigate('MyOrders');
          }}
        />
        <NavigationMenuItem
          text="Mis favoritos"
          disable={false}
          icon={<MaterialCommunityIcons name="heart-outline" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            console.log('Favoritos...');
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
          icon={<MaterialCommunityIcons name="sale" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            console.log('Promociones...');
          }}
        />

        <NavigationMenuItem
          text="Mi cuponera"
          disable={false}
          icon={<Entypo name="ticket" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            console.log('Mi Cuponera...');
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
          icon={<Entypo name="location" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            console.log('Sucursales...');
          }}
        />
        <NavigationMenuItem
          text="Wallet"
          disable={false}
          icon={<Ionicons name="wallet-outline" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            console.log('Wallet...');
          }}
        />
        <NavigationMenuItem
          text="Datos fiscales"
          disable={false}
          icon={<AntDesign name="idcard" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            navigate('TaxInfo');
          }}
        />
        <NavigationMenuItem
          text="Facturación"
          disable={false}
          icon={<FontAwesome5 name="file-invoice-dollar" size={24} color={theme.brandColor.iconn_dark_grey} />}
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
          icon={<Ionicons name="md-information-circle-outline" size={24} color={theme.brandColor.iconn_dark_grey} />}
          onPressNavigateTo={() => {
            navigate('AboutUs');
          }}
        />
        <NavigationMenuItem
          text="Centro de ayuda"
          disable={false}
          icon={<Feather name="life-buoy" size={24} color={theme.brandColor.iconn_dark_grey} />}
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
          icon={<MaterialCommunityIcons name="location-exit" size={24} color={theme.brandColor.iconn_red_original} />}
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
