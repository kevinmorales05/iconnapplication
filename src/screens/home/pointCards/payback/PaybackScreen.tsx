import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import { TextContainer, Container, Button } from 'components';
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

interface Props {
  onSubmit: (data: FieldValues) => void;
  deleteCard: () => void;
  cardToUpdate: string;
}

const PaybackScreen: React.FC<Props> = ({ onSubmit, deleteCard, cardToUpdate }) => {

  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [paybackCard, setPaybackCard] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const toast = useToast();
  const [visible, setVisible] = useState<boolean>(false);
  const [paybackStatus, setPaybackStatus] = useState(0);
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
    console.log('*update payback card*');
    navigate('UpdatePayback', { cardIdToUpdate: cardToUpdate, paybackCard: paybackCard });
  };

  const deletePointCard = () => {
    console.log('*delete payback card*');
    deleteCard();
    navigate('WalletHome');
  };

  const updateButtonStatus = () => {
    console.log('tammmm '+getValues('barcodeNumber')?.length);
    setDisableButton(getValues('barcodeNumber')?.length!=13);
  };

  useEffect(() => {
  }, [disableButton]);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar Monedero PAYBACK',
        message: `¿Estás seguro que quieres eliminar el monedero con terminación 2822?`,
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
    console.log('campos::: '+fields);
    onSubmit(fields);
    setPaybackCard(fields.cardNumber);
    setPaybackStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });
  };

  const addPayback = (
    <Container>
      <Container center>
        <Image source={ICONN_PAYBACK_MAIN} style={{ width: moderateScale(280), height: moderateScale(138) }} />
      </Container>
      <Container style={{ width: '90%', marginTop: 10, marginLeft: 15 }}>
        <TextContainer
          marginTop={8}
          fontSize={14}
          text={
            'Ingresa el número bajo el código de barras de tu tarjeta PAYBACK.'
          }
        />
      </Container>
      <Container style={{ marginTop: 30, marginLeft: 20, height: 60 }}>
        <TextContainer typography="h6" fontBold text={`Número de código de barras`} marginTop={24} />
        <Input
          name="barcodeNumber"
          ref={barcodeNumber}
          control={control}
          keyboardType="numeric"
          placeholder={'13 dígitos'}
          blurOnSubmit={true}
          error={errors.telephone?.message}
          maxLength={13}
          rules={numericWithSpecificLenght(18)}
          onChangeText={updateButtonStatus}
        />
      </Container>
      <Container center style={{ backgroundColor: theme.brandColor.iconn_background, paddingLeft: 0, width: '100%', height: '20%', paddingTop: 50, marginTop: 200, marginLeft:30 }}>
          <Button
            length="long"
            fontSize="h5"
            round
            fontBold
            style={{ marginBottom: 5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
            onPress={handleSubmit(submit)}
            disabled={ disableButton }
          >
          Agregar
        </Button>
      </Container>
    </Container>
  );

  const addedPayback = (
    <Container>
      <Container space='around' center style={{ width: '100%', height: moderateScale(195) }}>
        <Image source={CARD_PETRO} style={{ width: moderateScale(264), height: moderateScale(164) }} />
      </Container>
      <Container style={{ width: '100%', height: '100%', backgroundColor:theme.brandColor.iconn_white }}>
      <Container center>
      <TextContainer
          marginTop={20}
          marginBottom={24}
          fontSize={14}
          text={
            'Muestra el código de barras antes de pagar'
          }
        />
        </Container>
        <Barcode
            format="CODE128B"
            value="0000002021954Q"
            text={'1234567890987'}
            height={moderateScale(168)}
            textStyle={{ fontWeight: 'bold', color: theme.fontColor.dark, marginTop:-19, backgroundColor:theme.brandColor.iconn_white, fontSize:14 }}
            maxWidth={167}
          />
        <Container center>
            <Container style={{ width: '90%', marginTop: 150 }}>
              <Button
                fontSize="h4"
                fontBold
                outline
                round
                color='iconn_green_original'
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
                color='black'
                length="long"
                style={{ borderColor: `${theme.brandColor.iconn_med_grey}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
                leftIcon={<Image source={ICONN_EMPTY_SHOPPING_CART} style={{ tintColor: 'red', height: 20, width: 20 }} />}
                marginTop={20}
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
      {
      /*<InformationModalController onPressClose={hideInformationModal} visible={visible} />*/
      }
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
