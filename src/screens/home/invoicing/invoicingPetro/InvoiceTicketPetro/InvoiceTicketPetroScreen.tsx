import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, TaxInfoCard, Touchable, CustomText, ActionButton, ListSwipeableItem, Select } from 'components';
import theme from 'components/theme/theme';
import { InvoicingPetroTicketResponseInterface, useAppDispatch } from 'rtk';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm } from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import { PAYMENT_METHODS } from 'assets/files';
import { ICONN_INVOICING_INVOICE } from 'assets/images';
import { getCFDIListThunk } from 'rtk/thunks/invoicing.thunks';
import { openField } from 'utils/rules';

interface Props {
  onSubmit: (cfdi: string, paymentMethod: string) => void;
  goBack: () => void;
  onPressAddNewTicket: () => void;
  onPressEditTicket: () => void;
  onPressDeleteTicket: () => void;
  ticketsList: InvoicingPetroTicketResponseInterface[];
}

const InvoiceTicketPetroScreen: React.FC<Props> = ({ onSubmit, goBack, onPressAddNewTicket, onPressEditTicket, onPressDeleteTicket, ticketsList }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [cfdiList, setCfdiList] = useState([]);
  const [Cfdi, setCfdi] = useState<string>('');
  const [PaymentMethod, setPaymentMethod] = useState<string>('');
  const {
    control,
    formState: { isValid },
    setValue,
    trigger
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
        <CustomText text="Facturar Petro Seven" typography="h3" fontBold textAlign="center" />
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
              <Container row space="between" style={{ marginTop: 22, marginBottom: 8, marginHorizontal: 16 }} alignment="start">
                <TextContainer text="ESTACIÓN" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" />
                <TextContainer text="FOLIO" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" />
                <TextContainer text="WEB ID" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" />
                <TextContainer text="TOTAL" fontBold typography="h6" textColor={theme.fontColor.grey} fontWeight="900" marginRight={30} />
              </Container>
              {ticketsList.map((ticket, i) => (
                <ListSwipeableItem
                  key={i}
                  onPressEdit={onPressEditTicket}
                  onPressDelete={onPressDeleteTicket}
                  ticketPetro={ticket}
                  index={i}
                  rowRefs={rowRefs}
                />
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
                rules={openField(1)}
                options={cfdiList}
                optionsIdField="c_use_cfdi"
                optionsValueField="description"
                onSelect={value => {
                  if (typeof value === 'object') {
                    setCfdi(value['c_use_cfdi']);
                    setValue('cfdi', value ? cfdiList.find(i => i['c_use_cfdi'] === value['c_use_cfdi'])!['description'] : '');
                  } else {
                    setCfdi(value);
                    setValue('cfdi', value ? cfdiList.find(i => i['c_use_cfdi'] === value)!['description'] : '');
                  }
                  trigger('cfdi');
                }}
                androidMode="dialog"
                placeholder={`Seleccionar`}
                label="Selecciona el uso de CFDI:"
              />
              <TextContainer typography="h5" fontBold text={`Forma de pago`} marginTop={21} />
              <Select
                name="payment_method"
                control={control}
                rules={openField(1)}
                options={PAYMENT_METHODS}
                optionsIdField="id"
                optionsValueField="name"
                onSelect={value => {
                  if (typeof value === 'object') {
                    setPaymentMethod(value['id']);
                    setValue('payment_method', value ? PAYMENT_METHODS.find(i => i.id === value['id'])?.name : '');
                  } else {
                    setPaymentMethod(value);
                    setValue('payment_method', value ? PAYMENT_METHODS.find(i => i.id === value)?.name : '');
                  }
                  trigger('payment_method');
                }}
                androidMode="dialog"
                placeholder={`Seleccionar`}
                label="Selecciona la forma de pago:"
              />
            </Container>
          </Container>

          <Container style={{ paddingHorizontal: 16 }}>
            <Button
              disabled={!isValid || ticketsList.length === 0}
              marginTop={16}
              round
              fontBold
              fontSize="h4"
              onPress={() => onSubmit(Cfdi, PaymentMethod)}
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

export default InvoiceTicketPetroScreen;
