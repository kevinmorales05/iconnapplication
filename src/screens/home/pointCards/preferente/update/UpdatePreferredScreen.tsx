import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Dimensions, Image } from 'react-native';
import { TextContainer, Container, Button } from 'components';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';
import { ICONN_PREFERENTE_MAIN, CARD_PREF, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
import { Input } from '../../../../../components/atoms';
import { useForm,FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast, useAlert } from 'context';

interface Props {
  onSubmit: (data: FieldValues) => void;
  preferenteCardToUpdate: string;
}

const UpdatePreferredScreen: React.FC<Props> = ({
  onSubmit, preferenteCardToUpdate
}) => {

  console.log('preferenteCardToUpdate-> '+preferenteCardToUpdate);
  const [preferenteCard, setPreferenteCard] = useState(preferenteCardToUpdate);
  const [preferenteStatus, setPreferenteStatus] = useState(0);
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
    getValues,
    unregister
  } = useForm({
    mode: 'onChange'
  });

  const cardNumberToUpdate = useRef<TextInput>(null);

  const editPreferenteCard = () => {
    console.log('*edit preferente card*');
    setPreferenteStatus(0);
  };

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
          //deleteUnavailableItems();
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
    setPreferenteCard(fields.cardNumberToUpdate);
    setPreferenteStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });

  };

  useEffect(() => {

  }, [preferenteCard]);

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
            name="cardNumberToUpdate"
            ref={cardNumberToUpdate}
            control={control}
            keyboardType="number-pad"
            placeholder={'Código numérico (18 dígitos)'}
            blurOnSubmit={true}
            error={errors.telephone?.message}
            maxLength={18}
            defaultValue={preferenteCard}
            editable
            onChangeText={t => {
                unregister('cardNumberToUpdate');
            }}
          />
        </Container>
        <Container center style={{ backgroundColor: theme.brandColor.iconn_background, paddingLeft: 0, width: '100%', height: '20%', paddingTop: 50, marginTop: 200 }}>
          <Button
            length="long"
            fontSize="h5"
            round
            fontBold
            style={{ marginBottom: 5, width: 320, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
            onPress={handleSubmit(submit)}
          >
            Guardar
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
        <Container style={{ width: 360, height: moderateScale(20) }}>
          <Barcode
            format="CODE128B"
            value="0000002021954Q"
            text={preferenteCard}
          />
        </Container>
      </Container>
      <Container center style={{ backgroundColor: theme.brandColor.iconn_white, marginTop: 180 }}>
          <Container style={{ width: '90%', marginTop: 4 }}>
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
            >
              Eliminar
            </Button>
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

export default UpdatePreferredScreen;

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
