import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import theme from 'components/theme/theme';
import { useForm } from 'react-hook-form';
import { Input, CustomText, TextContainer, Button, Container } from 'components';
import { ICONN_POSTAL_CODE_HEADER_ICON, ICONN_PIN_LOCATION } from 'assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLoading } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const PostalCodeScreen = () => {
  const {
    control,
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm({
    mode: 'onChange'
  });
  const loader = useLoading();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  async function stall(stallTime = 1000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }

  const onSubmit = async () => {
    loader.show('', 'ecommerce');

    await stall();

    navigate('Home');

    loader.hide();
  };

  return (
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Container style={{ margin: 20 }}>
        <Container style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <Image source={ICONN_POSTAL_CODE_HEADER_ICON} />
          <Container style={{ width: '60%', marginLeft: 10 }}>
            <CustomText text={'Compártenos tu código postal'} fontSize={20} fontBold />
          </Container>
        </Container>
        <TextContainer typography="h5" fontBold text={`Código Postal`} marginTop={21} />
        <Input
          {...register('postalCode')}
          rules={{
            required: {
              value: true,
              message: `Campo requerido.`
            },
            minLength: {
              value: 5,
              message: `Mínimo 5 valores`
            }
          }}
          name="postalCode"
          control={control}
          autoCorrect={false}
          keyboardType="numeric"
          placeholder={`C.P`}
          blurOnSubmit={false}
          error={errors.postalCode?.message}
          maxLength={5}
          marginTop={4}
          renderErrorIcon={false}
          numeric
        />
      </Container>
      <Button
        style={{ marginHorizontal: 10 }}
        disabled={!isValid}
        length="long"
        round
        fontBold
        fontSize="h4"
        leftIcon={<AntDesign name="search1" size={22} color={theme.brandColor.iconn_white} />}
        onPress={handleSubmit(onSubmit)}
      >
        Buscar
      </Button>
      <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
        <Image source={ICONN_PIN_LOCATION} />
        <Container style={{ marginLeft: 10 }}>
          <CustomText text={'Usar mi ubicación actual'} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default PostalCodeScreen;

const styles = StyleSheet.create({
  billingSection: {
    paddingHorizontal: theme.layoutSpace.medium
  }
});
