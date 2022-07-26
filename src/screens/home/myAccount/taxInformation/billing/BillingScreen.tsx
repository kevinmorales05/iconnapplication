import { Button, Container, TextContainer } from 'components';
import React, { useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Input, Select } from 'components/atoms';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { GENDERS } from 'assets/files';
import { emailRules, rfcRule } from 'utils/rules';

interface Props {
  showAlert: () => void;
}

const BillingScreen: React.FC<Props> = ({ showAlert }) => {
  const insets = useSafeAreaInsets();

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

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex>
        <TextContainer
          textColor={theme.brandColor.iconn_grey}
          typography="description"
          text={`Todos los campos son obligatorios.`}
        ></TextContainer>
        <TextContainer
          typography="h3"
          fontBold
          text={`Datos Fiscales`}
          marginTop={25}
        ></TextContainer>
        <TextContainer
          typography="h5"
          fontBold
          text={`RFC`}
          marginTop={13}
        ></TextContainer>
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
        <TextContainer
          typography="h5"
          fontBold
          text={`Razón Social`}
          marginTop={21}
        ></TextContainer>
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
        <TextContainer
          typography="h5"
          fontBold
          text={`Correo electrónico`}
          marginTop={21}
        ></TextContainer>
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
        <TextContainer
          typography="h5"
          fontBold
          text={`Régimen fiscal`}
          marginTop={21}
        ></TextContainer>
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
        <TextContainer
          typography="h5"
          fontBold
          text={`Uso de CFDI (Predeterminado)`}
          marginTop={21}
        ></TextContainer>
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
        <TextContainer
          typography="h5"
          fontBold
          text={`Código Postal`}
          marginTop={21}
        ></TextContainer>
        <Input
          {...register('postal code')}
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
        <Container backgroundColor={theme.brandColor.iconn_background} style={{ marginTop: 24, width: 360, height: 90 }}>
          <TextContainer
            textColor={theme.fontColor.dark}
            typography="h5"
            fontBold
            text={`Agregar un domicilio`}
            marginTop={21}
          ></TextContainer>
          <Container flex row style={{ marginTop: 9 }}>
            <Icon
              name="checkcircle"
              size={18}
              color={theme.brandColor.iconn_success}
              style={{ marginRight: 5 }}
            />
            <CustomText
              textColor={theme.brandColor.iconn_green_original}
              text={'Registrado'}
              typography="h5"
              fontWeight="normal"
            />
            <Icon
              name="right"
              size={18}
              color={theme.fontColor.dark_grey}
              style={{ marginStart: '68%', margin: -14, fontWeight: 'bold' }}
            />
          </Container>
        </Container>
        <Container style={{ marginTop: 24 }}>
          <Button
            length="long"
            round
            disabled={!isValid}
            onPress={() => { console.log('Save billing data'); }}
            fontSize="h3"
            fontBold
          >
            Guardar
          </Button>
        </Container>
        <Container style={{ marginTop: 16, marginBottom: 32 }}>
          <Button
            color='iconn_light_grey'
            fontColor='dark'
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
    </ScrollView>
  );
};

export default BillingScreen;
