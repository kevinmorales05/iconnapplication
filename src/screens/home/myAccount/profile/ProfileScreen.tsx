import { Button, Container, CustomText, DatePicker, Input, Select, TextContainer, SafeArea, CountryCodeSelect } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleProp, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import theme from 'components/theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { GENDERS } from 'assets/files';
import { RootState, useAppSelector } from 'rtk';
import * as PhotosPicker from '../../../../components/organisms/PhotosPicker/PhotosPicker';
import moment from 'moment';
import countries from 'assets/files/countries.json';
import { formatDate } from 'utils/functions';

type Props = {
  onSubmit: (data: FieldValues) => void;
  onLogout: () => void;
  goBack?: () => void;
  onPress?: () => void;
  editIconStyle?: StyleProp<ViewStyle>;
  goToChangePwd: () => void;
};

// TODO: please remove unused code.
const ProfileScreen: React.FC<Props> = ({ onSubmit, goToChangePwd }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email, firstName, homePhone, gender, birthDate, lastName } = user;
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState<string>();
  const [flag, setFlag] = useState<string>();
  const [mobilePhone, setMobilePhone] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  const newDate = (date: string) => {
    let formatDay = new Date(date);
    let help: string = formatDate(formatDay).toString();
    return help;
  };

  // storage bucket folder
  const bucketPath = `userPhotos/${user.accountId}/profile/`;

  const { currentPhoto, launch } = PhotosPicker.usePhotosPicker(1, bucketPath, () => {
    setVisible(false);
  });

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const { name: nameField, lastName: lastNameField, telephone: telephoneField, gender:genderField, birthday:birthdayField} = watch();

  useEffect(() => {
    if (nameField && lastNameField) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameField, lastNameField]);

  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);

  const getCountryCode = () => {
    console.log({ mobilePhone });
    const countryC: any = countries.find(i => {
      const prefix = mobilePhone?.substring(i.code.length, 0);
      if (prefix === i.code) {
        setCode(prefix);
        setFlag(i.flag);
        const numberPhone = homePhone?.slice(prefix.length + 1);
        console.log('PHONENUMBER', numberPhone);
        setValue('telephone', numberPhone);
        return i;
      }
      //console.log('PREFIX', code)
    });
    console.log('country code', countryC);
    setValue('countryCode', countryC);
    setValue('countryFlag', countryC);
  };

  /* useEffect(() => {
    setValue('countryFlag', paymentMethod ? PAYMENT_METHODS.find(i => i.id === paymentMethod)?.name : '');
  }, [PaymentMethod]); */

  useEffect(() => {
    setValue('name', firstName);
    setValue('lastName', lastName);
    setValue('countryCode', code);
    setValue('countryFlag', flag);
    if (homePhone) {
      const justPhone = homePhone.replace('+', '');
      //setMobilePhone(justPhone);
      setMobilePhone(justPhone);
    } else {
      setValue('telephone', '');
    }
    setValue('email', email);

    if (gender) {
      const previusGender = GENDERS.find(element => {
        return gender === element.id;
      });
      setValue('gender', previusGender?.name);
    }

    if (birthDate) {
      setValue('birthday', newDate(birthDate));
    }

    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    getCountryCode();
  }, [mobilePhone]);

  console.log('CODEP', code);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setValue('birthday', moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
    setDisabled(true);
  };

  const updateCode = (newCode: string) => {
    const newNew = newCode.split(' ', 3);
    setValue('countryCode', newNew[2]);
    setValue('countryFlag', newNew[0]);
    setCode(newNew[2]);
    setFlag(newNew[0]);
  };

  return (
    <ScrollView
      bounces={true}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        paddingTop: insets.top - 16
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container>
        <TextContainer typography="h6" fontBold text={`Nombre (s)`} marginTop={0} />

        <Input
          {...register('name')}
          name="name"
          ref={nameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          onChangeText={nameValue => setValue('name', nameValue)}
          maxLength={30}
        />

        <TextContainer typography="h6" fontBold text={`Apellido (s)`} marginTop={21} />

        <Input
          {...register('lastName')}
          ref={surnameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={lastName}
          maxLength={30}
        />

        <TextContainer typography="h6" fontBold text={`Correo electrónico`} marginTop={21} />
        <Input
          {...register('email')}
          editable={false}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={email}
          maxLength={30}
        />

        <TextContainer typography="h6" fontBold text={`Contraseña`} marginTop={21} />

        <Container row center crossCenter space="between" style={{ marginTop: 10 }}>
          <CustomText fontBold typography="dot" text={`••••••••`} textColor={theme.brandColor.iconn_dark_grey} />
          {
            <TouchableOpacity onPress={goToChangePwd}>
              <Container row center crossCenter>
                <Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_accent_secondary} style={{ marginRight: 5 }} />
                <CustomText text={'Editar'} typography="h6" />
              </Container>
            </TouchableOpacity>
          }
        </Container>

        <TextContainer typography="h6" fontBold text={`Celular`} marginTop={24} />
        {/*  <Select
          name="telephone"
          control={control}
          options={countries.map (item => item.flag + item.code)}
          onSelect={value => setValue('telephone', value)}
          androidMode="dialog"
          label={countries[135].code}
          placeholder={'10 dígitos'+ countries[133].flag}
        /> */}
        <Container row style={{ justifyContent: 'space-around', paddingHorizontal: 35 }}>
          <CountryCodeSelect
            name="countryFlag"
            control={control}
            options={countries.map(item => item.flag + ' ' + item.name + ' ' + item.code)}
            onSelect={value => {
              updateCode(value);
            }}
            androidMode="dialog"
            placeholder={flag}
          />
          <Input
            {...register('telephone')}
            ref={phoneRef}
            control={control}
            keyboardType="number-pad"
            placeholder={'10 digitos'}
            placeholderBold={code}
            blurOnSubmit={true}
            error={errors.telephone?.message}
            maxLength={10}
            phone
          />
        </Container>

        <TextContainer typography="h6" fontBold text={`Fecha de nacimiento`} marginTop={21} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          locale={'es-LA'}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={theme.brandColor.iconn_accent_principal}
        />

        <DatePicker name="birthday" control={control} onPressDatePickerIcon={showDatePicker} error={errors.birthday?.message} />

        <TextContainer typography="h6" fontBold text={`Género`} marginTop={21} />

        <Select
          name="gender"
          control={control}
          options={GENDERS.map(item => item.name)}
          onSelect={value => setValue('gender', value)}
          androidMode="dialog"
          placeholder={gender == null ? 'Selecciona' : gender == 'Femenino' ? 'Femenino' : 'Masculino'}
          placeholderTextColor={theme.fontColor.dark}
          error={errors.gender?.message}
        />
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          <PhotosPicker.PickerMode
            visible={visible}
            handleCamera={() => {
              launch(PhotosPicker.PhotosPickerMode.CAMERA);
            }}
            handleGallery={() => {
              launch(PhotosPicker.PhotosPickerMode.LIBRARY);
            }}
            onPressOut={() => {
              setVisible(false);
            }}
          />
        </SafeArea>
        <Button length="long" round disabled={disabled} onPress={handleSubmit(submit)} fontSize="h4" fontBold marginTop={32}>
          Guardar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default ProfileScreen;
