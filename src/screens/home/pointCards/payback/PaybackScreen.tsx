import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import { TextContainer, Container, Button, Touchable } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PAYBACK_MAIN, CARD_PETRO, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
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
}

const PaybackScreen: React.FC<Props> = ({ onPressScan, addOrShow, cardNumberToShow, onSubmit, deleteCard, cardToUpdate, cardId }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [paybackCard, setPaybackCard] = useState('0000000000');
  const [disableButton, setDisableButton] = useState(true);
  const toast = useToast();
  const [visible, setVisible] = useState<boolean>(false);
  const [paybackStatus, setPaybackStatus] = useState(addOrShow);
  const alert = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    setValue,
    trigger,
    getValues
  } = useForm({
    mode: 'onChange'
  });

  const barcodeNumber = useRef<TextInput>(null);

  const editPaybackCard = () => {
    navigate('UpdatePayback', { cardIdToUpdate: cardToUpdate, paybackCard: paybackCard, cardId: cardId });
  };

  const deletePointCard = () => {
    deleteCard();
    toast.show({
      message: 'Tarjeta eliminada exitosamente.',
      type: 'success'
    });
    navigate('WalletHome');
  };

  const updateButtonStatus = () => {
    setDisableButton(getValues('barcodeNumber')?.length!=13);
    setPaybackCard(getValues('barcodeNumber'));
  };

  const getPointCardById = () => {
    vtexDocsServices.getDocByDocID('PC', cardId).then(cardRetrieved => {
      if (cardRetrieved) {
        let { barCode } = cardRetrieved[0];
        setPaybackCard(barCode);
      }
    });
  };

  useEffect(() => {
    if(addOrShow==1){
      getPointCardById()
      setPaybackCard(addOrShow==1?cardNumberToShow:'0000000000000');
    }
  }, [paybackCard, disableButton, cardNumberToShow]);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar Monedero PAYBACK',
        message: `¿Estás seguro que quieres eliminar el monedero con terminación `+paybackCard.slice(paybackCard.length-4)+`?`,
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
    <Container>
      <Container center>
        <Image source={ICONN_PAYBACK_MAIN} style={{ width: moderateScale(280), height: moderateScale(138) }} />
      </Container>
      <Container style={{ width: '90%', marginTop: moderateScale(15), marginLeft: moderateScale(10) }}>
        <TextContainer marginTop={8} fontSize={14} text={'Ingresa el número bajo el código de barras de tu tarjeta PAYBACK.'} />
      </Container>
      <Container center row style={{ marginTop: 40, width: '80%', marginLeft: moderateScale(20) }}>
        <TextContainer typography="h6" fontBold text={`Número de código de barras`} marginRight={8} marginTop={4} />
        <Touchable onPress={goToModalHelp}>
          <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
        </Touchable>
      </Container>
      <Container row center style={{ marginLeft: 20, height: 60, width: '85%' }}>
        <Input
        {...register('barcodeNumber')}
          name="barcodeNumber"
          ref={barcodeNumber}
          control={control}
          keyboardType="numeric"
          placeholder={'13 dígitos'}
          blurOnSubmit
          error={errors.barcodeNumber?.message}
          maxLength={13}
          rules={numericWithSpecificLenght(13)}
          onChangeText={updateButtonStatus}
          onPressScan={onPressScan}
          scanIcon={true}
        />
      </Container>
      <Container
        center
        style={{ backgroundColor: theme.brandColor.iconn_background, paddingLeft: 0, width: '100%', height: '20%', paddingTop: 50, marginTop: 200 }}
      >
        <Button
          length="long"
          fontSize="h5"
          round
          fontBold
          style={{ marginBottom: 5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
          onPress={handleSubmit(submit)}
          disabled={disableButton}
        >
          Agregar
        </Button>
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
          <Container style={{ width: '90%', marginTop: 90 }}>
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
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
      {
        paybackStatus == 0 ?
          addPayback :
          (paybackStatus == 1 ?
            addedPayback :
            <></>)
      }
      <InformationModalController onPressClose={hideInformationModal} visible={visible} />
    </Container>

  );
};

export default PaybackScreen;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    minHeight: moderateScale(254),
    backgroundColor: theme.brandColor.iconn_white,
    marginTop: moderateScale(16),
    borderRadius: moderateScale(10),
    padding: moderateScale(8)
  },
  containerPorcentDiscount: {
    width: moderateScale(84),
    height: moderateScale(23),
    borderRadius: moderateScale(12),
    backgroundColor: theme.brandColor.iconn_green_discount,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain'
  }
});
