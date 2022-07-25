import { Image, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, TouchableText, Button, Container } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ICONN_EMAIL } from 'assets/images';
import React, { useEffect, useRef } from 'react';
import { passwordMinimumRule } from 'utils/rules';

interface Props {
  accountError?: string;
  onSubmit: (pass: string) => void;
  goBack: () => void;
  goToForgotPassword: () => void;
  email?: string;
}

const EnterPasswordScreen: React.FC<Props> = ({ accountError, onSubmit, goBack, goToForgotPassword, email }) => {
  const insets = useSafeAreaInsets();
  const { handleSubmit, register, control, formState:{ errors, isValid } } = useForm({ mode: 'onChange' });
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = (fields) => {
    onSubmit(fields.password);
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
      <Container>
        <TextContainer
          typography="h2"
          fontBold
          text={`¡Hola!`}
          marginTop={34}
        ></TextContainer>
        <TextContainer
          typography="h2"
          text={`Ingresa tu contraseña`}
          marginTop={4}
        ></TextContainer>

        <TextContainer
          typography="h5"
          text={`Cuenta vinculada al correo:`}
          textColor={theme.fontColor.paragraph}
          marginTop={25}
        ></TextContainer>
        <Container flex row>
          <Image
            source={ICONN_EMAIL}
            resizeMode="center"
            style={{ width: 28, height: 28, marginRight: 8, marginTop: 5 }}
          />
          <TextContainer
            typography="h4"
            fontBold
            marginTop={10}
            text={email}
            textColor={theme.brandColor.iconn_green_original}
          ></TextContainer>
        </Container>

        <Input
          {...register('password')}
          name="password"
          control={control}
          autoComplete="password"
          autoCorrect={false}
          passwordField
          placeholder={`Ingresa tu contraseña`}
          blurOnSubmit={false}
          marginTop={27}
          error={accountError ? accountError : errors.password?.message }
          ref={passwordRef}
          showPasswordEnable
          rules={passwordMinimumRule}
        />
        <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <TouchableText
            underline
            textColor={theme.fontColor.link}
            text="Olvidé mi contraseña"
            typography="h5"
            fontBold
            onPress={goToForgotPassword}
            marginTop={8}
          />
        </Container>
      </Container>
      <Container flex row crossAlignment="end" space="between">
        <ActionButton
          size="large"
          onPress={goBack}
          color="iconn_med_grey"
          icon={
            <AntDesign
              name="arrowleft"
              size={24}
              color={theme.fontColor.dark}
            />
          }
        />

        <Button
          length="short"
          round
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          rightIcon={<AntDesign name="arrowright" size={24} color="white" />}
          disabled={!isValid}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default EnterPasswordScreen;
