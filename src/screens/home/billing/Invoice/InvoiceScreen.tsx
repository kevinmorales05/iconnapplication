import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, Button, Container } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { emailRules } from 'utils/rules';

interface Props {
  title: string;
  onSubmit: (email: string) => void;
  goBack: () => void;
  onPressInfo: () => void;
}

const InvoiceScreen: React.FC<Props> = ({ title, onSubmit, goBack, onPressInfo }) => {
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
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16
      }}
    >
      <TextContainer typography="h2" fontBold text="Datos fiscales" marginTop={34} marginBottom={8} />

      <Container backgroundColor={theme.brandColor.iconn_white} height={80} style={{paddingHorizontal:16}}>
        <Button
          length="long"
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
      <Container backgroundColor={theme.brandColor.iconn_info} center crossCenter>
        <TextContainer  marginVertical={27} text='Deberás verificar tu correo para facturar.' />
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

export default InvoiceScreen;
