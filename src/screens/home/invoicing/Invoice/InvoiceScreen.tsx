import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, Button, Container, CardBilling } from 'components';
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
      <TextContainer typography="h2" fontBold text="Datos fiscales" marginTop={20} marginBottom={8} />
      <Container backgroundColor={theme.brandColor.iconn_white} height={90} style={{ paddingHorizontal: 16, borderTopStartRadius: 8, borderTopEndRadius: 8, marginTop: 4 }}>
        <Button
          length="long"
          round
          disabled={!isValid}
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          marginTop={16}
        >
          Crear perfil fiscal
        </Button>
      </Container>
      <Container backgroundColor={'#DDE8F3'} center crossCenter height={58} style={{ borderBottomEndRadius: 8, borderBottomStartRadius: 8}}>
        <TextContainer text='Deberás verificar tu correo para facturar.' />
      </Container>
      <Container style={{ marginTop: 34 }} >
        <TextContainer text='Nueva Factura' typography='h3' fontBold />
      </Container>
      <Container style={{ marginTop: 18 }}>
        <CardBilling text='Facturar ticket' type='seven' disable={false} onPress={() => { }} />
      </Container>
      <Container style={{ marginTop: 8 }}>
        <CardBilling text='Facturar ticket' type='petro' disable={false} onPress={() => { }} />
      </Container>
    </ScrollView>
  );
};

export default InvoiceScreen;
