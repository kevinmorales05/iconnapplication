import React, { useState } from 'react';
import { HomeStackParams } from 'navigation/types';
import { ICONN_POSTAL_CODE_HEADER_ICON, ICONN_PIN_LOCATION } from 'assets/images';
import { Input, CustomText, TextContainer, Button, Container, Touchable } from 'components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking, Keyboard } from 'react-native';
import { setDefaultSeller, setUserCP, setUserGeoPoint, useAppDispatch } from 'rtk';
import { useForm } from 'react-hook-form';
import { useLoading, useAlert, useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'utils/scaleMetrics';
import { vtexPickUpPoints } from 'services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appConfig from '../../../../app.json';
import config from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import sellers from 'assets/files/sellers.json';
import theme from 'components/theme/theme';

const PostalCodeScreen = () => {
  const {
    control,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });
  const toast = useToast();
  const loader = useLoading();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [postalCode, setPostalCode] = useState<string>('');
  const { POSTAL_CODE_DEFAULT } = config;

  /*regla de negocio:
    delivery hasta 7 km 
    pickup hasta 20 km
  */

  //useEffect to get geopoint of user before render

  // // Redirect to home if permissions are granted
  // useEffect(() => {
  //   (async () => {
  //     loader.show('', 'ecommerce');
  //     const hasPermission = await hasLocationPermission();

  //     if (!hasPermission) {
  //       loader.hide();
  //       return;
  //     }

  //     Geolocation.getCurrentPosition(
  //       position => {
  //         getPickUpPointsByAddress(position);
  //       },
  //       error => {
  //         loader.hide();
  //       },
  //       {
  //         accuracy: {
  //           android: 'high',
  //           ios: 'best'
  //         },
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 10000,
  //         distanceFilter: 0,
  //         forceRequestLocation: true,
  //         forceLocationManager: true,
  //         showLocationDialog: true
  //       }
  //     );
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (position) {
  //     const sorted = sortByDistance([position.coords.longitude, position.coords.latitude], sellers);
  //     dispatch(setDefaultSeller({ defaultSeller: sorted[0] }));
  //     loader.hide();
  //     navigate('Home');
  //   }
  // }, [position]);

  const getPickUpPoints = async (cp: string) => {
    if (cp.length === 5) {
      const pickUp = await vtexPickUpPoints.getPickUpPointsByCP(cp);
      let item;
      if (pickUp.items.length) {
        sellers.forEach(seller => {
          const store = pickUp.items.find(store => `${seller.seller}_${seller['# Tienda']}` === store.pickupPoint.id);
          if (store.distance < 20) {
            return (item = seller);
          }
        });
        if (item) {
          dispatch(setDefaultSeller({ defaultSeller: item }));
          loader.show('', 'ecommerce');
          navigate('Home', { paySuccess: false });
          dispatch(setUserCP({ cp: cp }));
          return;
        }
      }
      toast.show({
        message: 'No se encontraron tiendas cercanas',
        type: 'error'
      });
      loader.hide();
    }
  };

  const getPickUpPointsByAddress = async (position: Geolocation.GeoPosition) => {
    if (position) {
      const pickUp = await vtexPickUpPoints.getPickUpPointsByAddress(position?.coords.longitude, position?.coords.latitude);
      let item;
      if (pickUp.items.length) {
        sellers.forEach(seller => {
          const store = pickUp.items.find(store => `${seller.seller}_${seller['# Tienda']}` === store.pickupPoint.id);
          if (store.distance < 20) {
            return (item = seller);
          }
        });
        if (item) {
          dispatch(setDefaultSeller({ defaultSeller: item }));
          loader.show('', 'ecommerce');
          navigate('Home', { paySuccess: false });
          dispatch(setUserGeoPoint({ geopoint: position.coords }));
          return;
        }
      }
    }
    toast.show({
      message: 'No se encontraron tiendas cercanas',
      type: 'error'
    });
    loader.hide();
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
        { text: 'Go to settings', onPress: openSetting },
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

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    loader.show('', 'ecommerce');

    Geolocation.getCurrentPosition(
      position => {
        loader.hide();
        getPickUpPointsByAddress(position);
      },
      _error => {
        loader.hide();
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
  };

  const handleGeolocation = async () => {
    getLocation();
  };

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Container style={{ marginHorizontal: 16 }}>
        <Container style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Image source={ICONN_POSTAL_CODE_HEADER_ICON} style={{ width: 40, height: 40, marginTop: 2 }} />
          <Container style={{ width: '60%', marginLeft: 8 }}>
            <CustomText text={'Compártenos tu código postal'} fontSize={20} fontBold />
          </Container>
        </Container>
        <TextContainer typography="h5" fontBold text={'Código Postal'} marginTop={40} />
        <Container style={{ marginBottom: 24 }}>
          <Input
            {...register('postalCode')}
            rules={{
              required: {
                value: true,
                message: 'Campo requerido.'
              },
              minLength: {
                value: 5,
                message: 'Mínimo 5 valores'
              },
              validate: (value: string) => {
                if (value.length === 5) {
                  const input = Number(value);

                  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                  const found = sellers.find(item => {
                    const current = Number(item['Código postal']);
                    return current === input;
                  });
                  // if (found) {
                  //   dispatch(setDefaultSeller({ defaultSeller: found }));
                  // }
                  // if (!found) {
                  //   return 'Código Postal no encontrado';
                  //   //return true;
                  // }
                }

                return true;
              }
            }}
            name="postalCode"
            control={control}
            autoCorrect={false}
            keyboardType="numeric"
            placeholder={'C.P'}
            blurOnSubmit={false}
            error={errors.postalCode?.message}
            maxLength={5}
            marginTop={4}
            numeric
            onChangeText={text => {
              setPostalCode(text);
            }}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Container>
        <Button
          disabled={!isValid}
          round
          fontBold
          fontSize="h3"
          leftIcon={<AntDesign name="search1" size={22} color={theme.brandColor.iconn_white} style={{ position: 'absolute', left: 24 }} />}
          onPress={() => {
            getPickUpPoints(postalCode);
          }}
        >
          Buscar
        </Button>
      </Container>
      <Touchable onPress={handleGeolocation}>
        <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 44 }}>
          <Image source={ICONN_PIN_LOCATION} style={{ height: 24, width: 24 }} />
          <Container style={{ marginLeft: 10 }}>
            <CustomText text={'Usar mi ubicación actual'} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
          </Container>
        </Container>
      </Touchable>
      <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: verticalScale(220) }}>
        <Touchable
          onPress={() => {
            getPickUpPoints(POSTAL_CODE_DEFAULT!);
          }}
        >
          <CustomText text={'En otro momento'} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
        </Touchable>
      </Container>
    </ScrollView>
  );
};

export default PostalCodeScreen;
