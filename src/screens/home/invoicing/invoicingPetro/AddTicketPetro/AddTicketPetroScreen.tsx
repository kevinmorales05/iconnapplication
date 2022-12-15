import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input, DatePicker } from 'components';
import theme from 'components/theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ICONN_INVOICING_PETRO } from 'assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useForm } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { alphaNumeric, date, numericWithSpecificLenght } from 'utils/rules';
import { useIsFocused } from '@react-navigation/native';
import { InvoicingPetroTicketResponseInterface } from 'rtk';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  onPressQuestionButton: () => void;
  onPressScan: () => void;
  ticket?: InvoicingPetroTicketResponseInterface;
  position?: number;
}

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    right: 0
  }
});

const AddTicketPetroScreen: React.FC<Props> = ({ onSubmit, goBack, onPressQuestionButton, ticket, position }) => {
  const { closeContainer } = styles;
  const insets = useSafeAreaInsets();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
  const folioRef = useRef<TextInput>(null);
  const webIdRef = useRef<TextInput>(null);
  const ticketDateRef = useRef<TextInput>(null);
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
    setValue('station', ticket?.station);
    setValue('folio', ticket?.ticketNo);
    setValue('webId', ticket?.webId);
    setValue('ticketDate', moment(ticket?.date).format('DD/MM/YYYY'));
    trigger('station');
    trigger('folio');
    trigger('webId');
    trigger('ticketDate');
    if (stationRef.current) stationRef.current.focus();
  };

  useEffect(() => {
    if (isFocused && !ticket && !position) resetForm();
    else populateForm();
  }, [ticket]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setValue('ticketDate', moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
    trigger('ticketDate');
  };

  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top }} crossCenter>
        <CustomText text="Agregar Ticket" typography="h3" fontBold textAlign="center" />
        <Container style={closeContainer}>
          <Touchable onPress={goBack} rounded>
            <AntDesign name="close" size={24} color="black" />
          </Touchable>
        </Container>
      </Container>
      <ScrollView
        bounces={false}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container flex space="between">
          <Container>
            <Image source={ICONN_INVOICING_PETRO} style={{ width: 88, height: 37, marginTop: 20, alignSelf: 'center' }} />

            <TextContainer
              text={`Es necesario que la estación y la forma de pago de los\ntickets sean iguales para facturar.`}
              typography="description"
              marginTop={24}
              textColor={theme.fontColor.grey}
              textAlign="center"
            />

            <Touchable onPress={onPressQuestionButton} marginTop={8}>
              <MaterialIcons name="help" size={28} color={theme.brandColor.iconn_accent_secondary} style={{ alignSelf: 'center' }} />
            </Touchable>
            <Input
              {...register('station')}
              name="station"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`Número de estación`}
              blurOnSubmit={true}
              marginTop={26}
              ref={stationRef}
              label="Estación"
              boldLabel
              maxLength={4}
              numeric
              onSubmitEditing={() => folioRef.current?.focus()}
              rules={numericWithSpecificLenght(4)}
              error={errors.station?.message}
            />

            <Input
              {...register('folio')}
              name="folio"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`7 dígitos`}
              blurOnSubmit={true}
              marginTop={21}
              ref={folioRef}
              label="Folio"
              boldLabel
              maxLength={7}
              numeric
              onSubmitEditing={() => webIdRef.current?.focus()}
              rules={numericWithSpecificLenght(6)}
              error={errors.folio?.message}
            />

            <Input
              {...register('webId')}
              name="webId"
              control={control}
              autoCorrect={false}
              keyboardType="default"
              placeholder={`4 dígitos`}
              blurOnSubmit={true}
              marginTop={21}
              ref={webIdRef}
              label="Web ID"
              boldLabel
              maxLength={4}
              rules={alphaNumeric(4)}
              error={errors.webId?.message}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              textColor={theme.brandColor.iconn_accent_principal}
            />

            <DatePicker
              {...register('ticketDate')}
              name="ticketDate"
              control={control}
              autoCorrect={false}
              keyboardType="default"
              placeholder="dd/mm/aaaa"
              blurOnSubmit={true}
              marginTop={21}
              ref={ticketDateRef}
              label="Fecha del ticket"
              boldLabel
              onPressDatePickerIcon={showDatePicker}
              maxLength={10}
              rules={date}
              error={errors.ticketDate?.message}
            />
          </Container>
          <Container style={{ marginBottom: 16 }}>
            <Button disabled={!isValid} marginTop={16} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
              + Agregar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default AddTicketPetroScreen;
