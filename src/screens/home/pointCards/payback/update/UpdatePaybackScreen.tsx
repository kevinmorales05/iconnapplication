import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Image } from 'react-native';
import { TextContainer, Container, Button, Touchable } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PAYBACK_MAIN, CARD_PETRO, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { Input } from '../../../../../components/atoms';
import InformationModalController from '../information/InformationModalController';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../navigation/types';
import { CrudType } from '../../../../../components/types/crud-type';
import Icon from 'react-native-vector-icons/AntDesign';
import { numericWithSpecificLenght } from 'utils/rules';

interface Props {
  onPressScan: () => void;
  onSubmit: (data: FieldValues) => void;
  paybackCardToUpdate: string;
  mode: CrudType;
  cardId: string;
  barcodeFromScan: string;
}

const UpdatePaybackScreen: React.FC<Props> = ({ onPressScan, onSubmit, paybackCardToUpdate, mode, cardId, barcodeFromScan }) => {
  let initalButtonValue = false;
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [paybackCard, setPaybackCard] = useState(paybackCardToUpdate);
  const [visible, setVisible] = useState<boolean>(false);
  const [paybackStatus, setPaybackStatus] = useState(0);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    setValue,
    trigger,
    getValues
  } = useForm({
    mode: 'onChange'
  });

  if (barcodeFromScan != undefined) {
    setValue('barcodeNumberToUpdate', barcodeFromScan.ticketNo);
    if (barcodeFromScan.ticketNo.length == 13) {
      initalButtonValue = true;
    }
  }

  const [disableButton, setDisableButton] = useState(initalButtonValue);

  const barcodeNumberToUpdate = useRef<TextInput>(null);

  const updateButtonStatus = () => {
    setDisableButton(getValues('barcodeNumberToUpdate')?.length != 13);
    setPaybackCard(getValues('barcodeNumberToUpdates'));
  };

  useEffect(() => {}, [disableButton, paybackCard]);

  const populateForUpdate = () => {
    setValue('barcodeNumberToUpdate', paybackCard);
    trigger('barcodeNumberToUpdate');
  };

  useEffect(() => {
    if (mode === 'create') {
      //resetForm();
    } else if (mode === 'update') {
      populateForUpdate();
    }
  }, [mode]);

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
    setPaybackCard(fields.barcodeNumberToUpdate);
    setPaybackStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });
    navigate('Payback', { addOrShow: 1, cardNumberToShow: cardId, cardNumber: fields.barcodeNumberToUpdate });
  };

  const hideInformationModal = () => {
    setVisible(false);
  };

  const showInformationModal = () => {
    setVisible(true);
  };

  const goToModalHelp = () => {
    showInformationModal();
  };

  const addPayback = (
    <Container style={{ paddingHorizontal: moderateScale(15) }}>
      <Container center>
        <Image source={ICONN_PAYBACK_MAIN} style={{ width: moderateScale(280), height: moderateScale(138) }} />
      </Container>
      <Container center style={{ width: '100%', marginTop: moderateScale(15) }}>
        <TextContainer marginTop={8} fontSize={14} text={'Ingresa el número bajo el código de barras de tu tarjeta PAYBACK.'} />
      </Container>
      <Container center row style={{ marginTop: 40, width: '100%' }}>
        <TextContainer typography="h6" fontBold text={'Número de código de barras'} marginRight={8} marginTop={4} />
        <Touchable onPress={goToModalHelp}>
          <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
        </Touchable>
      </Container>
      <Container center style={{ height: 70, width: '100%' }}>
        <Input
          {...register('barcodeNumberToUpdate')}
          name="barcodeNumberToUpdate"
          ref={barcodeNumberToUpdate}
          control={control}
          autoCorrect={false}
          keyboardType="numeric"
          marginTop={2}
          placeholder={'13 dígitos'}
          blurOnSubmit={true}
          error={errors.barcodeNumberToUpdate?.message}
          boldLabel
          maxLength={13}
          onSubmitEditing={() => barcodeNumberToUpdate.current?.focus()}
          onChangeText={updateButtonStatus}
          onPressScan={onPressScan}
          rules={numericWithSpecificLenght(13)}
          scanIcon={true}
        />
      </Container>
      <Container style={{ width: '100%', alignItems: 'center', marginTop: verticalScale(250) }}>
        <Container style={{ width: '100%' }}>
          <Button length="long" fontSize="h5" round fontBold onPress={handleSubmit(submit)} disabled={!isValid}>
            Guardar
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const addedPayback = (
    <Container>
      <Container center>
        <Image source={CARD_PETRO} style={{ width: moderateScale(264), height: moderateScale(164) }} />
      </Container>
      <Container style={{ width: '100%', height: '100%', backgroundColor: theme.brandColor.iconn_white }}>
        <Container center>
          <TextContainer marginTop={20} marginBottom={24} fontSize={14} text={'Muestra el código de barras antes de pagar'} />
        </Container>
        <Barcode
          format="CODE128B"
          value={paybackCard}
          text={paybackCard}
          height={moderateScale(168)}
          textStyle={{ fontWeight: 'bold', color: theme.fontColor.dark, marginTop: -19, backgroundColor: theme.brandColor.iconn_white, fontSize: 14 }}
          maxWidth={167}
        />
        <Container center>
          <Container style={{ width: '90%', marginTop: 150 }}>
            <Button
              fontSize="h4"
              fontBold
              outline
              round
              color="iconn_green_original"
              length="long"
              style={{ borderColor: `${theme.brandColor.iconn_green_original}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
              leftIcon={<Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_green_original} style={{ marginRight: 5 }} />}
            >
              Editar
            </Button>
            <Button
              fontSize="h4"
              fontBold
              outline
              round
              color="black"
              length="long"
              style={{ borderColor: `${theme.brandColor.iconn_med_grey}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
              leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} style={{ tintColor: 'red', height: 20, width: 20 }} />}
              marginTop={20}
            >
              Eliminar
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
      {paybackStatus == 0 ? addPayback : paybackStatus == 1 ? addedPayback : <></>}
      <InformationModalController onPressClose={hideInformationModal} visible={visible} />
    </Container>
  );
};

export default UpdatePaybackScreen;
