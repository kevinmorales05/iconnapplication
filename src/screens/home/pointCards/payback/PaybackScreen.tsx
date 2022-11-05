import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, Image } from 'react-native';
import { TextContainer, Container, Button } from 'components';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';
import { ICONN_PAYBACK_MAIN } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';
import { Input } from '../../../../components/atoms';
import { useForm } from 'react-hook-form';

interface Props {
  itemId: string;
}

const PreferenteScreen: React.FC<Props> = ({
  itemId
}) => {

  const { detailSelected, cart } = useAppSelector((state: RootState) => state.cart);
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

  itemId = detailSelected;

  useEffect(() => {

  }, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }}>
      <Container center>
        <Image source={ICONN_PAYBACK_MAIN} style={{ width: moderateScale(280), height: moderateScale(138) }} />
      </Container>
      <Container style={{ width: '90%', marginTop: 10, marginLeft:15 }}>
        <TextContainer
          marginTop={8}
          fontSize={14}
          text={
            'Ingresa el número bajo el código de barras de tu tarjeta PAYBACK.'
          }
        />
      </Container>
      <Container style={{ marginTop: 30, marginLeft:20, height: 60 }}>
          <TextContainer typography="h6" fontBold text={`Número de código de barras`} marginTop={24} />
          <Input
            name="cardNumber"
            ref={cardNumber}
            control={control}
            keyboardType="number-pad"
            placeholder={'Código numérico (18 dígitos)'}
            blurOnSubmit={true}
            error={errors.telephone?.message}
            maxLength={18}
          />
        </Container>
      <Container center style={{ marginTop: 300 }}>
        <Button
          style={{ width: '90%', height: 62 }}
          round
          fontBold
          fontSize={16}
        >
          Agregar
        </Button>
      </Container>
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
