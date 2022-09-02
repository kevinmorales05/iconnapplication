import React, { useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppDispatch, useAppSelector, deleteTicketSevenFromList, Address } from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { AddressModalScreen } from 'components';
import AddressesScreen from './AddressesScreen';
import { CrudType } from 'components/types/crud-type';
import theme from 'components/theme/theme';

const AddressesController: React.FC = () => {
  const { goBack, push } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const [address, setAddress] = useState<Address>();
  const [mode, setMode] = useState<CrudType>('create');
  const [addressModalScreenVisible, setAddressModalScreenVisible] = useState(false);
  const [modalScreenTitle, setModalScreenTitle] = useState<string>('');

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const editAddress: any = (address: Address, position: number) => {};

  const onPressAddNewAddress = () => {
    console.log('Despliega modal screen...');
    setModalScreenTitle('Agregar dirección')
    setAddressModalScreenVisible(true);
  };

  const onPressCloseModalScreen = () => {
    setAddressModalScreenVisible(false);
  };

  const deleteAddress: any = (ticket: any, index: number) => {
    alert.show(
      {
        title: 'Borrar ticket',
        message: 'Deseas borrar el ticket capturado.',
        acceptTitle: 'Cancelar',
        cancelTitle: 'Borrar',
        cancelOutline: 'iconn_error',
        cancelTextColor: 'iconn_error',
        onCancel() {
          alert.hide();
          dispatch(deleteTicketSevenFromList(index));
          toast.show({ message: 'Ticket borrado correctamente.', type: 'success' });
        },
        onAccept() {
          alert.hide();
        }
      },
      'error'
    );
  };

  const onSubmit = async (address: any) => {    
    // loader.show();
    try {
      // const response = await dispatch(
      //   getInvoiceThunk({
      //     establishment: 2,
      //     rfc: defaultProfile?.rfc!,
      //     zipCode: defaultProfile?.zip_code!,
      //     taxRegime: defaultProfile?.tax_code_key!,
      //     businessName: defaultProfile?.business_name!,
      //     methodOfPayment: invoicingPaymentMethodForSevenTicketList,
      //     store: invoicingStoreForSevenTicketList,
      //     invoicingProfileId: defaultProfile?.invoicing_profile_id!,
      //     cfdiUse: cfdi,
      //     tickets: invoicingSevenTicketList.map(t => t.ticketNo)
      //   })
      // ).unwrap();
      // if (response.responseCode === 75) {
      //   dispatch(resetInvoicingSevenTicketList());
      //   navigate('InvoiceGeneratedSeven', { invoiceGenerated: response.data });
      // } else {
      //   toast.show({ message: `Error ${response.responseCode} \n ${response.responseMessage}`, type: 'error' });
      // }
    } catch (error) {
      console.warn(error);
    }
  };


  const addresses: Address[] = [
    {
      postalCode: '50345',
      state: 'Estado de Mexico',
      city: 'Toluca',
      colony: 'Las Misiones',
      streetAndNumber: 'Convento de los angeles. Int 56',
      longitude: 'string',
      latitude: 'string',
      default: true,
      tag: 'Casa',
    },
    {
      postalCode: '50345',
      state: 'Estado de Mexico',
      city: 'Toluca',
      colony: 'Las Misiones',
      streetAndNumber: 'Calle Miguel Hidalgo No. 23',
      longitude: 'string',
      latitude: 'string',
      default: true,
      tag: 'Oficina',
    }
  ]

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <AddressesScreen
        addresses={user.addresses!}
        // addresses={addresses}
        onPressEdit={editAddress}
        onPressDelete={deleteAddress}
        goBack={goBack}
        onPressAddNewAddress={onPressAddNewAddress}
      />
      <AddressModalScreen
        visible={addressModalScreenVisible}
        address={address!}
        mode={mode}
        title={modalScreenTitle}
        onSubmit={onSubmit}
        onPressEditAddress={editAddress}
        onPressDeleteAddress={deleteAddress}
        onPressClose={onPressCloseModalScreen}
      />
    </SafeArea>
  );
};

export default AddressesController;
