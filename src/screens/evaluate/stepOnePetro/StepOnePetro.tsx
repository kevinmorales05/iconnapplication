import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Container, TextContainer, Button, Input, DatePicker, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { alphaNumeric, onlyNumericWithSpecificLenght } from 'utils/rules';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

import styles from './styles';
import moment from 'moment';
import { EvaluateServiceInterface } from 'components/types/StepsWallet';

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const StepOnePetro: React.FC<Props> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue
  } = useForm({
    mode: 'onChange'
  });

  const stationRef = useRef<TextInput>(null);
  const skuRef = useRef<TextInput>(null);
  const webIdRef = useRef<TextInput>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date: Date) => {
    setValue('dateTicket', moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const submit: SubmitHandler<FieldValues> = fields => {
    const dataSend: EvaluateServiceInterface = {
      establishment_id: 1,
      folio: fields.sku,
      station: fields.station,
      webid: fields.webId,
      date: fields.dateTicket
    };
    onSubmit(dataSend);
  };

  return (
    <Container style={styles.container}>
      {/* <Button
        length="long"
        outline
        icon={<ScanCodeSvg size={moderateScale(24)} />}
        round
        onPress={() => {}}
        fontSize="h4"
        fontBold
        marginTop={verticalScale(20)}
        borderWidth={moderateScale(2.5)}
      >
        Escanear ticket
      </Button>
      <Container style={styles.containerDiv}>
        <Container style={styles.containerStroke} />
        <TextContainer text="O captura" typography={'h5'} />
        <Container style={styles.containerStroke} />
      </Container> */}
      <Container>
        <TextContainer typography="h6" fontBold text={'Estación'} marginTop={moderateScale(5)} />
        <Input
          {...register('station')}
          ref={stationRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Nombre o número de estación"
          maxLength={30}
          blurOnSubmit={true}
          rules={alphaNumeric(4)}
          error={errors.station?.message}
          onSubmitEditing={() => skuRef.current?.focus()}
        />
        <TextContainer typography="h6" fontBold text={'Folio'} marginTop={moderateScale(25)} />
        <Input
          {...register('sku')}
          ref={skuRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="7 dígitos"
          maxLength={7}
          blurOnSubmit={true}
          rules={onlyNumericWithSpecificLenght(6)}
          error={errors.sku?.message}
          onSubmitEditing={() => webIdRef.current?.focus()}
        />
        <TextContainer typography="h6" fontBold text={'Web ID'} marginTop={moderateScale(25)} />
        <Input
          {...register('webId')}
          ref={webIdRef}
          control={control}
          autoCorrect
          autoCapitalize="none"
          keyboardType="default"
          placeholder="4 dígitos"
          maxLength={4}
          blurOnSubmit={true}
          rules={alphaNumeric(4)}
          error={errors.webId?.message}
        />
        <TextContainer typography="h6" fontBold text={'Fecha del ticket'} marginTop={moderateScale(25)} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          locale="es"
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={theme.brandColor.iconn_accent_principal}
        />
        <Touchable onPress={showDatePicker}>
          <DatePicker name="dateTicket" control={control} error={errors.dateTicket?.message} />
        </Touchable>
      </Container>
      <Button length="long" disabled={!isValid} round onPress={handleSubmit(submit)} fontSize="h4" fontBold marginTop={verticalScale(30)}>
        Validar
      </Button>
    </Container>
  );
};

export default StepOnePetro;
