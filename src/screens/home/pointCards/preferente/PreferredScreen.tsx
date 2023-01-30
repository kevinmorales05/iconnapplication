import React, { useRef, useState, useEffect } from 'react';
import { TextInput, Image } from 'react-native';
import { TextContainer, Container, Button, Touchable } from 'components';
import theme from 'components/theme/theme';
import { ICONN_PREFERENTE_MAIN, CARD_PREF, ICONN_EMPTY_SHOPPING_CART } from 'assets/images';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { Input } from '../../../../components/atoms';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import Octicons from 'react-native-vector-icons/Octicons';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../navigation/types';
import { numericWithSpecificLenght } from 'utils/rules';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootState, useAppSelector } from 'rtk';

interface Props {
  addOrShow: number;
  cardNumberToShow: string;
  onSubmit: (data: FieldValues) => void;
  deleteCard: () => void;
  cardToUpdate: string;
  cardId: string;
  onPressSendAnalytics: (analyticsName: string, analyticsData: any) => void;
}

const PreferredScreen: React.FC<Props> = ({ addOrShow, cardNumberToShow, onSubmit, deleteCard, cardToUpdate, cardId, onPressSendAnalytics }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [preferenteCard, setPreferenteCard] = useState('000000000000000000');
  const [preferenteStatus, setPreferenteStatus] = useState(addOrShow);
  const toast = useToast();
  const alert = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    getValues
  } = useForm({
    mode: 'onChange'
  });

  const cardNumber = useRef<TextInput>(null);

  const editPreferenteCard = () => {
    navigate('UpdatePreferred', { cardIdToUpdate: cardToUpdate, preferenteCard: preferenteCard, cardId: cardId });
    onPressSendAnalytics('walEditCard', {
      id: user.id,
      description: 'El usuario ingresa a la sección para editar una tarjeta de puntos',
      cardType: 'ICONN',
      cardId: cardId
    });
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
    setPreferenteCard(getValues('cardNumber'));
  };

  useEffect(() => {
    if (addOrShow == 1) {
      setPreferenteCard(addOrShow == 1 ? cardNumberToShow : '000000000000000000');
    }
  }, [isValid, cardNumberToShow]);

  const showAlert = () => {
    onPressSendAnalytics('walDeleteCard', {
      id: user.id,
      description: 'El usuario toca el botón de eliminar una tarjeta de puntos',
      cardType: 'ICONN',
      cardId: cardId
    });
    alert.show(
      {
        title: 'Eliminar tarjeta ICONN Preferente',
        message:
          '¿Estás seguro que quieres eliminar la tarjeta con terminación ' +
          preferenteCard.slice(preferenteCard.length - 4) +
          '?\nLa puedes volver a dar de alta en cualquier momento.',
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_light_grey',
        cancelTextColor: 'iconn_dark_grey',
        onAccept() {
          deletePointCard();
          alert.hide();
          onPressSendAnalytics('walConfirmDeleteCard', {
            id: user.id,
            description: 'El usuario toca el botón de confirmar eliminación de una tarjeta de puntos',
            cardType: 'ICONN',
            cardId: cardId
          });
        },
        onCancel() {
          alert.hide('cancelar');
          onPressSendAnalytics('walCancelDeleteCard', {
            id: user.id,
            description: 'El usuario toca el botón de cancelar eliminación de una tarjeta de puntos',
            cardType: 'ICONN',
            cardId: cardId
          });
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

  const goToHelp = () => {
    navigate('PreferredHelp');
  };

  const addPreferente = (
    <Container>
      <Image source={ICONN_PREFERENTE_MAIN} style={{ width: '100%', height: moderateScale(193) }} />
      <Container style={{ width: '100%', marginTop: 10, paddingHorizontal: moderateScale(15) }}>
        <TextContainer marginTop={8} fontSize={14} text={'Ingresa tu código numérico y automáticamente\nse generará tu código de barras.'} />
        <Container style={{ marginTop: verticalScale(40) }}>
          <Container row>
            <TextContainer typography="h6" fontBold text={'Número de tarjeta'} marginRight={moderateScale(8)} marginTop={4} />
            <Touchable
              onPress={() => {
                onPressSendAnalytics('walHelpAddCard', {
                  id: user.id,
                  description: 'El usuario toca el botón de ayuda al ingresar una tarjeta de puntos',
                  cardType: 'ICONN'
                });
                goToHelp();
              }}
            >
              <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
            </Touchable>
          </Container>
          <Container row center style={{ height: moderateScale(70), width: '100%' }}>
            <Input
              {...register('cardNumber')}
              name="cardNumber"
              ref={cardNumber}
              control={control}
              keyboardType="numeric"
              placeholder={'Código numérico (18 dígitos)'}
              marginTop={2}
              blurOnSubmit={true}
              autoCorrect
              error={errors.cardNumber?.message}
              maxLength={18}
              rules={numericWithSpecificLenght(18)}
              onChangeText={updateButtonStatus}
            />
          </Container>
        </Container>
        <Container style={{ width: '100%', alignItems: 'center', marginTop: verticalScale(200) }}>
          <Container style={{ width: '100%' }}>
            <Button length="long" fontSize="h5" round fontBold onPress={handleSubmit(submit)} disabled={!isValid}>
              Agregar
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );

  const addedPreferente = (
    <Container>
      <Container center space="around" style={{ width: '100%', height: moderateScale(193), backgroundColor: theme.brandColor.iconn_background }}>
        <Image source={CARD_PREF} style={{ width: moderateScale(261), height: moderateScale(164) }} />
        <Touchable
          onPress={() => {
            onPressSendAnalytics('walHelpCard', {
              id: user.id,
              description: 'El usuario toca el botón de ayuda de una tarjeta de puntos',
              cardType: 'ICONN'
            });
            goToHelp();
          }}
        >
          <Icon name="questioncircle" size={20} color={theme.brandColor.iconn_green_original} />
        </Touchable>
      </Container>
      <Container center style={{ width: '100%', marginTop: 10, backgroundColor: theme.brandColor.iconn_white }}>
        <TextContainer marginTop={50} fontSize={14} text={'Muestra el código de barras antes de pagar'} />
        <Container style={{ height: '100%', marginTop: 40 }}>
          <Barcode
            format="CODE128B"
            value={preferenteCard}
            text={'* ' + preferenteCard + ' *'}
            height={moderateScale(70)}
            textStyle={{ fontWeight: 'bold', color: theme.fontColor.dark }}
            maxWidth={340}
          />

          <Container center>
            <Container style={{ width: '100%', marginTop: verticalScale(110) }}>
              <Button
                fontSize="h4"
                fontBold
                outline
                round
                color="iconn_green_original"
                length="long"
                style={{
                  borderColor: `${theme.brandColor.iconn_green_original}`,
                  justifyContent: 'center',
                  paddingVertical: 1,
                  borderRadius: 12,
                  width: '100%'
                }}
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
                marginTop={15}
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
      {preferenteStatus == 0 ? addPreferente : preferenteStatus == 1 ? addedPreferente : <></>}
    </Container>
  );
};

export default PreferredScreen;
