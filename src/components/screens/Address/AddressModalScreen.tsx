import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomModal, Container, Input, Select, CustomText, ActionButton } from '../../atoms';
import { Button, TextContainer } from '../../molecules';
import { ICONN_ADDRESS_FIND } from 'assets/images';
import { FieldValues, useForm } from 'react-hook-form';
import { alphaNumeric, numericWithSpecificLenght, openField } from 'utils/rules';
import { useIsFocused } from '@react-navigation/native';
import { Address } from 'rtk';
import { PAYMENT_METHODS } from 'assets/files';
import { CrudType } from '../../types/crud-type';
import theme from 'components/theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  address: Address;
  mode: CrudType;
  title: string;
  onSubmit: (address: FieldValues) => void;
  onPressEditAddress: (address: Address) => void;
  onPressDeleteAddress: (address: Address) => void;
  onPressClose: () => void;
}

const AddressModalScreen: React.FC<Props> = ({ visible, address, mode, title, onSubmit, onPressEditAddress, onPressDeleteAddress, onPressClose }) => {
  const insets = useSafeAreaInsets();
  const [PaymentMethod, setPaymentMethod] = useState<string>('01');
  const [checkedColor, setCheckedColor] = useState('iconn_med_grey');
  const [value, setCheckBoxValue] = useState(false);

  const changeColor = () => {
    setCheckBoxValue(!value);
    setCheckedColor('iconn_green_original');
    if (checkedColor === 'iconn_green_original') {
      setCheckedColor('iconn_med_grey');
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const stationRef = useRef<TextInput>(null);
  const streetAndNumberRef = useRef<TextInput>(null);
  const tagRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (stationRef.current) {
      stationRef.current.focus();
    }
  }, []);

  const resetForm = () => {
    reset({
      station: '',
      folio: '',
      webId: '',
      ticketDate: ''
    });
    if (stationRef.current) stationRef.current.focus();
  };

  const populateForm = () => {
    // setValue('station', ticket?.station);
    // setValue('folio', ticket?.ticketNo);
    // setValue('webId', ticket?.webId);
    // setValue('ticketDate', moment(ticket?.date).format('DD/MM/YYYY'));
    // trigger('station');
    // trigger('folio');
    // trigger('webId');
    // trigger('ticketDate');
    if (stationRef.current) stationRef.current.focus();
  };

  const { containerStyle } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onPressClose} animationType="slide">
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
            <Container />
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text={title} typography="h3" fontBold />
            </Container>
            <Container>
              <ActionButton
                style={{ marginTop: -6, shadowColor: 'none' }}
                icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                size="xxsmall"
                onPress={onPressClose}
                color="iconn_med_grey"
                circle
              />
            </Container>
          </Container>
          <ScrollView
            bounces={true}
            contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
            <Container flex>
              <Container>
                <Container row crossAlignment="end" space="between">
                  <Container style={{ width: '48%' }}>
                    <Input
                      {...register('postalCode')}
                      name="postalCode"
                      control={control}
                      autoCorrect={false}
                      keyboardType="numeric"
                      placeholder={`Código Postal`}
                      blurOnSubmit={true}
                      ref={stationRef}
                      label="Código Postal"
                      boldLabel
                      maxLength={5}
                      numeric
                      onSubmitEditing={() => streetAndNumberRef.current?.focus()}
                      rules={numericWithSpecificLenght(5)}
                      error={errors.postalCode}
                    />
                  </Container>
                  <Container style={{ width: '48%' }}>
                    <Button
                      icon={<Image source={ICONN_ADDRESS_FIND} resizeMode="cover" style={{ width: 28, height: 28 }} />}
                      round
                      fontBold
                      fontSize="h4"
                      onPress={() => {}}
                      color="iconn_med_grey"
                      fontColor="dark"
                    >
                      Validar
                    </Button>
                  </Container>
                </Container>

                <TextContainer typography="h5" fontBold text={`Estado / Provincia / Region`} marginTop={21} />
                <Select
                  name="state"
                  control={control}
                  rules={openField(1)}
                  options={PAYMENT_METHODS}
                  optionsIdField="id"
                  optionsValueField="name"
                  onSelect={value => {
                    if (typeof value === 'object') {
                      setPaymentMethod(value['id']);
                      setValue('state', value ? PAYMENT_METHODS.find(i => i.id === value['id'])?.name : '');
                    } else {
                      setPaymentMethod(value);
                      setValue('state', value ? PAYMENT_METHODS.find(i => i.id === value)?.name : '');
                    }
                    trigger('state');
                  }}
                  androidMode="dialog"
                  placeholder={`Selección`}
                  label="Selección"
                  disabled={false}
                />

                <TextContainer typography="h5" fontBold text={`Municipio, Ciudad o Delegación`} marginTop={21} />
                <Select
                  name="city"
                  control={control}
                  rules={openField(1)}
                  options={PAYMENT_METHODS}
                  optionsIdField="id"
                  optionsValueField="name"
                  onSelect={value => {
                    if (typeof value === 'object') {
                      setPaymentMethod(value['id']);
                      setValue('city', value ? PAYMENT_METHODS.find(i => i.id === value['id'])?.name : '');
                    } else {
                      setPaymentMethod(value);
                      setValue('city', value ? PAYMENT_METHODS.find(i => i.id === value)?.name : '');
                    }
                    trigger('city');
                  }}
                  androidMode="dialog"
                  placeholder={`Selección`}
                  label="Selección"
                  disabled={false}
                />

                <TextContainer typography="h5" fontBold text={`Colonia`} marginTop={21} />
                <Select
                  name="colony"
                  control={control}
                  rules={openField(1)}
                  options={PAYMENT_METHODS}
                  optionsIdField="id"
                  optionsValueField="name"
                  onSelect={value => {
                    if (typeof value === 'object') {
                      setPaymentMethod(value['id']);
                      setValue('colony', value ? PAYMENT_METHODS.find(i => i.id === value['id'])?.name : '');
                    } else {
                      setPaymentMethod(value);
                      setValue('colony', value ? PAYMENT_METHODS.find(i => i.id === value)?.name : '');
                    }
                    trigger('colony');
                  }}
                  androidMode="dialog"
                  placeholder={`Selección`}
                  label="Selección"
                  disabled={false}
                />

                <Input
                  {...register('streetAndNumber')}
                  name="streetAndNumber"
                  control={control}
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder={`Ej. Blvrd Acapulco #4056`}
                  blurOnSubmit={true}
                  marginTop={21}
                  ref={streetAndNumberRef}
                  label="Calle y número exterior"
                  boldLabel
                  maxLength={150}
                  onSubmitEditing={() => tagRef.current?.focus()}
                  rules={alphaNumeric(3)}
                  error={errors.streetAndNumber?.message}
                />

                <Input
                  {...register('tag')}
                  name="tag"
                  control={control}
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder={`Ej. Casa`}
                  blurOnSubmit={true}
                  marginTop={21}
                  ref={tagRef}
                  label="Etiqueta (opcional)"
                  boldLabel
                  maxLength={150}
                  rules={alphaNumeric(3)}
                  error={errors.tag?.message}
                />
              </Container>
              <Container>
                <Button disabled={!isValid} marginTop={16} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
                  Guardar
                </Button>
              </Container>
            </Container>
          </ScrollView>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16
  }
});

export default AddressModalScreen;
