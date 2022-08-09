import React, { useEffect, useRef } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input, DatePicker } from 'components';
import theme from 'components/theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ICONN_INVOICING_PETRO } from 'assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  onPressQuestionButton: () => void;
  onPressScan: () => void;
}

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    right: 0
  }
});

const AddTicketPetroScreen: React.FC<Props> = ({ onSubmit, goBack, onPressQuestionButton, onPressScan }) => {
  const { closeContainer } = styles;
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register
  } = useForm({
    mode: 'onChange'
  });

  const stationRef = useRef<TextInput>(null);
  const folioRef = useRef<TextInput>(null);
  const webIdRef = useRef<TextInput>(null);
  const ticketDateRef = useRef<TextInput>(null);

  useEffect(() => {
    if (stationRef.current) {
      stationRef.current.focus();
    }
  }, []);

  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top }} crossCenter>
        <CustomText text="Agregar Ticket" typography="h3" fontBold textAlign="center" />
        <Container style={closeContainer}>
          <Touchable onPress={goBack} rounded>
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
            <Image source={ICONN_INVOICING_PETRO} style={{ width: 88, height: 37, marginTop: 20, alignSelf: 'center' }} />

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
              {...register('station')}
              name="station"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`Número de estación`}
              blurOnSubmit={true}
              marginTop={26}
              ref={stationRef}
              label="Estación"
              boldLabel
              maxLength={4}
              numeric
              onSubmitEditing={() => folioRef.current?.focus()}
            />

            <Input
              {...register('folio')}
              name="folio"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`6 dígitos`}
              blurOnSubmit={true}
              marginTop={21}
              ref={folioRef}
              label="Folio"
              boldLabel
              maxLength={6}
              numeric
              onSubmitEditing={() => webIdRef.current?.focus()}
            />

            <Input
              {...register('webId')}
              name="webId"
              control={control}
              autoCorrect={false}
              keyboardType="numeric"
              placeholder={`4 dígitos`}
              blurOnSubmit={true}
              marginTop={21}
              ref={webIdRef}
              label="Web ID"
              boldLabel
              maxLength={4}
              numeric
            />

            <DatePicker
              {...register('ticketDate')}
              name="ticketDate"
              control={control}
              autoCorrect={false}
              keyboardType="default"
              placeholder="dd/mm/aaaa"
              blurOnSubmit={true}
              marginTop={21}
              ref={ticketDateRef}
              label="Fecha del ticket"
              boldLabel
            />
          </Container>
          <Container style={{ marginBottom: 16 }}>
            <Button marginTop={16} round fontBold fontSize="h4" onPress={onSubmit}>
              + Agregar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default AddTicketPetroScreen;
