import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import { TextContainer, Container, Button, Touchable } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PREFERENTE_MAIN, CARD_PREF, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
import { Input } from '../../../../../components/atoms';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast, useAlert } from 'context';
import { CrudType } from '../../../../../components/types/crud-type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../navigation/types';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  onSubmit: (data: FieldValues) => void;
  preferenteCardToUpdate: string;
  mode: CrudType;
  cardId: string;
}

const UpdatePreferredScreen: React.FC<Props> = ({ onSubmit, preferenteCardToUpdate, mode, cardId }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [preferenteCardToUpdateinUpdate, setPreferenteCardToUpdateinUpdate] = useState(preferenteCardToUpdate);
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
    getValues,
    unregister
  } = useForm({
    mode: 'onChange'
  });

  const cardNumberToUpdate = useRef<TextInput>(null);

  const editPreferenteCard = () => {
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
    setPreferenteCardToUpdateinUpdate(fields.cardNumberToUpdate);
    setPreferenteStatus(1);
    toast.show({
      message: 'Cambios guardados con éxito.',
      type: 'success'
    });
    navigate('Preferred', { addOrShow: 1, cardId: cardId, cardNumber: fields.cardNumberToUpdate });
  };

  useEffect(() => {}, [disableButton, preferenteCardToUpdateinUpdate]);

  const populateForUpdate = () => {
    setValue('cardNumberToUpdate', preferenteCardToUpdateinUpdate);
    trigger('cardNumberToUpdate');
  };

  const updateButtonStatus = () => {
    setDisableButton(getValues('cardNumberToUpdate')?.length!=18);
    setPreferenteCardToUpdateinUpdate(getValues('cardNumberToUpdate'));
  };

  useEffect(() => {
    if (mode === 'create') {

    } else if (mode === 'update') {
      populateForUpdate();
    }
  }, [mode]);

  const goToHelp = () => {
    navigate('PreferredHelp');
  };

  const addPreferente = (
    <Container>
      <Image source={ICONN_PREFERENTE_MAIN} style={{ width: '100%', height: moderateScale(193) }} />
      <Container center style={{ width: '90%', marginTop: 10 }}>
        <TextContainer marginTop={8} fontSize={14} text={`Ingresa tu código numérico y automáticamente\nse generará tu código de barras.`} />
        <Container style={{ marginTop: 40, marginLeft: 20, height: 80 }}>
        <Container row>
            <TextContainer typography="h6" fontBold text={`Número de tarjeta`} marginTop={4} marginRight={8}/>
            <Touchable onPress={goToHelp}>
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
            </Touchable>
          </Container>
          <Input
            {...register('cardNumberToUpdate')}
            name="cardNumberToUpdate"
            ref={cardNumberToUpdate}
            control={control}
            autoCorrect={false}
            keyboardType="number-pad"
            marginTop={2}
            placeholder={'Código numérico (18 dígitos)'}
            blurOnSubmit={true}
            error={errors.cardNumberToUpdate?.message}
            boldLabel
            maxLength={18}
            onSubmitEditing={() => cardNumberToUpdate.current?.focus()}
            onChangeText={updateButtonStatus}
          />
        </Container>
        <Container
          center
          style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', height: '20%', paddingTop: 50, marginTop: 200, marginLeft:38 }}
        >
          <Button
            length="long"
            fontSize="h5"
            round
            fontBold
            style={{ width: '95%',marginBottom: 5, backgroundColor: theme.brandColor.iconn_green_original, height: 50, borderRadius: 10 }}
            onPress={handleSubmit(submit)}
            disabled={disableButton}
          >
            Guardar
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const addedPreferente = (
    <Container>
      <Container center space="around" style={{ width: '100%', height: moderateScale(193), backgroundColor: theme.brandColor.iconn_background }}>
        <Image source={CARD_PREF} style={{ width: moderateScale(261), height: moderateScale(164) }} />
      </Container>
      <Container center style={{ width: '100%', marginTop: 10, backgroundColor: theme.brandColor.iconn_white }}>
        <TextContainer marginTop={50} fontSize={14} text={`Muestra el código de barras antes de pagar`} />
        <Container style={{ width: 360, height: moderateScale(20) }}>
          <Barcode format="CODE128B" value={preferenteCardToUpdateinUpdate} text={preferenteCardToUpdateinUpdate} />
        </Container>
      </Container>
      <Container center style={{ backgroundColor: theme.brandColor.iconn_white, marginTop: 180 }}>
        <Container style={{ width: '90%', marginTop: 4 }}>
          <Button
            fontSize="h4"
            fontBold
            outline
            round
            color="iconn_green_original"
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
            color="black"
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
      {preferenteStatus == 0 ? addPreferente : preferenteStatus == 1 ? addedPreferente : <></>}
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
