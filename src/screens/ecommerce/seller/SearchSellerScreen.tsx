import React, { useState, useEffect } from 'react';
import { CustomText, Touchable, Container } from 'components';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { PlacesSvg } from 'components/svgComponents/PlacesSvg';
import { ScrollView, TextInput, StyleSheet, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking } from 'react-native';
import { SellerInterface, setDefaultSeller, useAppDispatch, useAppSelector, RootState } from 'rtk';
import { useLoading, useAlert, useToast } from 'context';
import { vtexPickUpPoints } from 'services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appConfig from '../../../../app.json';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import theme from 'components/theme/theme';
import analytics from '@react-native-firebase/analytics';

/*regla de negocio:
  delivery hasta 7 km 
  pickup hasta 20 km
*/

const SearchSellerScreen = () => {
  const [value, onChangeText] = useState('');
  const [current, setCurrent] = useState<any | null>(null);
  const [sellersToRender, setSellers] = useState<any[]>([]);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  const dispatch = useAppDispatch();

  const loader = useLoading();

  const alert = useAlert();

  const toast = useToast();

  useEffect(() => {
    setCurrent(defaultSeller);
  }, [defaultSeller]);

  useEffect(() => {
    if (current) {
      dispatch(setDefaultSeller({ defaultSeller: current }));
    }
  }, [current]);

  const format = (distance: number) => {
    if (distance * 1000 < 1000) {
      return `${(distance * 1000).toFixed(1)} m `;
    } else {
      return `${distance.toFixed(1)} km `;
    }
  };

  const SellerItem = ({ selected, onPress, seller }: { selected: boolean; onPress: () => void; seller: any }) => {
    const { distance } = seller;

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
                <Container flex={3} style={{ paddingRight: 15 }}>
                  <CustomText fontSize={16} text={'7-Eleven ' + seller.pickupPoint.friendlyName} fontBold />
                  <CustomText
                    numberOfLines={3}
                    fontSize={16}
                    text={
                      seller.pickupPoint.address.street +
                      ' ' +
                      seller.pickupPoint.address.number +
                      ', ' +
                      seller.pickupPoint.address.postalCode +
                      ' ' +
                      seller.pickupPoint.address.city +
                      ', ' +
                      seller.pickupPoint.address.state
                    }
                  />
                </Container>
                <Container style={{ marginRight: 10 }}>
                  <CustomText fontSize={16} text={distance ? format(distance) : ''} fontBold />
                </Container>
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
        { text: 'Do not use location', onPress: () => {} }
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

  useEffect(() => {
    if (user.cp) {
      getPickUpPoints(user.cp);
      onChangeText(user.cp);
    } else if (user.geopoint) {
      getPickUpPointsByAddress(user.geopoint);
    }
  }, [user]);

  const getPickUpPoints = async (cp: string) => {
    if (cp.length === 5) {
      const pickUp = await vtexPickUpPoints.getPickUpPointsByCP(cp);
      const temSellers: any[] = [];
      if (pickUp.items.length) {
        pickUp.items.forEach(store => {
          // console.log({ temSellers: pickUp.items });
          if (store.distance < 20) {
            temSellers.push(store);
          }
        });
      }
      if (temSellers.length) {
        setSellers(temSellers);
        return;
      }
      toast.show({
        message: 'Servicio no disponible en esta zona.',
        type: 'error'
      });
      setSellers([]);
      loader.hide();
    }
  };

  const getPickUpPointsByAddress = async (position: GeoCoordinates) => {
    if (position) {
      onChangeText('');
      const pickUp = await vtexPickUpPoints.getPickUpPointsByAddress(position.longitude, position.latitude);
      const temSellers: SellerInterface[] = [];
      if (pickUp.items.length) {
        sellers.forEach(seller => {
          // console.log({ temSellers: pickUp.items });
          const store = pickUp.items.find(store => `${seller.seller}_${seller['# Tienda']}` === store.pickupPoint.id);
          if (store.distance < 20) {
            temSellers.push(seller);
          }
        });
      }
      if (temSellers.length) {
        setSellers(temSellers);
        return;
      }
    }
    toast.show({
      message: 'Servicio no disponible en esta zona.',
      type: 'error'
    });
    setSellers([]);
    loader.hide();
  };

  const onChanged = text => {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    onChangeText(newText);
  };

  return (
    <Container flex style={{ backgroundColor: theme.brandColor.iconn_grey_background }}>
      <Container style={styles.content}>
        <AntDesign style={{ paddingHorizontal: 5 }} name="search1" size={24} color={theme.brandColor.iconn_green_original} />
        <TextInput
          placeholderTextColor={theme.fontColor.placeholder}
          placeholder={'Ingresa Código Postal'}
          keyboardType={'numeric'}
          onChangeText={text => {
            onChanged(text);
          }}
          onEndEditing={() => {
            getPickUpPoints(value);
          }}
          onPressIn={async () => {
            try {
              await analytics().logEvent('hmSelectSearchBar', {
                id: user.id,
                description: 'Seleccionar barra de búsqueda de tienda'
              });
              //console.log('succesfully added to firebase!');
            } catch (error) {
              //console.log(error);
            }
            getPickUpPoints(value);
          }}
          value={value}
          style={{ marginLeft: 10, flex: 1, paddingVertical: 5, color: theme.fontColor.dark }}
        />
      </Container>
      <Touchable
        onPress={async () => {
          try {
            await analytics().logEvent('hmUseMyUbication', {
              id: user.id,
              description: 'Usar mi ubicación'
            });
            //console.log('succesfully added to firebase!');
          } catch (error) {
            //console.log(error);
          }
          const hasPermission = await hasLocationPermission();

          if (!hasPermission) {
            return;
          }

          loader.show('', 'ecommerce');
          Geolocation.getCurrentPosition(
            position => {
              loader.hide();
              getPickUpPointsByAddress(position.coords);
            },
            _error => {
              loader.hide();
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
          <PlacesSvg size={moderateScale(24)} color={theme.brandColor.iconn_accent_principal} />
          <Container style={{ marginLeft: 10 }}>
            <CustomText text={'Usar mi ubicación actual'} fontSize={15} fontBold underline textColor={theme.brandColor.iconn_green_original} />
          </Container>
        </Container>
      </Touchable>
      <Container width={'100%'} height={verticalScale(430)}>
        <ScrollView>
          {sellersToRender.slice(0, 5).map((seller, index) => {
            return (
              <SellerItem
                key={index}
                seller={seller}
                selected={Number(seller.pickupPoint.address.addressId) === Number(current?.pickupPoint.address.addressId)}
                onPress={async () => {
                  try {
                    await analytics().logEvent('hmSelectDeliveryChooseStoreFromList', {
                      id: user.id,
                      description: ' Seleccionar barra de búsqueda',
                      storeId: `${seller.pickupPoint.address.addressId}`
                    });
                    //console.log('succesfully added to firebase!');
                  } catch (error) {
                    //console.log(error);
                  }
                  setCurrent(seller);
                  console.log("thi is the current ",JSON.stringify(current));
                }}
              />
            );
          })}
        </ScrollView>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    flexDirection: 'row',
    borderColor: '#dadadb',
    alignContent: 'center',
    minHeight: 50,
    alignItems: 'center'
  },
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
  circle: { height: 16, width: 16, backgroundColor: theme.brandColor.iconn_green_original, borderRadius: 20 },
  containerInfo: {
    width: moderateScale(319),
    height: moderateScale(55),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.yellow_container,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_warning,
    marginTop: moderateScale(40),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(40),
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default SearchSellerScreen;
