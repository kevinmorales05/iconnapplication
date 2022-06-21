import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Container } from 'components/atoms/Container';
import { Button } from 'components/molecules/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { alphabetRule } from 'utils/rules';

interface Props {
  onSubmit: (fullName: any) => void;
  goBack: () => void;
}

const EnterEmailScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const nameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
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
        text={`¿Cúal es tu nombre?`}
        marginTop={34}
      ></TextContainer>
      <TextContainer
        typography="h5"
        text={`Dinos cómo debemos llamarte`}
        marginTop={9}
      ></TextContainer>

      <Input
        {...register('name')}
        ref={nameRef}
        name="name"
        control={control}
        autoComplete="name"
        autoCorrect
        autoCapitalize="words"
        keyboardType="default"
        placeholder={`Tu nombre`}
        rules={alphabetRule(true)}
        blurOnSubmit={false}
        onSubmitEditing={() => lastNameRef.current?.focus()}
        error={errors.name?.message}
        maxLength={30}
      />

      <Input
        {...register('lastName')}
        ref={lastNameRef}
        name="lastName"
        control={control}
        autoComplete="name"
        autoCorrect
        autoCapitalize="words"
        keyboardType="default"
        placeholder={`Tu apellido`}
        rules={alphabetRule(true)}
        blurOnSubmit={false}
        error={errors.lastName?.message}
        marginTop={24}
        maxLength={30}
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

export default EnterEmailScreen;
