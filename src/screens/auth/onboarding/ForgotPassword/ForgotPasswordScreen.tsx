import React from 'react'
import { ICONN_EMAIL } from 'assets/images';
import { ActionButton, Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Image, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  onSubmit: (pass: string) => void;
  goBack: () => void;
  email?: string;
}

const ForgotPasswordScreen: React.FC<Props> = ({ onSubmit, goBack, email }) => {
  const insets = useSafeAreaInsets();
  const { handleSubmit } = useForm();

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
    >
      <Container flex>
        <TextContainer
          typography="h2"
          fontBold
          text={`Olvidé mi contraseña`}
          marginTop={34}
        ></TextContainer>
        <TextContainer
          typography="h5"
          text={`¡No te preocupes! Para recuperar tu contraseña \nte enviaremos un correo con instrucciones a:`}
          marginTop={28}
        ></TextContainer>
        <Image
          source={ICONN_EMAIL}
          resizeMode="center"
          style={{ width: 28, height: 28, marginRight: 8, marginTop: 26 }}
        />
        <TextContainer
          typography="h4"
          fontBold
          marginTop={10}
          text={email}
          textColor={theme.brandColor.iconn_green_original}
        ></TextContainer>
      </Container>

      <Container flex row crossAlignment="end" space="between">
        <ActionButton
          size="large"
          onPress={goBack}
          color="iconn_med_grey"
          icon={<AntDesign name="arrowleft" size={24} color={theme.fontColor.dark}/>}
        />

        <Button
          length="short"
          round
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8, width: 171 }}
          leftIcon={<Feather name="send" size={20} color="white" style={{ left: 10, marginTop: 5 }}/>}
        >
          Enviar correo
        </Button>
      </Container>
    </ScrollView>

  )
}


export default ForgotPasswordScreen