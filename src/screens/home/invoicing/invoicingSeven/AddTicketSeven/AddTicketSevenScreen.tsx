import React, { useEffect, useRef } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input } from 'components';
import theme from 'components/theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ICONN_INVOICING_SEVEN } from 'assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import { numericWithSpecificLenght } from 'utils/rules';
import { useIsFocused } from '@react-navigation/native';
import { InvoicingSevenTicketResponseInterface, RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';
interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  onPressQuestionButton: () => void;
  onPressScan: () => void;
  ticket?: InvoicingSevenTicketResponseInterface;
  position?: number;
}

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    right: 0
  }
});

const AddTicketSevenScreen: React.FC<Props> = ({ onSubmit, goBack, onPressQuestionButton, onPressScan, ticket, position }) => {
  const { closeContainer } = styles;
  const insets = useSafeAreaInsets();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const barCodeRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  const resetForm = () => {
    reset({ barCode: '' });
    if (barCodeRef.current) barCodeRef.current.focus();
  };

  const populateForm = () => {
    setValue('barCode', ticket?.ticketNo);
    trigger('barCode');
    if (barCodeRef.current) barCodeRef.current.focus();
  };

  useEffect(() => {
    if (isFocused && !ticket && !position) resetForm();
    else populateForm();
  }, [ticket]);

  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top }} crossCenter>
        <CustomText text="Agregar Ticket" typography="h3" fontBold textAlign="center" />
        <Container style={closeContainer}>
          <Touchable
            onPress={() => {
              goBack();
              logEvent('invCloseNewInvoice', {
                id: user.id,
                description: 'Botón para cancelar el procedimiento de una nueva factura de 7Eleven',
                type: '7Eleven'
              });
            }}
            rounded
          >
            <AntDesign name="close" size={24} color="black" />
          </Touchable>
        </Container>
      </Container>
      <ScrollView
        bounces={false}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container flex space="between">
          <Container>
            <Image source={ICONN_INVOICING_SEVEN} resizeMode="contain" style={{ width: 103, marginTop: 20, alignSelf: 'center' }} />

            <TextContainer
              text={`Es necesario que la estación y la forma de pago de los\ntickets sean iguales para facturar.`}
              typography="description"
              marginTop={24}
              textColor={theme.fontColor.grey}
              textAlign="center"
            />

            <Touchable onPress={onPressQuestionButton} marginTop={8}>
              <MaterialIcons name="help" size={28} color={theme.brandColor.iconn_accent_secondary} style={{ alignSelf: 'center' }} />
            </Touchable>

            <Button
              round
              onPress={onPressScan}
              fontSize="h4"
              fontBold
              marginTop={16}
              outline
              leftIcon={<MaterialCommunityIcons name="line-scan" size={24} color={theme.brandColor.iconn_accent_principal} />}
            >
              Escanear Ticket
            </Button>

            <Container style={{ marginTop: 34 }} row center>
              <Container width={'35%'} backgroundColor={theme.brandColor.iconn_light_grey} height={1} />
              <Container width={'30%'}>
                <CustomText text="O captura" alignSelf="center"></CustomText>
              </Container>
              <Container width={'35%'} backgroundColor={theme.brandColor.iconn_light_grey} height={1} />
            </Container>

            <Input
              {...register('barCode')}
              name="barCode"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`35 dígitos`}
              blurOnSubmit={true}
              marginTop={26}
              ref={barCodeRef}
              label="Código de barras"
              boldLabel
              maxLength={35}
              numeric
              rules={numericWithSpecificLenght(35)}
              error={errors.barCode?.message}
            />
          </Container>
          <Container>
            <Button disabled={!isValid} marginTop={16} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
              + Agregar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default AddTicketSevenScreen;
