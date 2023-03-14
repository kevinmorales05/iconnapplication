import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, TextContainer, Button, Container, Code } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ICONN_EMAIL } from 'assets/images';

interface Props {
  onSubmit: (code: string) => void;
  goBack: () => void;
  email?: string;
  wrongCode: boolean;
}

const EnterOtpScreen: React.FC<Props> = ({ onSubmit, goBack, email, wrongCode }) => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [isCodeError, setIsCodeError] = useState(false);

  const codding = (c: string) => {
    setCode(c);
  };

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (wrongCode === true) {
      setIsCodeError(true);
    }
  }, [wrongCode]);

  const submit: SubmitHandler<FieldValues> = () => {
    onSubmit(code);
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
        <TextContainer typography="h1" fontBold text={`Ingresa el código de 6 \ndígitos que enviamos a:`} marginTop={34} marginBottom={11} />

        <Container flex row>
          <Image source={ICONN_EMAIL} resizeMode="center" style={{ width: 28, height: 28, marginRight: 8 }} />
          <TextContainer typography="h4" fontBold text={email} textColor={theme.brandColor.iconn_green_original}></TextContainer>
        </Container>

        <Container>
          <Code
            label=""
            error={isCodeError}
            caption="Código incorrecto"
            disable={false}
            lengthInput={6}
            secureTextEntry={false}
            onChangeText={c => codding(c)}
            newCode={''}
          />
        </Container>
      </Container>

      <Container flex row crossAlignment="end" space="between">
        <ActionButton size="large" onPress={goBack} color="iconn_med_grey" icon={<AntDesign name="arrowleft" size={24} color={theme.fontColor.dark} />} />

        <Button
          length="short"
          round
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          rightIcon={<AntDesign name="arrowright" size={24} color="white" />}
          disabled={code.length < 6}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default EnterOtpScreen;
