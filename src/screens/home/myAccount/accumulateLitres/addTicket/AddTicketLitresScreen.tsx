import { ICONN_CARD_PETRO, ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';
import { Button, Container, DatePicker, Input, InvoicingHelper, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AddTicketLitresScreen: React.FC = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [helpVisible, setHelpVisible] = useState<boolean>(false);
  const actualDate = new Date();
  const insets = useSafeAreaInsets();
  const {
    control,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onChange'
  });

  const onPressOut = () => setHelpVisible(false);

  const onPressHelpIcon = () => setHelpVisible(true);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setValue('date', moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.brandColor.iconn_white }}
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container>
          <Image source={ICONN_CARD_PETRO} style={{ width: 88, height: 37, marginTop: 8, alignSelf: 'center' }} />
          <Touchable onPress={onPressHelpIcon}>
            <AntDesign name="questioncircle" size={24} style={{ alignSelf: 'center', marginTop: 14 }} />
          </Touchable>
        </Container>
        <Button
          onPress={() => {}}
          color="iconn_white"
          fontColor="light_green"
          fontBold
          fontSize="h4"
          borderColor="iconn_green_original"
          round
          style={{ marginHorizontal: 16 }}
          icon={<MaterialCommunityIcons name="line-scan" size={24} color={theme.brandColor.iconn_green_original} />}
        >
          Escanear ticket
        </Button>
        <Container center crossCenter row>
          <Container flex backgroundColor={theme.brandColor.iconn_light_grey} height={1} style={{ marginLeft: 30 }} />
          <TextContainer text="O captura" fontSize={14} marginHorizontal={14} />
          <Container flex backgroundColor={theme.brandColor.iconn_light_grey} height={1} width={50} style={{ marginRight: 30 }} />
        </Container>
        <Container style={{ marginHorizontal: 16 }}>
          <TextContainer text="Estación" fontWeight="800" fontSize={12} />
          <Input name="station" control={control} placeholder="Nombre o número de estación" />
          <TextContainer text="Folio" fontWeight="800" marginTop={21} fontSize={12} />
          <Input name="invoiceNumber" control={control} placeholder="6 dígitos" />
          <TextContainer text="Web ID" fontWeight="800" marginTop={21} fontSize={12} />
          <Input name="webId" control={control} placeholder="4 dígitos" />
          <TextContainer text="Fecha del ticket" fontWeight="800" marginTop={21} fontSize={12} />
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
        </Container>
        <Button disabled round fontBold fontSize="h4" marginLeft={16} marginRight={16} marginBottom={30} onPress={() => []}>
          + Agregar
        </Button>
      </Container>
      <InvoicingHelper
        img={ICONN_INVOICING_PETRO_REFERENCE}
        message="Puedes encontrar la estación, folio y el web ID del ticket a facturar en tu comprobante físico."
        onPressOut={onPressOut}
        onUnderstood={onPressOut}
        visible={helpVisible}
      />
    </ScrollView>
  );
};

export default AddTicketLitresScreen;
