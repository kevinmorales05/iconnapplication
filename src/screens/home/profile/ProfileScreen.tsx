import { Avatar, Container, CustomText, DatePicker, Input, TextContainer } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleProp, TextInput, ViewStyle } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { alphabetRule } from 'utils/rules';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

type Props = {
  goBack: () => void;
  onPress?: () => void;
  editIconStyle?: StyleProp<ViewStyle>;
}

const ProfileScreen: React.FC<Props> = ({ goBack }) => {
  const insets = useSafeAreaInsets();
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue
  } = useForm({
    mode: 'onChange'
  });

  const namesRef = useRef<TextInput>(null);
  const surnamesRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (namesRef.current) {
      namesRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const {
    fecha    
  } = watch();
  
  return (
    <ScrollView
      bounces={true}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >

      <Container style={{ marginTop: 25 }}>
        <Avatar
          source={{ uri: 'https://www.audi.com.mx/content/dam/nemo/models/a3/rs-3-limousine/my-2022/NeMo-Derivate-Startpage/stage/1080x1920-audi-rs-3-sedan-stage-mobile-RS3_2021_3182.jpg?imwidth=768' }}
          editable={true}
          onPress={() => {}}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Nombres`}
          marginTop={25}
        />

        <Input
          {...register('names')}
          ref={namesRef}
          control={control}
          autoComplete="name"
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={''}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          error={errors.names?.message}
          maxLength={30}
          renderErrorIcon={false}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Apellidos`}
          marginTop={21}
        />

        <Input
          {...register('surnames')}
          ref={surnamesRef}
          control={control}
          autoComplete="name"
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={''}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          error={errors.surnames?.message}
          maxLength={30}
          renderErrorIcon={false}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Correo electrónico`}
          marginTop={21}
        />

        <TextContainer text='mariano.martinez@citi.com.mx' typography='h5' textColor={theme.brandColor.iconn_grey} marginTop={19}/>

        <Container flex row style={{ marginTop: 10 }} center>
          <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />
          <CustomText
            textColor={theme.brandColor.iconn_green_original}
            text="Correo verificado"
            typography="h6"
            fontWeight='normal'
          />
        </Container>

        <TextContainer
          typography="h6"
          fontBold
          text={`Contraseña`}
          marginTop={21}
        />
        
        <Container row center crossCenter space='between' style={{marginTop:10}}>
          <CustomText
            fontBold
            typography='dot'
            text={`••••••••`}
            textColor={theme.brandColor.iconn_grey}
          />
          <Container row center crossCenter>
            <Octicons
              name="pencil"
              size={theme.avatarSize.xxxsmall}
              color={theme.brandColor.iconn_accent_secondary}
              onPress={() => {}}
              style={{marginRight:5}}
            />            
            <CustomText text={'Editar'} typography='h6'/>
          </Container>
        </Container>

        <TextContainer
          typography="h6"
          fontBold
          text={`Celular`}
          marginTop={34}
        />

        <Input
          {...register('phone')}
          ref={phoneRef}
          control={control}
          keyboardType="number-pad"
          placeholder={'000-000-0000'}
          blurOnSubmit={true}
          error={errors.phone?.message}
          maxLength={10}
          renderErrorIcon={false}
          phone
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Fecha de nacimiento`}
          marginTop={34}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DatePicker
          label='' name="fecha" control={control}
          onChangeText={({ value }) => {}}
          onPressDatePickerIcon={showDatePicker}
        />
      </Container>
    </ScrollView>
  )
}

export default ProfileScreen;
