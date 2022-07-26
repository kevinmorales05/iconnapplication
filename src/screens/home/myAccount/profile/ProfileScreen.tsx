import {
  Avatar,
  Button,
  Container,
  CustomText,
  DatePicker,
  Input,
  Select,
  TextContainer,
  SafeArea,
  Touchable
} from 'components';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { ScrollView, StyleProp, TextInput, TouchableOpacity, ViewStyle, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { alphabetRule } from 'utils/rules';
import theme from 'components/theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { GENDERS } from 'assets/files';
import { formatDate } from 'utils/functions';
import { RootState, useAppSelector } from 'rtk';
import * as PhotosPicker from '../../../../components/organisms/PhotosPicker/PhotosPicker';
import moment from 'moment';
import { NavigationContext } from '@react-navigation/native';

type Props = {
  onSubmit: (data: any) => void;
  onLogout: () => void;
  goBack?: () => void;
  onPress?: () => void;
  editIconStyle?: StyleProp<ViewStyle>;
};

const ProfileScreen: React.FC<Props> = ({ onSubmit }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { email, name, telephone, gender, birthday, lastName, sign_app_modes_id, photo } = user;
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const navigation = useContext(NavigationContext);

  // storage bucket folder
  const bucketPath = `userPhotos/${user.user_id}/profile/`;

  const { currentPhoto, launch } = PhotosPicker.usePhotosPicker(1, bucketPath,
    () => {
      setVisible(false)
    }
    );

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

  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  useEffect(() => {
    setValue('name', name );
    setValue('lastName', lastName );
    setValue('telephone', telephone );
    
    if (gender) {
      const previusGender = GENDERS.find(element => {
        return gender === element.id;
      });
      setValue('gender', previusGender?.name);
    }

    if(birthday){
      //the backend returns dates with YYY-MMM-DD format
      setValue('birthday',  moment(birthday, 'YYYY-MM-DD').format('DD/MM/YYYY'));
    }

    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setValue('birthday', formatDate(new Date(year, month, day), 'dd/MM/yyyy'));
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
        <Avatar
          source={{
            uri: photo ? photo : currentPhoto
          }}
          editable={true}
          onPress={() => {
            setVisible(true);
          }}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Nombres`}
          marginTop={25}
        />

        <Input
          {...register('name')}
          ref={nameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={''}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          error={errors.name?.message}
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
          {...register('lastName')}
          ref={surnameRef}
          control={control}
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          placeholder={''}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          error={errors.lastName?.message}
          maxLength={30}
          renderErrorIcon={false}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Correo electrónico`}
          marginTop={21}
        />
        <View style={{flex:1, flexDirection:"row"}}>
          <View style={{flex:3}}>
            <TextContainer
              text={email!}
              typography="h5"
              textColor={theme.brandColor.iconn_grey}
              marginTop={19}
            />

            <Container flex row style={{ marginTop: 10 }} center>
              <Icon
                name="checkcircle"
                size={18}
                color={theme.brandColor.iconn_success}
                style={{ marginRight: 5 }}
              />
              <CustomText
                textColor={theme.brandColor.iconn_green_original}
                text={
                  sign_app_modes_id === 1
                    ? 'Correo verificado'
                    : 'Correo verificado con red social'
                }
                typography="h6"
                fontWeight="normal"
              />
            </Container>
          </View>

          {sign_app_modes_id === 1 && <View style={{flex:3, marginTop:19}}>
            <Touchable onPress={() => {
              navigation?.navigate('Editar correo');
            }}>
              <Container row center style={{justifyContent :"flex-end"}}>
                <Octicons
                  name="pencil"
                  size={theme.avatarSize.xxxsmall}
                  color={theme.brandColor.iconn_accent_secondary}
                  style={{ marginRight: 5 }}
                />
                <CustomText text={'Editar'} typography="h6" />
              </Container>
            </Touchable>
          </View>}
        </View>

        <TextContainer
          typography="h6"
          fontBold
          text={`Contraseña`}
          marginTop={21}
        />

        <Container
          row
          center
          crossCenter
          space="between"
          style={{ marginTop: 10 }}
        >
          <CustomText
            fontBold
            typography="dot"
            text={`••••••••`}
            textColor={theme.brandColor.iconn_dark_grey}
          />
          {sign_app_modes_id === 1 && <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Editar Contraseña');
            }}
          >
            <Container row center crossCenter>
              <Octicons
                name="pencil"
                size={theme.avatarSize.xxxsmall}
                color={theme.brandColor.iconn_accent_secondary}
                style={{ marginRight: 5 }}
              />
              <CustomText text={'Editar'} typography="h6" />
            </Container>
          </TouchableOpacity>}
        </Container>

        <TextContainer
          typography="h6"
          fontBold
          text={`Celular`}
          marginTop={24}
        />

        <Input
          {...register('telephone',{required:"Campo requerido"})}
          ref={phoneRef}
          control={control}
          keyboardType="number-pad"
          placeholder={'000-000-0000'}
          blurOnSubmit={true}
          error={errors.telephone?.message}
          maxLength={10}
          renderErrorIcon={false}
          phone
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Fecha de nacimiento`}
          marginTop={21}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={theme.brandColor.iconn_accent_principal}
        />

        <DatePicker
          label=""
          name="birthday"
          control={control}
          onChangeText={({ value }) => {}}
          onPressDatePickerIcon={showDatePicker}
        />

        <TextContainer
          typography="h6"
          fontBold
          text={`Genero`}
          marginTop={21}
        />

        <Select
          name="gender"
          control={control}
          options={GENDERS.map(item => item.name)}
          onSelect={value => setValue('gender', value)}
          androidMode="dialog"
          label={`Genero`}
          placeholder={`Genero`}
          error={errors.gender?.message}
          useActionSheet
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
        <Button
          length="long"
          round
          disabled={false}
          onPress={handleSubmit(submit)}
          fontSize="h4"
          fontBold
          marginTop={32}
        >
          Guardar
        </Button>
      </Container>
    </ScrollView>
  );
};

export default ProfileScreen;
