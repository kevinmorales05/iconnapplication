import React, { useCallback, useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { RootState, useAppDispatch, useAppSelector, Address, PostalCodeInfo, deleteAddressFromList, addAddressToList, replaceAddressFromList } from 'rtk';
import { useAlert, useLoading, useToast } from 'context';
import { AddressModalScreen } from 'components';
import AddressesScreen from './AddressesScreen';
import { CrudType } from 'components/types/crud-type';
import theme from 'components/theme/theme';
import {
  deleteUserAddressThunk,
  getAddressByPostalCodeThunk,
  getUserAddressesThunk,
  saveUserAddressThunk,
  updateUserAddressThunk
} from 'rtk/thunks/vtex-addresses.thunks';

const AddressesController: React.FC = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { loading, user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const [address, setAddress] = useState<Address | null>();
  const [mode, setMode] = useState<CrudType | null>(null);
  const [addressModalScreenVisible, setAddressModalScreenVisible] = useState(false);
  const [modalScreenTitle, setModalScreenTitle] = useState<string>('');
  const [postalCodeInfo, setPostalCodeInfo] = useState<PostalCodeInfo | null>();
  const [position, setPosition] = useState<number | null>();
  const [IDToUpdate, setIDToUpdate] = useState<string | null>();

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const fetchAddresses = useCallback(async () => {
    await dispatch(getUserAddressesThunk(user.user_id!));
  }, []);

  const fetchAddressByPostalCode = useCallback(async (postalCode: string) => {
    const data = await dispatch(getAddressByPostalCodeThunk(postalCode)).unwrap();
    setPostalCodeInfo(data);
  }, []);

  useEffect(() => {
    if (user.addresses?.length === 0) fetchAddresses();
  }, [fetchAddresses]);

  const editAddress: any = (address: Address, position: number) => {
    fetchAddressByPostalCode(address.postalCode!);
    setAddress(address);
    setPosition(position);
    setIDToUpdate(address.id);
    setModalScreenTitle('Editar dirección');
    setAddressModalScreenVisible(true);
    setMode('update');
  };

  const onPressAddNewAddress = () => {
    setPostalCodeInfo(null);
    setAddress(null);
    setPosition(null);
    setIDToUpdate(null);
    setModalScreenTitle('Agregar dirección');
    setAddressModalScreenVisible(true);
    setMode('create');
  };

  const onPressCloseModalScreen = () => {
    setAddressModalScreenVisible(false);
    setMode(null);
  };

  const deleteAdress = async (address: Address, position: number) => {
    try {
      const response = await dispatch(deleteUserAddressThunk(address.id!)).unwrap();
      if (!response) {
        // TODO: WARNING: the vtex api responses with 204 (No content) when is a successful response,
        // that is a wrong definition of the response and could be a "false positive".
        dispatch(deleteAddressFromList(position));
        toast.show({ message: `Dirección eliminada\n correctamente.`, type: 'success' });
      } else {
        toast.show({ message: `Ocurrió un error inesperado.`, type: 'warning' });
      }
    } catch (error) {
      toast.show({ message: error, type: 'error' });
    }
  };

  const removeAddress: any = (address: Address, position: number) => {
    alert.show(
      {
        title: 'Eliminar Dirección',
        message: '¿Estás seguro que quieres eliminar esta dirección de tu cuenta?',
        acceptTitle: 'Cancelar',
        cancelTitle: 'Eliminar',
        cancelOutline: 'iconn_error',
        cancelTextColor: 'iconn_error',
        onCancel() {
          alert.hide();
          deleteAdress(address, position);
        },
        onAccept() {
          alert.hide();
        }
      },
      'error'
    );
  };

  /**
   * Function to save and a new user address.
   * @param address
   */
  const onSubmit = async (address: Address) => {
    onPressCloseModalScreen();
    loader.show();

    const addressPayload: Address = {
      addressName: address.tag,
      receiverName: `${user.name} ${user.lastName} ${user.secondLastName}`,
      city: address.city,
      state: address.state,
      country: 'MX',
      postalCode: address.postalCode,
      street: address.street,
      neighborhood: address.neighborhood,
      userId: user.user_id
    };

    try {
      let response: any;
      if (mode === 'create') {
        response = await dispatch(saveUserAddressThunk(addressPayload)).unwrap();
        if (response) {
          addressPayload.id = response.DocumentId;
          dispatch(addAddressToList(addressPayload));
          toast.show({ message: `Dirección guardada\n correctamente.`, type: 'success' });
        } else {
          toast.show({ message: `Ocurrió un error inesperado al guardar la dirección.`, type: 'warning' });
        }
      } else if (mode === 'update') {
        addressPayload.id = IDToUpdate!;
        response = await dispatch(updateUserAddressThunk(addressPayload)).unwrap();
        if (!response) {
          dispatch(replaceAddressFromList({ address: addressPayload, position: position! }));
          toast.show({ message: `Dirección actualizada\n correctamente.`, type: 'success' });
        } else {
          toast.show({ message: `Ocurrió un error inesperado al actualizar la dirección.`, type: 'warning' });
        }
      }
    } catch (error) {
      toast.show({ message: error, type: 'error' });
    }
  };

  const addresses: Address[] = [
    {
      addressName: "Mariano 1's house",
      addressType: 'residential',
      city: 'Mexicdfsdfsdo',
      complement: 'N/A',
      country: 'MX',
      countryfake: 'null',
      geoCoordinate: 'null',
      neighborhood: 'Jardines de Morelos',
      number: '2',
      postalCode: '55070',
      receiverName: 'Ale Almanza',
      reference: 'Sagúan Gris',
      state: 'MESDFSDFSDFXICO',
      street: 'Playa Ancón',
      userId: 'da5550d6-2a38-11ed-835d-129d14bde747',
      id: '4ffefa11-2af4-11ed-835d-0240205e174d',
      accountId: '3f3d3e79-0620-4445-89f0-8e9c9f37457f',
      accountName: 'oneiconn',
      dataEntityId: 'AD',
      createdBy: '98f99388-668a-43c4-a2db-545be985c236',
      createdIn: '2022-09-02T19:20:42.5568066Z',
      updatedBy: 'null',
      updatedIn: 'null',
      lastInteractionBy: '98f99388-668a-43c4-a2db-545be985c236',
      lastInteractionIn: '2022-09-02T19:20:42.5568066Z',
      followers: [],
      tag: 'AlgunTag',
      auto_filter: 'nul'
    },
    {
      addressName: "Mariano 2's house",
      addressType: 'residential',
      city: 'Mexicdfsdfsdo',
      complement: 'N/A',
      country: 'MX',
      countryfake: 'null',
      geoCoordinate: 'null',
      neighborhood: 'Jardines de Morelos',
      number: '2',
      postalCode: '55070',
      receiverName: 'Ale Almanza',
      reference: 'Sagúan Gris',
      state: 'MESDFSDFSDFXICO',
      street: 'Playa Ancón',
      userId: 'da5550d6-2a38-11ed-835d-129d14bde747',
      id: '4ffefa11-2af4-11ed-835d-0240205e174d',
      accountId: '3f3d3e79-0620-4445-89f0-8e9c9f37457f',
      accountName: 'oneiconn',
      dataEntityId: 'AD',
      createdBy: '98f99388-668a-43c4-a2db-545be985c236',
      createdIn: '2022-09-02T19:20:42.5568066Z',
      updatedBy: 'null',
      updatedIn: 'null',
      lastInteractionBy: '98f99388-668a-43c4-a2db-545be985c236',
      lastInteractionIn: '2022-09-02T19:20:42.5568066Z',
      followers: [],
      tag: 'AlgunTag',
      auto_filter: 'nul'
    }
  ];

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <AddressesScreen
        addresses={user.addresses!}
        // addresses={addresses} // This to harcode the addresses array.
        onPressEdit={editAddress}
        onPressDelete={removeAddress}
        goBack={goBack}
        onPressAddNewAddress={onPressAddNewAddress}
      />
      <AddressModalScreen
        visible={addressModalScreenVisible}
        postalCodeInfo={postalCodeInfo!}
        address={address!}
        mode={mode!}
        title={modalScreenTitle}
        onPressFindPostalCodeInfo={fetchAddressByPostalCode}
        onSubmit={onSubmit}
        onPressClose={onPressCloseModalScreen}
      />
    </SafeArea>
  );
};

export default AddressesController;
