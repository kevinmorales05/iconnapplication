import React from 'react';
import { ScrollView } from 'react-native';
import { Container } from 'components/atoms/Container';
import { Button } from 'components/molecules/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { emailRules } from 'utils/rules';
import { ICONN_BINOMIO_LOGOS } from 'assets/images';

interface Props {
  onSubmit: (email: string) => void;
  goBack: () => void;
}

const CreatePasswordScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    register,
  } = useForm({
    mode: "onChange"
  });

  const { username } = watch();

  const submit: SubmitHandler<FieldValues> = (fields) => {
    console.log(fields.username);
    onSubmit(fields.username);
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
      <TextContainer typography='h2' fontBold text={`Ingresa tu dirección de \ncorreo electrónico`} marginTop={34}></TextContainer>
      <Input
        {...register('username')}
        name="username"
        control={control}
        autoComplete="username"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder={`Ingresa tu correo`}
        blurOnSubmit={false}
        rules={emailRules}
        error={errors.username?.message}
        marginTop={36}
        sufixOutIcon
      />
      <Container flex row crossAlignment="end" space="between">
        <ActionButton
          size="large"
          onPress={goBack}
          color="iconn_med_grey"
          icon={ <AntDesign name="arrowleft" size={24} color={theme.fontColor.dark} /> }
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

export default CreatePasswordScreen;
