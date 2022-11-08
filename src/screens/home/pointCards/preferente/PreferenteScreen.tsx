import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import { TextContainer, Container, Button } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PREFERENTE_MAIN, CARD_PREF, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
import { Input } from '../../../../components/atoms';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../navigation/types';

interface Props {
  onSubmit: (data: FieldValues) => void;
  deleteCard: () => void;
  cardToUpdate: string;
}

const PreferenteScreen: React.FC<Props> = ({ onSubmit, deleteCard, cardToUpdate }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [preferenteCard, setPreferenteCard] = useState('');
  const [preferenteStatus, setPreferenteStatus] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const toast = useToast();
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

  const cardNumber = useRef<TextInput>(null);

  const editPreferenteCard = () => {
    console.log('*update preferente card*');
    navigate('UpdatePreferente', { cardIdToUpdate: cardToUpdate, preferenteCard: preferenteCard });
  };

  const deletePointCard = () => {
    console.log('*delete preferente card*');
    deleteCard();
    navigate('WalletHome');
  };

  const updateButtonStatus = () => {
    setDisableButton(getValues('cardNumber')?.length!=18);
  };

  useEffect(() => {
  }, [disableButton]);

  const showAlert = () => {
    alert.show(
      {
        title: 'Eliminar tarjeta ICONN Preferente',
        message: `¿Estás seguro que quieres eliminar la tarjeta con terminación 1580?\nLa puedes volver a dar de alta en cualquier momento.`,
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
    setPreferenteCard(fields.cardNumber);
    setPreferenteStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });

  };

  const addPreferente = (
    <Container>
      <Image source={ICONN_PREFERENTE_MAIN} style={{ width: '100%', height: moderateScale(193) }} />
      <Container center style={{ width: '90%', marginTop: 10 }}>
        <TextContainer
          marginTop={8}
          fontSize={14}
          text={
            `Ingresa tu código numérico y automáticamente\nse generará tu código de barras.`
          }
        />
        <Container style={{ marginTop: 30, marginLeft: 20, height: 60 }}>
          <TextContainer typography="h6" fontBold text={`Número de tarjeta`} marginTop={24} />
          <Input
            name="cardNumber"
            ref={cardNumber}
            control={control}
            keyboardType="numeric"
            placeholder={'Código numérico (18 dígitos)'}
            blurOnSubmit={true}
            error={errors.telephone?.message}
            maxLength={18}
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
    </Container>
  );

  const addedPreferente = (
    <Container>
      <Container center space='around' style={{ width: '100%', height: moderateScale(193), backgroundColor: theme.brandColor.iconn_background }}>
        <Image source={CARD_PREF} style={{ width: moderateScale(261), height: moderateScale(164) }} />
      </Container>
      <Container center style={{ width: '100%', marginTop: 10, backgroundColor: theme.brandColor.iconn_white }}>
        <TextContainer
          marginTop={50}
          fontSize={14}
          text={
            `Muestra el código de barras antes de pagar`
          }
        />
        <Container style={{ height: '100%', marginTop: 40 }}>
          <Barcode
            format="CODE128B"
            value="0000002021954Q"
            text={'* ' + preferenteCard + ' *'}
            height={moderateScale(70)}
            textStyle={{ fontWeight: 'bold', color: theme.fontColor.dark }}
            maxWidth={340}
          />

          <Container center>
            <Container style={{ width: '100%', marginTop: 120 }}>
              <Button
                fontSize="h4"
                fontBold
                outline
                round
                color='iconn_green_original'
                length="long"
                style={{ borderColor: `${theme.brandColor.iconn_green_original}`, justifyContent: 'center', paddingVertical: 1, borderRadius: 12, width: '100%' }}
                leftIcon={<Octicons name="pencil" size={theme.avatarSize.xxxsmall} color={theme.brandColor.iconn_green_original} style={{ marginRight: 5 }} />}
                onPress={editPreferenteCard}
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
                onPress={showAlert}
                marginTop={20}
              >
                Eliminar
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', height: '100%' }}>
      {
        preferenteStatus == 0 ?
          addPreferente :
          (preferenteStatus == 1 ?
            addedPreferente :
            <></>)
      }
    </Container>

  );
};

export default PreferenteScreen;

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
