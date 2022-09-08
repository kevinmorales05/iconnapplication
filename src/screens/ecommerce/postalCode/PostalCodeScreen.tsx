import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking } from 'react-native';
import theme from 'components/theme/theme';
import { useForm } from 'react-hook-form';
import { Input, CustomText, TextContainer, Button, Container, Touchable } from 'components';
import { ICONN_POSTAL_CODE_HEADER_ICON, ICONN_PIN_LOCATION } from 'assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLoading } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import Geolocation from 'react-native-geolocation-service';
import sellers from 'assets/files/sellers.json';

import { RootState, setDefaultSeller, useAppDispatch, useAppSelector } from 'rtk';

const PostalCodeScreen = () => {
  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm({
    mode: 'onChange'
  });
  const loader = useLoading();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [position, setPosition] = useState<null | Geolocation.GeoPosition>(null);
  const dispatch = useAppDispatch();
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  useEffect(() => {
    if (position) {
      navigate('Home');
    }
  }, [position]);

  useEffect(() => {
    console.log('defaultSeller:', defaultSeller);
  }, [defaultSeller]);

  async function stall(stallTime = 1000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }

  const onSubmit = async () => {
    loader.show('', 'ecommerce');

    await stall();

    navigate('Home');

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
      Alert.alert('Location permission denied');
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

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    loader.show();
    Geolocation.getCurrentPosition(
      position => {
        loader.hide();
        setPosition(position);
        console.log(position);
      },
      error => {
        loader.hide();
        Alert.alert(`Code ${error.code}`, error.message);
        setPosition(null);
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
  };

  const handleGeolocation = async () => {
    getLocation();
  };

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Container style={{ margin: 20 }}>
        <Container style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <Image source={ICONN_POSTAL_CODE_HEADER_ICON} />
          <Container style={{ width: '60%', marginLeft: 10 }}>
            <CustomText text={'Compártenos tu código postal'} fontSize={20} fontBold />
          </Container>
        </Container>
        <TextContainer typography="h5" fontBold text={`Código Postal`} marginTop={21} />
        <Input
          {...register('postalCode')}
          rules={{
            required: {
              value: true,
              message: `Campo requerido.`
            },
            minLength: {
              value: 5,
              message: `Mínimo 5 valores`
            },
            validate: (value: string) => {
              if (value.length === 5) {
                const input = Number(value);

                const found = sellers.find(item => {
                  const current = Number(item['Código postal']);
                  return current === input;
                });
                if (found) {
                  dispatch(setDefaultSeller({ defaultSeller: found }));
                }
                if (!found) {
                  return 'Código Postal no encontrado';
                }
              }

              return true;
            }
          }}
          name="postalCode"
          control={control}
          autoCorrect={false}
          keyboardType="numeric"
          placeholder={`C.P`}
          blurOnSubmit={false}
          error={errors.postalCode?.message}
          maxLength={5}
          marginTop={4}
          renderErrorIcon={false}
          numeric
        />
      </Container>
      <Button
        style={{ marginHorizontal: 10 }}
        disabled={!isValid}
        length="long"
        round
        fontBold
        fontSize="h4"
        leftIcon={<AntDesign name="search1" size={22} color={theme.brandColor.iconn_white} />}
        onPress={handleSubmit(onSubmit)}
      >
        Buscar
      </Button>
      <Touchable onPress={handleGeolocation}>
        <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
          <Image source={ICONN_PIN_LOCATION} />
          <Container style={{ marginLeft: 10 }}>
            <CustomText text={'Usar mi ubicación actual'} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
          </Container>
        </Container>
      </Touchable>
    </ScrollView>
  );
};

export default PostalCodeScreen;

const styles = StyleSheet.create({
  billingSection: {
    paddingHorizontal: theme.layoutSpace.medium
  }
});
