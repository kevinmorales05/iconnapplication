import { Button, Container, CustomText, DatePicker, Input, Select, TextContainer, Touchable } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleProp, TextInput, TouchableOpacity, ViewStyle, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ICONN_DELETE_SHOPPING_CART_ITEM } from 'assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import theme from 'components/theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { RootState, useAppSelector } from 'rtk';
import moment from 'moment';
import { mobilePhoneRule, alphabetRule } from 'utils/rules';
import { formatDate } from 'utils/functions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../navigation/types';

type Props = {
  onSubmit: (data: FieldValues) => void;
  onLogout: () => void;
  goBack?: () => void;
  onPress?: () => void;
  editIconStyle?: StyleProp<ViewStyle>;
  goToChangePwd: () => void;
};

const ProfileScreen: React.FC<Props> = ({ onSubmit, goToChangePwd }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email, name, telephone, gender, birthday, lastName } = user;
  const insets = useSafeAreaInsets();
  const actualDate = new Date();
  const gendersOptions = ['Selecciona', 'Femenino', 'Masculino'];

  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    unregister,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const populateForm = () => {
    setValue('name', name);
    setValue('lastName', lastName);
    setValue('telephone', telephone);
    setValue('email', email);
    setValue('gender', gender);
    setValue('birthday', formatDate(moment(birthday).toDate()));
  };

  useEffect(() => {
    populateForm();
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      populateForm();
    }
  }, []);

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
        <TextContainer typography="h6" fontBold text={'Nombre(s)'} marginTop={0} />

        <Input
          {...register('name')}
          ref={nameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder="Nombre"
          maxLength={30}
          blurOnSubmit={true}
          rules={alphabetRule(true)}
          error={errors.name?.message}
          onSubmitEditing={() => surnameRef.current?.focus()}
        />

        <TextContainer typography="h6" fontBold text={'Apellido(s)'} marginTop={21} />

        <Input
          {...register('lastName')}
          ref={surnameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder="Apellidos"
          maxLength={30}
          rules={alphabetRule(true)}
          blurOnSubmit={true}
          onSubmitEditing={() => phoneRef.current?.focus()}
          error={errors.lastName?.message}
        />

        <TextContainer typography="h6" fontBold text={'Correo electrónico'} marginTop={21} />
        <Input {...register('email')} editable={false} control={control} autoCorrect autoCapitalize="words" keyboardType="default" />

        <TextContainer typography="h6" fontBold text={'Contraseña'} marginTop={21} />

        <Container row center crossCenter space="between" style={{ marginTop: 10 }}>
          <CustomText fontBold typography="dot" text={'••••••••'} textColor={theme.brandColor.iconn_dark_grey} />
          {
            <TouchableOpacity onPress={goToChangePwd}>
              <Container row center crossCenter>
                <Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_accent_secondary} style={{ marginRight: 5 }} />
                <CustomText text={'Editar'} typography="h6" />
              </Container>
            </TouchableOpacity>
          }
        </Container>

        <TextContainer typography="h6" fontBold text={'Celular'} marginTop={24} />
        <Input
          name="telephone"
          ref={phoneRef}
          control={control}
          keyboardType="number-pad"
          placeholder={'10 digitos'}
          blurOnSubmit={true}
          error={errors.telephone?.message}
          maxLength={10}
          onFocus={t => {
            if (t) {
              register('telephone', mobilePhoneRule(false));
              trigger('telephone');
            } else {
              register('telephone', mobilePhoneRule(false));
              trigger('telephone');
            }
          }}
          onChangeText={t => {
            if (t.length === 0) {
              unregister('telephone');
            }
          }}
        />

        <TextContainer typography="h6" fontBold text={'Fecha de nacimiento'} marginTop={21} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          locale="es"
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={theme.brandColor.iconn_accent_principal}
          maximumDate={actualDate}
        />
        <Touchable onPress={showDatePicker}>
          <DatePicker name="birthday" control={control} error={errors.birthday?.message} />
        </Touchable>

        <TextContainer typography="h6" fontBold text={'Género'} marginTop={21} />

        <Select
          name="gender"
          control={control}
          options={gendersOptions}
          onSelect={value => {
            if (value === 'Selecciona') {
              setValue('gender', null);
            } else {
              setValue('gender', value);
            }
          }}
          androidMode="dialog"
          placeholder="Selecciona"
        />
        <Button length="long" disabled={!isValid} round onPress={handleSubmit(submit)} fontSize="h4" fontBold marginTop={32}>
          Guardar
        </Button>
        {Platform.OS === 'ios' ? (
          <Button
            length="long"
            fontColor="dark"
            fontSize="h5"
            round
            fontBold
            leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} style={{ width: 18, height: 18, marginRight: 0 }} />}
            borderColor="iconn_grey"
            style={{ marginTop: 8, marginBottom: 5, backgroundColor: theme.brandColor.iconn_white, height: 50, borderRadius: 10 }}
            onPress={() => {
              navigate('DeleteAccount');
            }}
          >
            Eliminar cuenta
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </ScrollView>
  );
};

export default ProfileScreen;
