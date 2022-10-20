import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, Button, Container } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, RegisterOptions, SubmitHandler, useFormContext } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONN_EMAIL } from 'assets/images';

interface Props {
  onSubmit: (data: FieldValues) => void;
  goBack: () => void;
  hasNavigationTitle: boolean;
  email: string;
}

const CreatePasswordScreen: React.FC<Props> = ({ onSubmit, goBack, hasNavigationTitle, email }) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    register
  } = useFormContext();

  const passwordRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    console.log(fields);
    onSubmit(fields);
  };

  //items
  const [val1Item, setVal1Item] = useState('ellipse');
  const [val2Item, setVal2Item] = useState('ellipse');
  const [val3Item, setVal3Item] = useState('ellipse');
  const [val4Item, setVal4Item] = useState('ellipse');
  //colors
  const [val1Color, setVal1Color] = useState(theme.brandColor.iconn_med_grey);
  const [val2Color, setVal2Color] = useState(theme.brandColor.iconn_med_grey);
  const [val3Color, setVal3Color] = useState(theme.brandColor.iconn_med_grey);
  const [val4Color, setVal4Color] = useState(theme.brandColor.iconn_med_grey);
  //password validation
  const [passValid, setPassValid] = useState(false);
  //activitus error
  const [passwordError, setPasswordError] = useState('');

  /**
   * Function to validate password criteria.
   * @param value
   */
  const validatePassword = (value: string) => {
    if (value === '') {
      setVal1Item('ellipse');
      setVal1Color(theme.brandColor.iconn_med_grey);
      setVal2Item('ellipse');
      setVal2Color(theme.brandColor.iconn_med_grey);
      setVal3Item('ellipse');
      setVal3Color(theme.brandColor.iconn_med_grey);
      setVal4Item('ellipse');
      setVal4Color(theme.brandColor.iconn_med_grey);
      setPasswordError('1');
      setPassValid(false);
    }

    if (value.length < 8) {
      setVal1Item('close-circle-sharp');
      setVal1Color(theme.brandColor.iconn_error);
      setPasswordError('1');
      setPassValid(false);
    } else {
      setVal1Item('checkmark-circle-sharp');
      setVal1Color(theme.brandColor.iconn_success);
    }

    if (!value.match(/[A-Z]/)) {
      setVal2Item('close-circle-sharp');
      setVal2Color(theme.brandColor.iconn_error);
      setPasswordError('1');
      setPassValid(false);
    } else {
      setVal2Item('checkmark-circle-sharp');
      setVal2Color(theme.brandColor.iconn_success);
      setPasswordError('1');
      setPassValid(false);
    }

    if (!value.match(/[a-z]/)) {
      setVal3Item('close-circle-sharp');
      setVal3Color(theme.brandColor.iconn_error);
      setPasswordError('1');
      setPassValid(false);
    } else {
      setVal3Item('checkmark-circle-sharp');
      setVal3Color(theme.brandColor.iconn_success);
    }

    if (!value.match(/\d/)) {
      setVal4Item('close-circle-sharp');
      setVal4Color(theme.brandColor.iconn_error);
      setPasswordError('1');
      setPassValid(false);
    } else {
      setVal4Item('checkmark-circle-sharp');
      setVal4Color(theme.brandColor.iconn_success);
    }

    if (!(value.length < 8) && value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/\d/) && !value.match(/\s/)) {
      setPasswordError('');
      setPassValid(true);
    }
  };

  const passRule: RegisterOptions = {
    validate: () => (passValid ? true : false)
  };

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextContainer typography="h2" fontBold text={`Crea tu contraseña`} fontSize={24} marginTop={hasNavigationTitle ? 0 : 30}></TextContainer>
      <TextContainer typography="h2" text={`Ingresa el código de 6 dígitos que enviamos a:`} marginTop={9} fontSize={17}></TextContainer>
      <Container row style={{ alignItems: 'center', marginTop: 12 }}>
        <Image style={{ height: 24, width: 24, marginRight: 8 }} source={ICONN_EMAIL} resizeMode="center" />
        <TextContainer typography="h4" fontBold text={email} textColor={theme.brandColor.iconn_green_original}></TextContainer>
      </Container>

      <TextContainer typography="h6" fontBold text={`Código de verificación`} marginTop={35} />
      <Input
        {...register('code')}
        name="code"
        control={control}
        autoCorrect={false}
        placeholder={`6 dígitos`}
        blurOnSubmit
        onChangeText={() => {}}
        maxLength={30}
        keyboardType="numeric"
        ref={codeRef}
        error={errors.code?.message}
        rules={{
          required: {
            value: true,
            message: `Campo requerido.`
          },
          minLength: {
            value: 6,
            message: `Mínimo 6 valores`
          },
          maxLength: {
            value: 6,
            message: `Máximo 6 valores`
          }
        }}
      />
      <TextContainer typography="h6" fontBold text={`Crear contraseña`} marginTop={24} />
      <Input
        {...register('password')}
        name="password"
        control={control}
        autoComplete="password"
        autoCorrect={false}
        passwordField
        placeholder={`Ingresa tu contraseña`}
        blurOnSubmit
        error={passwordError}
        showPasswordEnable
        onChangeText={validatePassword}
        maxLength={30}
        rules={passRule}
      />

      <Container>
        <Container flex row center style={{ marginTop: 34 }}>
          <Ionicons name={val1Item} size={24} color={val1Color} />
          <TextContainer text="Mínimo 8 caracteres" typography="h5" marginLeft={10} />
        </Container>
        <Container flex row center style={{ marginTop: 10 }}>
          <Ionicons name={val2Item} size={24} color={val2Color} />
          <TextContainer text="Contiene una letra mayúscula" typography="h5" marginLeft={10} />
        </Container>
        <Container flex row center style={{ marginTop: 10 }}>
          <Ionicons name={val3Item} size={24} color={val3Color} />
          <TextContainer text="Contiene una letra minúscula" typography="h5" marginLeft={10} />
        </Container>
        <Container flex row center style={{ marginTop: 10 }}>
          <Ionicons name={val4Item} size={24} color={val4Color} />
          <TextContainer text="Contiene un número" typography="h5" marginLeft={10} />
        </Container>
      </Container>

      <Container flex row crossAlignment="end" space="between">
        <ActionButton size="large" onPress={goBack} color="iconn_med_grey" icon={<AntDesign name="arrowleft" size={24} color={theme.fontColor.dark} />} />

        <Button
          length="short"
          round
          disabled={!isValid}
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          rightIcon={<AntDesign name="arrowright" size={24} color="white" />}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default CreatePasswordScreen;
