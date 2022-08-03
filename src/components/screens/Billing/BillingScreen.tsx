import { Button, TextContainer } from '../../molecules';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { useForm } from 'react-hook-form';
import { Input, Select, Touchable, Container, CustomText } from '../../atoms';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { emailRules, rfcRule } from 'utils/rules';
import { RootState, useAppDispatch, useAppSelector } from 'rtk';
import { getCFDIListThunk, getTaxRegimeListThunk } from 'rtk/thunks/invoicing.thunks';
import { invoicingServices } from 'services';
import { Colony } from 'lib/models/InvoicingProfile';

interface Props {
  onSubmit: (data: any) => void;
  onDelete?: () => void;
}

const BillingScreen: React.FC<Props> = ({ onSubmit, onDelete }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    setValue,
    watch,
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm({
    mode: 'onChange'
  });
  const { user } = useAppSelector((state: RootState) => state.auth);

  const rfcRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const [toggled, setToggled] = useState(false);
  const [regimensList, setRegimensList] = useState([]);
  const [cfdiList, setCfdiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colonies, setColonies] = useState<Colony[] | null>(null);

  const toggle = () => {
    setToggled(!toggled);
  };

  const fetchCatalogs = useCallback(async () => {
    const { data: regimens } = await dispatch(getTaxRegimeListThunk()).unwrap();
    setRegimensList(regimens);
    const { data: cfdis } = await dispatch(getCFDIListThunk()).unwrap();
    setCfdiList(cfdis);
  }, []);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  const { postalCode } = watch();

  const fetchColonies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await invoicingServices.getColonies(postalCode || 'XXXXX');
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
  }, [postalCode]);

  useEffect(() => {
    fetchColonies();
  }, [postalCode]);

  useEffect(() => {
    if (colonies) {
      const sample: Colony = colonies[0];

      setValue('state', sample.City.State.name);
      setValue('city', sample.City.name);
      setToggled(true);
    } else {
      setToggled(false);
    }
  }, [colonies]);

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
      user_id: user.user_id,
      rfc: fields.rfc,
      business_name: fields.businessName,
      email: fields.email,
      c_use_cfdi,
      tax_code_key,
      zip_code: Number(fields.postalCode),
      address: {
        street: fields.street,
        ext_num: fields.ext_num,
        colony: fields.colony,
        city: fields.city,
        state: fields.state,
      }
    };

    onSubmit(invoicingProfile);
  };

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Container flex style={{ marginTop: 24 }}>
        <Container style={styles.billingSection}>
          <TextContainer typography="paragraph" text="Crea un perfil fiscal para guardar tus datos de facturación."></TextContainer>
          <TextContainer textColor={theme.brandColor.iconn_grey} typography="description" text={`Todos los campos son obligatorios.`} marginTop={6} />
          <TextContainer typography="h3" fontBold text={`Datos Fiscales`} marginTop={25}></TextContainer>
          <TextContainer typography="h5" fontBold text={`RFC`} marginTop={13}></TextContainer>

          <Input
            {...register('rfc')}
            ref={rfcRef}
            name="rfc"
            control={control}
            keyboardType="default"
            autoCapitalize="characters"
            autoCorrect={false}
            rules={rfcRule}
            placeholder={`Escribe tu RFC con homoclave`}
            blurOnSubmit={false}
            error={errors.rfc?.message}
            maxLength={13}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Razón Social`} marginTop={21}></TextContainer>
          <Input
            {...register('businessName')}
            rules={{
              required: {
                value: true,
                message: `Campo requerido.`
              }
            }}
            name="businessName"
            control={control}
            autoCorrect={false}
            keyboardType="default"
            placeholder={`Nombre completo o Razón Social`}
            blurOnSubmit={false}
            error={errors.businessName?.message}
            maxLength={30}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Correo electrónico`} marginTop={21} />
          <Input
            {...register('email')}
            ref={emailRef}
            name="email"
            rules={{
              required: {
                value: true,
                message: `Campo requerido.`
              }
            }}
            control={control}
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={`a.ramirez.corp@hotmail.com`}
            blurOnSubmit={false}
            rules={emailRules}
            error={errors.email?.message}
            maxLength={30}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Régimen fiscal`} marginTop={21} />
          <Select
            name="regime"
            rules={{
              required: {
                value: true,
                message: `Campo requerido.`
              }
            }}
            control={control}
            options={regimensList.map(item => item.sat_tax_regime)}
            onSelect={value => setValue('regime', value)}
            androidMode="dialog"
            label={`Régimen de Incorporación Fiscal`}
            placeholder={`Régimen de Incorporación Fiscal`}
            error={errors.regime?.message}
            useActionSheet
          />

          <TextContainer typography="h5" fontBold text={`Uso de CFDI (Predeterminado)`} marginTop={21} />
          <Select
            name="cfdi"
            control={control}
            rules={{
              required: {
                value: true,
                message: `Campo requerido.`
              }
            }}
            options={cfdiList.map(item => item.description)}
            onSelect={value => setValue('cfdi', value)}
            androidMode="dialog"
            label={`03-Gastos en General`}
            placeholder={`03-Gastos en General`}
            error={errors.cfdi?.message}
            useActionSheet
          />

          <TextContainer typography="h5" fontBold text={`Código Postal`} marginTop={21} />
          <Input
            {...register('postalCode')}
            rules={{
              required: {
                value: true,
                message: `Campo requerido.`
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
          {loading && (
            <Container row>
              <Container flex row style={{ marginTop: 10 }} center>
                <CustomText textColor={theme.fontColor.grey} text={'Validando...'} typography="h6" fontWeight="normal" />
              </Container>
            </Container>
          )}
          {colonies && !loading && (
            <Container row>
              <Container flex row style={{ marginTop: 10 }} center>
                <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />
                <CustomText textColor={theme.brandColor.iconn_green_original} text={'Código postal válido'} typography="h6" fontWeight="normal" />
              </Container>
            </Container>
          )}
        </Container>
        <Touchable disabled={!Boolean(colonies)} onPress={toggle}>
          <Container
            backgroundColor={theme.brandColor.iconn_background}
            style={{ marginVertical: 24, paddingVertical: 21, paddingHorizontal: theme.layoutSpace.medium }}
          >
            <Container flex row>
              <TextContainer textColor={theme.fontColor.dark} typography="h5" fontBold text={`Agregar un domicilio`} />
              <TextContainer textColor={theme.fontColor.grey} typography="placeholder" text={` (Opcional)`} />
              <Container flex style={{ flexDirection: 'row-reverse' }}>
                {toggled ? <Icon name="up" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
              </Container>
            </Container>
          </Container>
        </Touchable>
        <Container style={styles.billingSection}>
          {toggled && colonies && (
            <Container>
              <TextContainer typography="h6" fontBold text={`Calle`} marginTop={25} />
              <Input
                {...register('street')}
                control={control}
                autoCorrect
                keyboardType="default"
                placeholder={'Nombre de la calle'}
                blurOnSubmit={false}
                error={errors.street?.message}
                maxLength={30}
              />
              <TextContainer typography="h6" fontBold text={`Número exterior`} marginTop={25} />
              <Input
                control={control}
                {...register('ext_num')}
                autoCorrect
                keyboardType="default"
                placeholder={'Número'}
                blurOnSubmit={false}
                error={errors.ext_num?.message}
                maxLength={30}
              />
              <TextContainer typography="h6" fontBold text={`Estado`} marginTop={25} />
              <Input
                control={control}
                {...register('state')}
                autoCorrect
                keyboardType="default"
                placeholder={'Estado'}
                blurOnSubmit={false}
                error={errors.state?.message}
                maxLength={30}
              />
              <TextContainer typography="h6" fontBold text={`Municipio, Cuidad o Delegación`} marginTop={25} />
              <Input
                disabled
                control={control}
                {...register('city')}
                autoCorrect
                keyboardType="default"
                placeholder={'Ciudad'}
                blurOnSubmit={false}
                error={errors.city?.message}
                maxLength={30}
              />
              <TextContainer typography="h6" fontBold text={`Colonia`} marginTop={25} />
              <Select
                name="colony"
                control={control}
                options={colonies.map((colony: Colony) => {
                  return colony.name;
                })}
                onSelect={value => setValue('colony', value)}
                androidMode="dialog"
                label={`Colonia`}
                placeholder={`Seleccionar`}
                error={errors.colony?.message}
                useActionSheet
              />
            </Container>
          )}

          <Container style={{ marginVertical: 24 }}>
            <Button 
            disabled={!isValid} 
            length="long" round onPress={handleSubmit(submit)} fontSize="h3" fontBold>
              Guardar
            </Button>
          </Container>

          {onDelete && (
            <Container>
              <Button
                color="iconn_light_grey"
                fontColor="dark"
                length="long"
                round
                onPress={onDelete}
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
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  billingSection: {
    paddingHorizontal: theme.layoutSpace.medium
  }
});
