import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Container } from 'components/atoms/Container';
import { Button } from 'components/molecules/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { emailRules } from 'utils/rules';

interface Props {
  onSubmit: (email: string) => void;
  goBack: () => void;
  onPressInfo: () => void;
}

const LoginScreen: React.FC<Props> = ({
  onSubmit,
  goBack,
  onPressInfo
}) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const emailRef = useRef<TextInput>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.email);
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
      <TextContainer
        typography="h2"
        fontBold
        text={`Ingresa tu dirección de \ncorreo electrónico`}
        marginTop={34}
      />
      <Input
        {...register('email')}
        name="email"
        control={control}
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder={`Ingresa tu correo`}
        blurOnSubmit={false}
        rules={emailRules}
        error={errors.email?.message}
        marginTop={36}
        sufixOutIcon
        ref={emailRef}
        onPressInfo={onPressInfo}
      />
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

export default LoginScreen