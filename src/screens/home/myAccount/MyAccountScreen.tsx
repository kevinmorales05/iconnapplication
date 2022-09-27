import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, Section, NavigationMenuItem, Container, TextContainer } from 'components';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, setInvoicingInitialState } from 'rtk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { authServices } from 'services';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

export default function AccountScreen({ navigation, route }: any) {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    try {
      await authServices.logOutUser();
    } catch (error) {
      console.log('ERROR DE LOGOUT', error);
    } finally {
      dispatch(setAppInitialState());
      dispatch(setAuthInitialState());
      dispatch(setGuestInitialState());
      dispatch(setInvoicingInitialState());
    }
  };

  // removing navigation header in this screen.
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get parent by id
    const homeStack = navigation.getParent('HomeStack');

    if (homeStack) {
      // Make sure the route name is "AccountScreen" before turn header off
      if (route.name === 'AccountScreen') {
        homeStack.setOptions({
          headerShown: false
        });
      }
    }

    // Turn header back on when unmount
    return homeStack
      ? () => {
          homeStack.setOptions({
            headerShown: true
          });
        }
      : undefined;
  }, [navigation, route]);

  return (
    <Container style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Container>
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
            text="Favoritos"
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
              console.log('Quiénes somos...');
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
      </ScrollView>
      <Container style={styles.footer}>
        <Container style={{ marginLeft: 16, marginRight: 16, marginBottom: 24, marginTop: 8 }}>
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
        <Container
          width={'100%'}
          height={32}
          center
          crossCenter
          backgroundColor={theme.brandColor.iconn_background}
          style={{ paddingHorizontal: -100, marginBottom: -20, paddingVertical: 0 }}
        >
          <TextContainer text="Version 1.7.2" textAlign="center" textColor={theme.fontColor.placeholder} />
        </Container>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: theme.brandColor.iconn_white },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    marginHorizontal: -10
  }
});
