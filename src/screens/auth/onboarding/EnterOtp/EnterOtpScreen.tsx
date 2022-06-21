import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container } from 'components/atoms/Container';
import { Button } from 'components/molecules/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Code } from 'components/molecules/Code';
import { ICONN_EMAIL } from 'assets/images';

interface Props {
  onSubmit: (code: string) => void;
  goBack: () => void;
}

const EnterOtpScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();
  const verificationCodeSecondsIntervalValue = 5;
  const [code, setCode] = useState('');
  const [disableAction, setDisableAction] = useState(true);
  const [verificationCodeIntervalId, setVerificationCodeIntervalId] =
    useState(0);
  const [timeleft, setTimeleft] = useState('00:00');
  const [isCodeError, setIsCodeError] = useState(false);

  const codding = (c: string) => {
    setCode(c);
  };

  const { handleSubmit } = useForm();

  useEffect(() => {
    startInterval();
  }, []);

  const startInterval = () => {
    setIsCodeError(false);
    setDisableAction(true);
    let enabledTimeInSeconds = verificationCodeSecondsIntervalValue;

    const currentIntervalId = setInterval(() => {
      const stateIntervalId = verificationCodeIntervalId;
      enabledTimeInSeconds -= 1;
      if (
        (stateIntervalId && stateIntervalId !== Number(currentIntervalId)) ||
        enabledTimeInSeconds < 0
      ) {
        clearInterval(currentIntervalId);
        setVerificationCodeIntervalId(0);
        setTimeleft('');
        setDisableAction(false);
        setIsCodeError(true);
        return;
      }

      setTimeleft(enabledTimeInSeconds.toString());
    }, 1000);

    setVerificationCodeIntervalId(Number(currentIntervalId));
    setTimeleft(enabledTimeInSeconds.toString());
  };

  const submit: SubmitHandler<FieldValues> = () => {
    onSubmit(code);
  };

  const onResendCode = (): any => {
    startInterval();
    // again we call endpoint to request new otp
  };

  // TODO: isPasswordChangedCodeError: this value should change with the response of the otp validation endpoint and if otp is invalid,
  // then isPasswordChangedCodeError should be true to show label error and labelAction.
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
          text={`Ingresa el código de 6 \ndigitos quen enviamos a:`}
          marginTop={34}
          marginBottom={11}
        />

        <Container flex row>
          <Image
            source={ICONN_EMAIL}
            resizeMode="center"
            style={{ width: 28, height: 28, marginRight: 8 }}
          />
          <TextContainer
            typography="h4"
            fontBold
            text={`mariano.martinez@citi.com.mx`}
            textColor={theme.brandColor.iconn_green_original}
          ></TextContainer>
        </Container>

        <Code
          label=""
          error={isCodeError}
          caption="Código incorrecto"
          disable={false}
          disabledAction={disableAction}
          lengthInput={6}
          secureTextEntry={false}
          labelAction={timeleft}
          onChangeText={c => codding(c)}
          onPressAction={() => onResendCode()}
        />
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
          disabled={code.length < 6}
        >
          Siguiente
        </Button>
      </Container>
    </ScrollView>
  );
};

export default EnterOtpScreen;
