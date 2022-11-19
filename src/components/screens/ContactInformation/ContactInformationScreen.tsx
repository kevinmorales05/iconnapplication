import React, { useEffect, useRef } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input } from 'components';
import theme from 'components/theme/theme';
import { useForm } from 'react-hook-form';
import { emailRules, alphabetRule } from 'utils/rules';
import { useIsFocused } from '@react-navigation/native';
import { AuthDataInterface, InvoicingSevenTicketResponseInterface } from 'rtk';
import InConstructionController from '../InConstruction/InConstructionController';
interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  user?: AuthDataInterface;
}

const ContactInformationScreen: React.FC<Props> = ({ onSubmit, goBack, user }) => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const emailRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const isFocused = useIsFocused();

  const resetForm = () => {
    reset({ email: '' });
    if (emailRef.current) emailRef.current.focus();
  };

  const populateForm = () => {
    setValue('email', user?.email);
    trigger('email');
    if (emailRef.current) emailRef.current.focus();
  };

  useEffect(() => {
    if (isFocused && !user) resetForm();
    else populateForm();
  }, [user]);

  return (
    <Container flex useKeyboard>
      <ScrollView
        bounces={false}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container flex space="between">
          <Container>
            <Input
              {...register('email')}
              name="email"
              label="Correo electrónico"
              boldLabel
              control={control}
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              blurOnSubmit={false}
              rules={emailRules}
              error={errors.email?.message}
              marginTop={36}
              ref={emailRef}
              editable={false}
            />
            <Input
              {...register('name')}
              ref={nameRef}
              name="name"
              label="Correo electrónico"
              boldLabel
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
              marginTop={24}
            />

            <Input
              {...register('lastName')}
              ref={lastNameRef}
              name="lastName"
              label="Apellido(s)"
              boldLabel
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

            <Input
              {...register('phone')}
              ref={lastNameRef}
              name="phone"
              label="Número de contacto"
              boldLabel
              control={control}
              autoCorrect
              keyboardType="numeric"
              placeholder={`Tu número de contacto`}
              rules={alphabetRule(true)}
              blurOnSubmit={false}
              error={errors.lastName?.message}
              marginTop={24}
              maxLength={30}
            />
            <TextContainer text="" />
          </Container>
          <Container>
            <Button disabled={!isValid} marginTop={16} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
              Continuar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

const temCons = ()=>{
  return  <InConstructionController />
}



// export default ContactInformationScreen;
export default temCons;
