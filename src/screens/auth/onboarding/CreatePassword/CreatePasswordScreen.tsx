import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActionButton, Input, TextContainer, Button, Container } from 'components';
import theme from 'components/theme/theme';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { passwordRule } from 'utils/rules';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface Props {
  onSubmit: (email: string) => void;
  goBack: () => void;
}

const CreatePasswordScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.password);
  };

  const getColor = (level: number) => {
    console.log("errores password color",errors.password?.message)
    console.log("nivel color", level)
    if (parseInt(errors.password?.message) > level) {
      return theme.brandColor.iconn_success;
    } else if (parseInt(errors.password?.message) === level){
      return theme.brandColor.iconn_error;
    } else if (errors.password?.message === undefined) {      
      return theme.brandColor.iconn_success;
    } else {      
      return theme.brandColor.iconn_med_grey;
    }
  }

  const getIcon = (level: number) => {
      console.log("errores password  color",errors.password?.message)
      console.log("nivel number", level)
    if (parseInt(errors.password?.message) > level) {
      return 'check-circle';
    } else if (parseInt(errors.password?.message) === level){
      return 'times-circle';
    } else if (errors.password?.message === undefined) {
      return 'check-circle';
    } 
    else if(parseInt(errors.password.message) === 0) {

    }
    else {
      return 'circle';
    }
  }

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
        text={`Crea tu contraseña`}
        fontSize={24}
        marginTop={57}
      ></TextContainer>
      <TextContainer
        typography="h2"
        text={`Recuerda no compartirla.`}
        marginTop={9}
        fontSize={17}
        
      ></TextContainer>
      <Input
        {...register('password')}
        name="password"
        control={control}
        autoComplete="password"
        autoCorrect={false}
        passwordField
        placeholder={`Ingresa tu contraseña`}
        blurOnSubmit={false}
        marginTop={36}
        rules={passwordRule}
        error=''
        ref={passwordRef}
        showPasswordEnable 
        defaultValue={undefined}       
      />

      <Container>
        <Container flex row style={{marginTop:34}}>          
          <FontAwesome name={getIcon(2)} size={18} color={getColor(2)} />
          <TextContainer text='Mínimo 8 caracteres' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={getIcon(3)} size={18} color={getColor(3)} />
          <TextContainer text='Contiene una letra mayúscula' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={getIcon(4)} size={18} color={getColor(4)} />
          <TextContainer text='Contiene una letra minúscula' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={getIcon(5)} size={18} color={getColor(5)} />
          <TextContainer text='Contiene un número' typography='h5' marginLeft={10}/>
        </Container>
        <Container flex row style={{marginTop:11}}>
          <FontAwesome name={getIcon(6)} size={18} color={getColor(6)} />
          <TextContainer text='Contiene un caracter especial' typography='h5' marginLeft={10}/>
        </Container>
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
