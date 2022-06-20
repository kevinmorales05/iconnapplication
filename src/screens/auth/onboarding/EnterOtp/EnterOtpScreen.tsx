import React, { useEffect, useState } from 'react';
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
import { Code } from 'components/molecules/Code';

interface Props {
  onSubmit: (email: string) => void;
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
  const [isCodeError, setIsCodeError] =
    useState(false);
  
  const codding = (c: string) => {
    setCode(c);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    startInterval();
  }, []);

  const { username } = watch();

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
      console.log(enabledTimeInSeconds.toString())
    }, 1000);

    setVerificationCodeIntervalId(Number(currentIntervalId));
    setTimeleft(enabledTimeInSeconds.toString());
    console.log(enabledTimeInSeconds.toString())
  };

  const submit: SubmitHandler<FieldValues> = (fields) => {
    console.log(fields.username);
    onSubmit(fields.username);
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
      <TextContainer typography='h2' fontBold text={`Ingresa el código de 6 \ndigitos quen enviamos a:`} marginTop={34}></TextContainer>
      <Code 
        label=''
        error={isCodeError}
        caption='Código incorrecto' 
        disable={false}
        disabledAction={disableAction}
        lengthInput={6}
        secureTextEntry={false}
        labelAction={timeleft}
        onChangeText={(c) => codding(c)}
        onPressAction={() => onResendCode()}
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

export default EnterOtpScreen;
