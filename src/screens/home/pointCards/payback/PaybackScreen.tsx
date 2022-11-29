import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Image, Dimensions } from 'react-native';
import { TextContainer, Container, Button, Touchable } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PAYBACK_MAIN, CARD_PETRO, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { Input } from '../../../../components/atoms';
import InformationModalController from './information/InformationModalController';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../navigation/types';
import { numericWithSpecificLenght } from 'utils/rules';
import { vtexDocsServices } from 'services';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  onPressScan: () => void;
  addOrShow: number;
  cardNumberToShow: string;
  onSubmit: (data: FieldValues) => void;
  deleteCard: () => void;
  cardToUpdate: string;
  cardId: string;
  barcodeFromScan: string;
}

const PaybackScreen: React.FC<Props> = ({ onPressScan, addOrShow, cardNumberToShow, onSubmit, deleteCard, cardToUpdate, cardId, barcodeFromScan }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [paybackCard, setPaybackCard] = useState(barcodeFromScan != undefined ? barcodeFromScan : '0000000000');
  const toast = useToast();
  const [visible, setVisible] = useState<boolean>(false);
  const [paybackStatus, setPaybackStatus] = useState(addOrShow);
  const alert = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    setValue,
    getValues
  } = useForm({
    mode: 'onChange'
  });

  if (barcodeFromScan != undefined) {
    setValue('barcodeNumber', barcodeFromScan.ticketNo);
  }

  const barcodeNumber = useRef<TextInput>(null);

  const editPaybackCard = () => {
    navigate('UpdatePayback', { cardIdToUpdate: cardToUpdate, paybackCard: paybackCard, cardId: cardId });
  };

  const deletePointCard = () => {
    deleteCard();
    setTimeout(() => {
      toast.show({
        message: 'Tarjeta eliminada exitosamente.',
        type: 'success'
      });
      navigate('WalletHome');
    }, 250);
  };

  const updateButtonStatus = () => {
    setPaybackCard(getValues('barcodeNumber'));
  };

  const getPointCardById = async () => {
    setTimeout(async () => {
      const cardRetrieved = await vtexDocsServices.getDocByDocID('PC', cardId);
      if (cardRetrieved) {
        let { barCode } = cardRetrieved[0];
        setPaybackCard(barCode);
      }
    }, 250);
  };

  useEffect(() => {
    if (addOrShow === 1) {
      getPointCardById();
      setPaybackCard(addOrShow == 1 ? cardNumberToShow : '0000000000000');
    }
  }, [isValid, cardNumberToShow, barcodeFromScan]);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar Monedero PAYBACK',
        message: '¿Estás seguro que quieres eliminar el monedero con terminación ' + paybackCard.slice(paybackCard.length - 4) + '?',
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_light_grey',
        cancelTextColor: 'iconn_dark_grey',
        onAccept() {
          deletePointCard();
          alert.hide();
        },
        onCancel() {
          alert.hide('cancelar');
        }
      },
      'deleteCart',
      false,
      true
    );
  };

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
    setPaybackCard(fields.barcodeNumber);
    setPaybackStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });
  };

  const hideInformationModal = () => {
    setVisible(false);
  };

  const showInformationModal = () => {
    setVisible(true);
  };

  const goToHelp = () => {
    navigate('PaybackHelp');
  };

  const goToModalHelp = () => {
    showInformationModal();
  };

  const addPayback = (
    <Container style={{ paddingHorizontal: moderateScale(15) }}>
      <Container center>
        <Image source={ICONN_PAYBACK_MAIN} style={{ width: moderateScale(280), height: moderateScale(138) }} />
      </Container>
      <Container style={{ width: '100%', marginTop: moderateScale(15) }}>
        <TextContainer marginTop={8} fontSize={14} text={'Ingresa el número bajo el código de barras de tu tarjeta PAYBACK.'} />
      </Container>
      <Container center row style={{ marginTop: 40, width: '100%' }}>
        <TextContainer typography="h6" fontBold text={'Número de código de barras'} marginRight={8} marginTop={4} />
        <Touchable onPress={goToModalHelp}>
          <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
        </Touchable>
      </Container>
      <Container row center style={{ height: moderateScale(70), width: '100%' }}>
        <Input
          {...register('barcodeNumber')}
          name="barcodeNumber"
          ref={barcodeNumber}
          control={control}
          keyboardType="numeric"
          placeholder={'13 dígitos'}
          blurOnSubmit
          marginTop={2}
          error={errors.barcodeNumber?.message}
          maxLength={13}
          rules={numericWithSpecificLenght(13)}
          onChangeText={updateButtonStatus}
          onPressScan={onPressScan}
          scanIcon={true}
        />
      </Container>
      <Container style={{ width: '100%', alignItems: 'center', marginTop: verticalScale(250) }}>
        <Container style={{ width: '100%' }}>
          <Button length="long" fontSize="h5" round fontBold onPress={handleSubmit(submit)} disabled={!isValid}>
            Agregar
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const addedPayback = (
    <Container>
      <Container space="evenly" center style={{ width: '100%', height: moderateScale(215) }}>
        <Image source={CARD_PETRO} style={{ width: moderateScale(264), height: moderateScale(164) }} />
        <Touchable onPress={goToHelp}>
          <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
        </Touchable>
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
          textStyle={{ fontWeight: 'bold', color: theme.fontColor.dark, marginTop: -17, backgroundColor: theme.brandColor.iconn_white, fontSize: 14 }}
          maxWidth={167}
        />
        <Container center>
          <Container style={{ width: '90%', marginTop: verticalScale(80) }}>
            <Button
              fontSize="h4"
              fontBold
              outline
              round
              color="iconn_green_original"
              length="long"
              style={{ borderColor: `${theme.brandColor.iconn_green_original}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
              leftIcon={<Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_green_original} style={{ marginRight: 5 }} />}
              onPress={editPaybackCard}
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
              marginTop={15}
              onPress={showAlert}
            >
              Eliminar
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }} height={Dimensions.get('window').height * 0.75}>
      {paybackStatus == 0 ? addPayback : paybackStatus == 1 ? addedPayback : <></>}
      <InformationModalController onPressClose={hideInformationModal} visible={visible} />
    </Container>
  );
};

export default PaybackScreen;
