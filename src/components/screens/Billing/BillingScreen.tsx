import { Button, Container, TextContainer } from 'components';
import React, { useRef, useState } from 'react';
import { ScrollView, TextInput, StyleSheet } from 'react-native';
import theme from 'components/theme/theme';
import { Input, Select, Touchable } from 'components';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { GENDERS } from 'assets/files';
import { emailRules, rfcRule } from 'utils/rules';

interface Props {
  showAlert: () => void;
}

const BillingScreen: React.FC<Props> = ({ showAlert }) => {
  const {
    control,
    setValue,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const rfcRef = useRef<TextInput>(null);
  const businessNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const postalCodeRef = useRef<TextInput>(null);

  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setToggled(!toggled);
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
            placeholder={`RAPA880105P32`}
            blurOnSubmit={false}
            error={errors.name?.message}
            maxLength={13}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Razón Social`} marginTop={21}></TextContainer>
          <Input
            {...register('businessName')}
            ref={businessNameRef}
            name="businessName"
            control={control}
            autoCorrect={false}
            keyboardType="default"
            placeholder={`Alejandra Ramírez Pedroza`}
            blurOnSubmit={false}
            error={errors.name?.message}
            maxLength={30}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Correo electrónico`} marginTop={21} />
          <Input
            {...register('email')}
            ref={emailRef}
            name="email"
            control={control}
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={`a.ramirez.corp@hotmail.com`}
            blurOnSubmit={false}
            rules={emailRules}
            error={errors.name?.message}
            maxLength={30}
            marginTop={4}
            renderErrorIcon={false}
          />

          <TextContainer typography="h5" fontBold text={`Régimen fiscal`} marginTop={21} />
          <Select
            name="Tax Incorporation Regime"
            control={control}
            options={GENDERS.map(item => item.name)}
            onSelect={value => setValue('Tax Incorporation Regime', value)}
            androidMode="dialog"
            label={`Régimen de Incorporación Fiscal`}
            placeholder={`Régimen de Incorporación Fiscal`}
            error={errors.state?.message}
            useActionSheet
          />

          <TextContainer typography="h5" fontBold text={`Uso de CFDI (Predeterminado)`} marginTop={21} />
          <Select
            name="03-Gastos en General"
            control={control}
            options={GENDERS.map(item => item.name)}
            onSelect={value => setValue('03-Gastos en General', value)}
            androidMode="dialog"
            label={`03-Gastos en General`}
            placeholder={`03-Gastos en General`}
            error={errors.state?.message}
            useActionSheet
          />

          <TextContainer typography="h5" fontBold text={`Código Postal`} marginTop={21} />
          <Input
            {...register('postal code', { required: true })}
            ref={postalCodeRef}
            name="postal code"
            control={control}
            autoCorrect={false}
            keyboardType="numeric"
            placeholder={`64000`}
            blurOnSubmit={false}
            error={errors.name?.message}
            maxLength={5}
            marginTop={4}
            renderErrorIcon={false}
          />
        </Container>
        <Touchable onPress={toggle}>
          <Container
            backgroundColor={theme.brandColor.iconn_background}
            style={{ marginVertical: 24, paddingVertical: 21, paddingHorizontal: theme.layoutSpace.medium }}
          >
            <Container flex row>
              <TextContainer textColor={theme.fontColor.dark} typography="h5" fontBold text={`Agregar un domicilio`} />
              <TextContainer textColor={theme.fontColor.grey} typography="placeholder" text={` (Opcional)`} />
              <Container flex style={{ flexDirection: 'row-reverse' }}>
                {toggled ? <Icon name="right" size={18} color={theme.fontColor.dark_grey} /> : <Icon name="down" size={18} color={theme.fontColor.dark_grey} />}
              </Container>
            </Container>
          </Container>
        </Touchable>
        <Container style={styles.billingSection}>
          {toggled && (
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
              <Select
                name="state"
                control={control}
                options={[]}
                onSelect={value => setValue('state', value)}
                androidMode="dialog"
                label={`Estado`}
                placeholder={`Depende del Código Postal`}
                error={errors.gender?.message}
                useActionSheet
              />
              <TextContainer typography="h6" fontBold text={`Municipio, Cuidad o Delegación`} marginTop={25} />
              <Select
                name="municipality"
                control={control}
                options={[]}
                onSelect={value => setValue('municipality', value)}
                androidMode="dialog"
                label={`Municipio`}
                placeholder={`Depende del Código Postal`}
                error={errors.gender?.message}
                useActionSheet
              />
              <TextContainer typography="h6" fontBold text={`Colonia`} marginTop={25} />
              <Select
                name="colony"
                control={control}
                options={[]}
                onSelect={value => setValue('colony', value)}
                androidMode="dialog"
                label={`Colonia`}
                placeholder={`Seleccionar`}
                error={errors.gender?.message}
                useActionSheet
              />
            </Container>
          )}

          <Container style={{ marginTop: 24 }}>
            <Button
              length="long"
              round
              disabled={!isValid}
              onPress={() => {
                console.log('Save billing data');
              }}
              fontSize="h3"
              fontBold
            >
              Guardar
            </Button>
          </Container>

          <Container style={{ marginTop: 16, marginBottom: 32 }}>
            <Button
              color="iconn_light_grey"
              fontColor="dark"
              length="long"
              round
              disabled={false}
              onPress={showAlert}
              fontSize="h3"
              fontBold
              leftIcon={<EvilIcons name="trash" size={22} color={theme.brandColor.iconn_error} style={{ left: 8 }} />}
            >
              Eliminar
            </Button>
          </Container>
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
