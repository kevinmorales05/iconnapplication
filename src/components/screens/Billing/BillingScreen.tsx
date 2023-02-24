import { Button, TextContainer } from '../../molecules';
import React, { useCallback, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ScrollView, TextInput, StyleSheet, View } from 'react-native';
import theme from 'components/theme/theme';
import { useForm } from 'react-hook-form';
import { Input, Select, Touchable, Container, CustomText } from '../../atoms';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { emailRules, rfcRule } from 'utils/rules';
import { InvoicingProfileInterface, Colony, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { getCFDIListThunk, getTaxRegimeListThunk } from 'rtk/thunks/invoicing.thunks';
import { invoicingServices } from 'services';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useAlert } from 'context';
import { AnnounceItem } from '../../atoms';
import Feather from 'react-native-vector-icons/Feather';
import { logEvent } from 'utils/analytics';
import { HeaderBackButton } from '@react-navigation/elements';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  onSubmit: (data: any) => void;
  onDelete?: (invoicingProfileInterface: InvoicingProfileInterface) => void;
  onBack?: () => void;
  current?: InvoicingProfileInterface;
  isReset?: boolean;
}

const BillingScreen: React.FC<Props> = ({ onSubmit, onDelete, current, isReset }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    setValue,
    watch,
    formState: { errors, isDirty },
    register,
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange'
  });
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [disabled, setDisabled] = useState(false);
  const { isGuest } = useAppSelector((state: RootState) => state.auth);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams, 'CreateTaxProfile'>>();
  const alert = useAlert();

  const onBack = () => {
    if (isDirty) {
      alert.show(
        {
          title: '¿Salir sin guardar cambios?',
          message: 'Tienes cambios no guardados.',
          acceptTitle: 'Volver',
          cancelTitle: 'Salir sin guardar',
          cancelOutline: 'iconn_green_original',
          cancelTextColor: 'iconn_green_original',
          async onAccept() {
            alert.hide();
          },
          async onCancel() {
            alert.hide();
            navigation.goBack();
          }
        },
        'warning'
      );
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (isReset) {
      resetForm();
    }
  }, [isReset]);

  /** Custom event for software 'Back Button' android /ios (software button) */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => {
        return <HeaderBackButton {...props} onPress={onBack} style={{ width: moderateScale(24), height: moderateScale(24), marginLeft: moderateScale(-8) }} />;
      }
    });
  }, [navigation, isDirty]);

  const mandatoryFields = watch(['rfc', 'cfdi', 'email', 'regime', 'postalCode', 'businessName']);

  useEffect(() => {
    const emptyField = mandatoryFields.some(field => {
      return !field;
    });

    //enables custom validations
    if (Object.keys(errors).length > 0) {
      setDisabled(true);
      return;
    }

    setDisabled(emptyField);
  }, [mandatoryFields, errors]);

  const rfcRef = useRef<TextInput>(null);
  const businessNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const postalCodeRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const ext_numRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);

  const [regimensList, setRegimensList] = useState([]);
  const [cfdiList, setCfdiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colonies, setColonies] = useState<Colony[] | null>(null);
  const [toggled, setToggled] = useState(false);
  const [initialOffset, setInitialOffset] = useState(-100);

  const fetchCatalogs = useCallback(async () => {
    const { data: regimens } = await dispatch(getTaxRegimeListThunk()).unwrap();
    setRegimensList(regimens);
    const { data: cfdis } = await dispatch(getCFDIListThunk()).unwrap();
    setCfdiList(cfdis);
  }, []);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  const postalCode = watch('postalCode', '');

  useEffect(() => {
    getColonies();
  }, [postalCode]);

  const getColonies = async (zipCode?: string) => {
    const temPostal = zipCode ? zipCode : postalCode;
    if (!temPostal) {
      setColonies(null);
      return;
    }
    setLoading(true);
    try {
      const data = await invoicingServices.getColonies(temPostal);
      if (data.responseCode === 65) {
        setColonies(data.data as Colony[]);
      } else {
        setColonies(null);
      }
    } catch (error) {
      setColonies(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (colonies?.length) {
        const sample: Colony = colonies[0];
        setValue('state', sample.City.State.name);
        setValue('city', sample.City.name);
        if (current?.Address && toggled) {
          setValue('colony', current.Address.colony);
          setValue('colony', current.Address.colony);
        }
      }
    }, 250);
  }, [colonies, current, toggled]);

  const resetForm = () => {
    reset({
      rfc: '',
      cfdi: '',
      email: '',
      regime: '',
      postalCode: '',
      businessName: '',
      street: '',
      city: '',
      state: '',
      ext_num: ''
    });
    if (rfcRef.current) rfcRef.current.focus();
  };

  useEffect(() => {
    if (current?.Cfdi) {
      getColonies(current.zip_code);
      setValue('rfc', current.rfc);
      setValue('cfdi', current.Cfdi.description);
      setValue('email', current.email);
      setValue('regime', current.Tax_Regime.sat_tax_regime);
      setValue('postalCode', current.zip_code);
      setValue('businessName', current.business_name);
      setValue('street', current.Address.street);
      setValue('city', current.Address.city);
      setValue('state', current.Address.state);
      setValue('ext_num', current.Address.ext_num);
    }
  }, [current]);

  const submit = (fields: any) => {
    const { c_use_cfdi } = cfdiList.find(cfdi => {
      const item = cfdi as any;

      return item.description === fields.cfdi;
    }) as any;

    const { tax_code_key } = regimensList.find(regimen => {
      const item = regimen as any;

      return item.sat_tax_regime === fields.regime;
    }) as any;

    const invoicingProfile = {
      user_id: user.userId,
      rfc: fields.rfc,
      business_name: fields.businessName,
      email: fields.email,
      c_use_cfdi,
      tax_code_key,
      zip_code: fields.postalCode,
      address: {
        street: fields.street,
        ext_num: fields.ext_num,
        colony: fields.colony,
        city: fields.city,
        state: fields.state
      }
    };

    onSubmit(invoicingProfile);
    logEvent('invSaveInvoicingProfile', {
      id: user.id,
      description: 'Guardar perfil fiscal'
    });
  };

  useEffect(() => {
    if (rfcRef.current) {
      rfcRef.current.focus();
    }
  }, []);

  return (
    <Container flex useKeyboard keyboardVerticalOffset={initialOffset}>
      <ScrollView bounces={true} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Container>
          <Container style={styles.billingSection}>
            {isGuest ? (
              <AnnounceItem
                icon={<Feather name="alert-triangle" size={25} color={theme.fontColor.white} />}
                message={
                  <View style={{ marginVertical: 20 }}>
                    <CustomText text="Como invitado, tus datos ficales no se guardarán para las siguientes facturas" />
                    <View style={{ marginTop: 10 }}>
                      <CustomText text="Registrarme" underline fontBold textColor={theme.fontColor.dark_orange} />
                    </View>
                  </View>
                }
              />
            ) : (
              <TextContainer typography="paragraph" text="Crea un perfil fiscal para guardar tus datos de facturación." />
            )}

            <TextContainer textColor={theme.brandColor.iconn_grey} typography="description" text={'Todos los campos son obligatorios.'} marginTop={6} />
            <TextContainer typography="h3" fontBold text={'Datos Fiscales'} marginTop={25} />
            <TextContainer typography="h5" fontBold text={'RFC'} marginTop={13} />

            <Input
              {...register('rfc')}
              ref={rfcRef}
              name="rfc"
              control={control}
              keyboardType="email-address"
              autoCapitalize="characters"
              autoCorrect={false}
              rules={rfcRule}
              placeholder={'Escribe tu RFC con homoclave'}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                setInitialOffset(100);
                businessNameRef.current?.focus();
              }}
              error={errors.rfc?.message}
              maxLength={13}
              marginTop={4}
            />

            <TextContainer typography="h5" fontBold text={'Razón Social'} marginTop={21} />
            <Input
              {...register('businessName')}
              rules={{
                required: {
                  value: true,
                  message: 'Campo requerido.'
                },
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 valores'
                }
              }}
              name="businessName"
              ref={businessNameRef}
              control={control}
              autoCorrect={false}
              keyboardType="email-address"
              placeholder={'Nombre completo o Razón Social'}
              blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current?.focus()}
              error={errors.businessName?.message}
              maxLength={100}
              marginTop={4}
            />

            <TextContainer typography="h5" fontBold text={'Correo electrónico'} marginTop={21} />
            <Input
              {...register('email')}
              ref={emailRef}
              name="email"
              control={control}
              autoCorrect={false}
              keyboardType="email-address"
              placeholder={'a.ramirez.corp@hotmail.com'}
              blurOnSubmit={false}
              onSubmitEditing={() => postalCodeRef.current?.focus()}
              rules={emailRules}
              error={errors.email?.message}
              maxLength={256}
              marginTop={4}
            />

            <TextContainer typography="h5" fontBold text={'Régimen fiscal'} marginTop={21} />
            <Select
              name="regime"
              rules={{
                required: {
                  value: true,
                  message: 'Campo requerido.'
                }
              }}
              control={control}
              options={regimensList.map(item => item.sat_tax_regime)}
              onSelect={value => setValue('regime', value)}
              androidMode="dialog"
              label={'Régimen de Incorporación Fiscal'}
              placeholder={'Seleccionar'}
              error={errors.regime?.message}
            />

            <TextContainer typography="h5" fontBold text={'Uso de CFDI (Predeterminado)'} marginTop={21} />
            <Select
              name="cfdi"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Campo requerido.'
                }
              }}
              options={cfdiList.map(item => item.description)}
              onSelect={value => setValue('cfdi', value)}
              androidMode="dialog"
              placeholder={'Seleccionar'}
              error={errors.cfdi?.message}
            />

            <TextContainer typography="h5" fontBold text={'Código Postal'} marginTop={21} />
            <Input
              {...register('postalCode')}
              rules={{
                required: {
                  value: true,
                  message: 'Campo requerido.'
                }
              }}
              name="postalCode"
              ref={postalCodeRef}
              control={control}
              autoCorrect={false}
              keyboardType="numbers-and-punctuation"
              placeholder={'C.P'}
              blurOnSubmit={true}
              onSubmitEditing={() => streetRef.current?.focus()}
              error={errors.postalCode?.message}
              maxLength={5}
              marginTop={4}
              numeric
            />
            {loading && (
              <Container row>
                <Container flex row style={{ marginTop: 10 }} center>
                  <CustomText textColor={theme.fontColor.grey} text={'Validando...'} typography="h6" fontWeight="normal" />
                </Container>
              </Container>
            )}
            {colonies?.length && !loading && (
              <Container row>
                <Container flex row style={{ marginTop: 10 }} center>
                  <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />
                  <CustomText textColor={theme.brandColor.iconn_green_original} text={'Código postal válido'} typography="h6" fontWeight="normal" />
                </Container>
              </Container>
            )}
          </Container>
          <Touchable
            onPress={() => {
              setToggled(toggled1 => {
                return !toggled1;
              });
            }}
          >
            <Container
              backgroundColor={theme.brandColor.iconn_background}
              style={{ marginVertical: 24, paddingVertical: 21, paddingHorizontal: theme.layoutSpace.medium }}
            >
              <Container flex row>
                <TextContainer textColor={theme.fontColor.dark} typography="h5" fontBold text={'Agregar un domicilio'} />
                <TextContainer textColor={theme.fontColor.grey} typography="placeholder" text={' (Opcional)'} />
                <Container flex style={{ flexDirection: 'row-reverse' }}>
                  {toggled ? <Icon name="up" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
                </Container>
              </Container>
            </Container>
          </Touchable>
          <Container style={styles.billingSection}>
            {colonies && toggled && (
              <Container style={{ marginBottom: 25 }}>
                <TextContainer typography="h6" fontBold text={'Calle'} marginTop={25} />
                <Input
                  {...register('street')}
                  name="street"
                  ref={streetRef}
                  control={control}
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder={'Nombre de la calle'}
                  blurOnSubmit={true}
                  onSubmitEditing={() => ext_numRef.current?.focus()}
                  error={errors.street?.message}
                  maxLength={30}
                />
                <TextContainer typography="h6" fontBold text={'Número exterior'} marginTop={25} />
                <Input
                  control={control}
                  {...register('ext_num')}
                  name="ext_num"
                  ref={ext_numRef}
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder={'Número'}
                  blurOnSubmit={true}
                  error={errors.ext_num?.message}
                  maxLength={30}
                />
                <TextContainer typography="h6" fontBold text={'Estado'} marginTop={25} />
                <View pointerEvents="none">
                  <Input
                    control={control}
                    {...register('state')}
                    name="state"
                    ref={stateRef}
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder={'Estado'}
                    error={errors.state?.message}
                    maxLength={30}
                  />
                </View>
                <TextContainer typography="h6" fontBold text={'Municipio, Cuidad o Delegación'} marginTop={25} />
                <View pointerEvents="none">
                  <Input control={control} {...register('city')} name="city" ref={cityRef} placeholder={'Ciudad'} error={errors.city?.message} maxLength={30} />
                </View>

                <TextContainer typography="h6" fontBold text={'Colonia'} marginTop={25} />
                <Select
                  name="colony"
                  control={control}
                  options={colonies.map((colony: Colony) => {
                    return colony.name;
                  })}
                  onSelect={value => setValue('colony', value)}
                  androidMode="dialog"
                  label={'Colonia'}
                  placeholder={'Seleccionar'}
                  error={errors.colony?.message}
                />
              </Container>
            )}

            <Container style={{ marginBottom: current ? 0 : 40 }}>
              <Button disabled={disabled || colonies === null} length="long" round onPress={handleSubmit(submit)} fontSize="h3" fontBold>
                Guardar
              </Button>
            </Container>

            {current && (
              <Container style={{ marginVertical: 20 }}>
                <Button
                  color="iconn_light_grey"
                  fontColor="dark"
                  length="long"
                  round
                  onPress={() => {
                    if (!onDelete) return;
                    onDelete(current);
                    logEvent('invRemoveInvoicingProfile', {
                      id: user.id,
                      description: 'Remover perfil fiscal '
                    });
                  }}
                  fontSize="h3"
                  fontBold
                  leftIcon={<EvilIcons name="trash" size={22} color={theme.brandColor.iconn_error} style={{ left: 8 }} />}
                >
                  Eliminar
                </Button>
              </Container>
            )}
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  billingSection: {
    paddingHorizontal: theme.layoutSpace.medium
  }
});
