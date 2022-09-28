import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, AccountItem, Section, AnnounceItem } from 'components';
import { NavigationContext, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, setInvoicingInitialState } from 'rtk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logoutThunk } from 'rtk/thunks/auth.thunks';

import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { authServices } from 'services';

const TaxItem: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  //const goToTaxInfo = () => navigate('TaxInfo');
  const goToTaxInfo = () => console.log("Funcion oculta para presentacion de sprint de home");
  return (
    <TouchableOpacity style={taxItemStyles.container} onPress={goToTaxInfo}>
      <View style={taxItemStyles.content}>
        <View style={taxItemStyles.middle}>
          <Text numberOfLines={1}>Administra tu información de facturación</Text>
        </View>
        <View style={taxItemStyles.end}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AddressesItem: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const goToAddresses = () => navigate('Address');
  return (
    <TouchableOpacity style={[taxItemStyles.container, { backgroundColor: theme.brandColor.iconn_white }]} onPress={goToAddresses}>
      <View style={taxItemStyles.content}>
        <View style={taxItemStyles.middle}>
          <Text numberOfLines={1}>Administra tus direcciones de entrega</Text>
        </View>
        <View style={taxItemStyles.end}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const taxItemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    padding: 10
  },
  content: {
    flexDirection: 'row'
  },
  start: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middle: {
    flex: 4,
    justifyContent: 'center',
    height: 55
  },
  end: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  primary: { fontWeight: 'bold', marginLeft: 20 },
  secondary: {
    marginLeft: 20,
    color: 'darkgray',
    fontSize: 12
  }
});

export default function AccountScreen() {
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

  const navigation = useContext(NavigationContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Section label="Perfil">
            <AccountItem
              user={user}
              onPress={() => {
                navigation?.navigate('Profile');
              }}
            />
            <AnnounceItem icon={<Ionicons name="megaphone-outline" size={25} color={theme.fontColor.white} />} message={'Completa tu perfil y obtén cupón'} />
          </Section>
          <Section label="Direcciones guardadas">
            <AddressesItem />
          </Section>
          <Section label="Datos fiscales">
            <TaxItem />
          </Section>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          color="iconn_background"
          borderColor="iconn_med_grey"
          round
          fontBold
          fontSize="h4"
          fontColor={'dark_grey'}
          onPress={logOut}
          icon={<MaterialIcons name="logout" size={20} color={theme.brandColor.iconn_red_original} />}
        >
          Cerrar sesión
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  footer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center'
  }
});
