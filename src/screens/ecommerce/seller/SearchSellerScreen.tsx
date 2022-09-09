import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TextInput, StyleSheet, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking } from 'react-native';
import { CustomText, Touchable, Container } from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { ICONN_PIN_LOCATION } from 'assets/images';
import items from 'assets/files/sellers.json';
import { SellerInterface, useAppSelector, RootState, setDefaultSeller, useAppDispatch, setInvoicingInitialState } from 'rtk';
import { sortByDistance } from 'utils/geolocation';
import { useLoading, useAlert } from 'context';
import Geolocation from 'react-native-geolocation-service';

const SearchSellerScreen = () => {
  const [value, onChangeText] = useState('');
  const [current, setCurrent] = useState<SellerInterface | null>(null);
  const [sellers, setSellers] = useState<SellerInterface[]>([]);

  const dispatch = useAppDispatch();

  const loader = useLoading();

  const alert = useAlert();

  useEffect(() => {
    if (value) {
      if (value.length === 5) {
        const found = items.find(item => {
          const code = Number(item['Código postal']);

          return code === Number(value);
        });
        if (found) {
          Geolocation.getCurrentPosition(
            position => {
              const pos = [Number(position.coords.longitude), Number(position.coords.latitude)];

              setSellers(sortByDistance(pos, [found]));
            },
            error => {
              setSellers([found]);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          alert.show(
            {
              title: 'Ubicación no encontrada',
              message: 'No pudimos encontrar la ubicación, revisa la dirección e intenta de nuevo.',
              acceptTitle: 'Entendido',
              cancelOutline: 'iconn_light_grey',
              cancelTextColor: 'iconn_dark_grey',
              async onAccept() {
                alert.hide();
              }
            },
            'error'
          );

          setSellers([]);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (!sellers) return;
  }, [sellers]);

  useEffect(() => {
    if (current) {
      dispatch(setDefaultSeller({ defaultSeller: current }));
    }
  }, [current]);

  const SellerItem = ({ selected, onPress, seller }: { selected: boolean; onPress: () => void; seller: SellerInterface }) => {
    const { Tienda, distance } = seller;

    return (
      <Touchable onPress={onPress}>
        <Container
          flex
          row
          style={[
            styles.sellerItem,
            selected && {
              backgroundColor: '#DBE6E3',
              borderColor: theme.brandColor.iconn_green_original
            }
          ]}
        >
          <Container style={styles.wrapper}>
            <Container style={styles.slot}>{selected && <Container style={styles.circle} />}</Container>
          </Container>
          <Container style={{ flexDirection: 'row', flex: 1 }}>
            <Container style={{ width: '100%' }}>
              <Container flex row style={{ flex: 1 }}>
                <Container flex={3}>
                  <CustomText numberOfLines={1} fontSize={16} text={Tienda as string} fontBold />
                </Container>
                <Container>
                  <CustomText fontSize={16} text={distance ? `${(distance * 1000).toFixed(2)} m` : ''} fontBold />
                </Container>
              </Container>
              <Container style={{ marginVertical: 5 }}>
                <CustomText fontSize={16} text={seller.Domicilio} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Touchable>
    );
  };
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      alert.show(
        {
          title: 'No se tiene acceso a localización',
          message: 'Debes proporcionar acceso desde configuraciones',
          acceptTitle: 'Entendido',
          cancelTitle: 'Dar acceso',
          cancelOutline: 'iconn_light_grey',
          cancelTextColor: 'iconn_dark_grey',
          async onAccept() {
            alert.hide();
          },
          async onCancel() {
            Linking.openSettings().catch(() => {
              Alert.alert('No se pudo abrir configuraciones');
            });
            alert.hide();
          }
        },
        'warning'
      );
    }

    if (status === 'disabled') {
      Alert.alert(`Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`, '', [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} }
      ]);
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  };

  return (
    <Container style={{ backgroundColor: '#F1F1F1' }}>
      <Container
        style={{
          backgroundColor: 'white',
          height: 40,
          margin: 12,
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          flexDirection: 'row',
          borderColor: '#dadadb',
          alignContent: 'center',
          minHeight: 50
        }}
      >
        <AntDesign name="search1" size={24} color={theme.brandColor.iconn_green_original} />
        <TextInput
          multiline
          onChangeText={text => {
            if (text.length > 5) return;
            if (text) {
              let isNum = /^\d+$/.test(text);
              if (!isNum) return;
            }
            onChangeText(text.toLowerCase());
          }}
          value={value}
          style={{ marginLeft: 10, width: '90%' }}
        />
      </Container>
      <Touchable
        onPress={async () => {
          const hasPermission = await hasLocationPermission();

          if (!hasPermission) {
            return;
          }

          loader.show();
          Geolocation.getCurrentPosition(
            position => {
              loader.hide();

              const pos = [Number(position.coords.longitude), Number(position.coords.latitude)];
              const sorted = sortByDistance(pos, items).slice(0, 5);
              console.log('sorted:', sorted);
              setSellers(sorted);
            },
            error => {
              loader.hide();
              console.log(error);
            },
            {
              accuracy: {
                android: 'high',
                ios: 'best'
              },
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
              distanceFilter: 0,
              forceRequestLocation: true,
              forceLocationManager: true,
              showLocationDialog: true
            }
          );
        }}
      >
        <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <Image source={ICONN_PIN_LOCATION} />
          <Container style={{ marginLeft: 10 }}>
            <CustomText text={'Usar mi ubicación actual'} fontSize={15} fontBold underline textColor={theme.brandColor.iconn_green_original} />
          </Container>
        </Container>
      </Touchable>

      <ScrollView style={{ height: '100%' }}>
        {sellers.map((seller, index) => {
          return (
            <SellerItem
              key={index}
              seller={seller}
              selected={Number(seller['# Tienda']) === Number(current?.['# Tienda'])}
              onPress={() => {
                setCurrent(seller);
              }}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  sellerItem: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: theme.brandColor.iconn_white,
    marginTop: 10,
    marginHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: theme.brandColor.iconn_white
  },
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12 },
  slot: {
    height: 24,
    width: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_green_original,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: { height: 16, width: 16, backgroundColor: theme.brandColor.iconn_green_original, borderRadius: 20 }
});

export default SearchSellerScreen;
