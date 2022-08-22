import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, CustomText, Touchable, Input, ActionButton, Select, TaxInfoCard, ListSwipeableItem, CardBilling } from 'components';
import theme from 'components/theme/theme';
import { InvoicingSevenTicketResponseInterface, useAppDispatch } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm } from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import { getCFDIListThunk } from 'rtk/thunks/invoicing.thunks';
import { ICONN_INVOICING_INVOICE } from 'assets/images';
import { PAYMENT_METHODS } from 'assets/files';

interface Props {
  onSubmit: (fields: any) => void;
  goBack: () => void;
  onPressAddNewTicket: () => void;
  onPressEditTicket: () => void;
  onPressDeleteTicket: () => void;
  ticketsList: InvoicingSevenTicketResponseInterface[];
}

const InvoiceTicketSevenScreen: React.FC<Props> = ({ onSubmit, goBack, onPressAddNewTicket, onPressEditTicket, onPressDeleteTicket, ticketsList }) => {
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

  let rowRefs = new Map();

  return (
    <Container flex useKeyboard>
      <Container style={{ marginTop: insets.top, paddingHorizontal: 16, marginBottom: 10 }} row space="between" center>
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
          <Container>
            <Container backgroundColor={theme.brandColor.iconn_background}>
              <Container row space="between" style={{ marginTop: 22, marginBottom: 8, paddingHorizontal: 16 }}>
                <TextContainer text="NÚMERO DE TICKET" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" />
                <TextContainer text="TOTAL" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" marginRight={10} />
              </Container>
              {ticketsList.map((ticket, i) => (
                <ListSwipeableItem key={i} onPressEdit={onPressEditTicket} onPressDelete={onPressDeleteTicket} ticketSeven={ticket} index={i} rowRefs={rowRefs}/>
              ))}
              <Container style={{ paddingTop: 24, paddingBottom: 16, paddingHorizontal: 16 }}>
                <TextContainer text="Información de tu factura" fontBold typography="h4" />
                <TaxInfoCard withExchange name="LAS AGUILAS SA DE CV" rfc="MAAM890617BU7" onPress={() => {}}></TaxInfoCard>
              </Container>
            </Container>

            <Container style={{ paddingHorizontal: 16 }}>
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
                androidMode="dialog"
                placeholder={`Seleccionar`}
                error={errors.cfdi?.message}
                label="Selecciona el uso de CFDI:"
              />
              <TextContainer typography="h5" fontBold text={`Forma de pago`} marginTop={21} />
              <Select
                name="payment_method"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Campo requerido.`
                  }
                }}
                options={PAYMENT_METHODS.map(item => item.name)}
                onSelect={value => setValue('payment_method', value)}
                androidMode="dialog"
                placeholder={`Seleccionar`}
                error={errors.cfdi?.message}
                label="Selecciona la forma de pago:"
              />
            </Container>
          </Container>
          <Container style={{ paddingHorizontal: 16 }}>
            <Button
              disabled={isValid}
              marginTop={16}
              round
              fontBold
              fontSize="h4"
              onPress={handleSubmit(onSubmit)}
              leftIcon={<Image source={ICONN_INVOICING_INVOICE} />}
            >
              Agregar
            </Button>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default InvoiceTicketSevenScreen;
