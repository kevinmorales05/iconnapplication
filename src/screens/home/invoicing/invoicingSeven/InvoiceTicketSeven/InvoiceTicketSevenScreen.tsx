import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input, ActionButton, Select, TaxInfoCard } from 'components';
import theme from 'components/theme/theme';
import { useAppDispatch } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm } from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import { getCFDIListThunk } from 'rtk/thunks/invoicing.thunks';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  onPressAddNewTicket: () => void;
  onPressScan: () => void;
}

const InvoiceTicketSevenScreen: React.FC<Props> = ({ onSubmit, goBack, onPressAddNewTicket, onPressScan }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [cfdiList, setCfdiList] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    setValue
  } = useForm({
    mode: 'onChange'
  });

  const barCodeRef = useRef<TextInput>(null);

  useEffect(() => {
    if (barCodeRef.current) {
      barCodeRef.current.focus();
    }
  }, []);

  const fetchCatalogs = useCallback(async () => {
    const { data: cfdis } = await dispatch(getCFDIListThunk()).unwrap();
    setCfdiList(cfdis);
  }, []);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top }} row space="between" center>
        <Touchable onPress={goBack} rounded>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Touchable>
        <CustomText text="Facturar 7-Eleven" typography="h3" fontBold textAlign="center" />
        <ActionButton circle size="xxsmall" onPress={onPressAddNewTicket} icon={<Entypo name="plus" color={theme.brandColor.iconn_white} size={28} />} />
      </Container>
      <ScrollView
        bounces={false}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container flex space="between">
          <Container backgroundColor={theme.brandColor.iconn_background}>
            <TaxInfoCard name="GAS impreial sa de cv" rfc="GASIMPERIAL3487" onPress={() => {}} />
            <TextContainer text="Información de tu factura" fontBold typography="h4" />
            <TaxInfoCard
              rfc={'defaultProfile.rfc'}
              name={'defaultProfile.business_name'}
              onPress={() => {
                console.log('setVisible(true);');
              }}
              withExchange
            />
          </Container>
          <Container>
            <TextContainer typography="h5" fontBold text={`Uso de CFDI (Predeterminado)`} marginTop={21} />
            <Select
              name="cfdi"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: `Campo requerido.`
                }
              }}
              options={cfdiList.map(item => item.description)}
              onSelect={value => setValue('cfdi', value)}
              androidMode="dropdown"
              placeholder={`Seleccionar`}
              error={errors.cfdi?.message}
            />
            <Button disabled={isValid} marginTop={16} round fontBold fontSize="h4" onPress={handleSubmit(onSubmit)}>
              + Agregar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default InvoiceTicketSevenScreen;
