import { CrudType } from 'components/types/crud-type';
import { useAlert, useEnterModal, useLoading, useToast } from 'context';
import { useCallback, useEffect, useState } from 'react';
import {
  addAddressToList,
  Address,
  deleteAddressFromList,
  PostalCodeInfo,
  replaceAddressFromList,
  RootState,
  setAddressDefault,
  useAppDispatch,
  useAppSelector
} from 'rtk';
import {
  deleteUserAddressThunk,
  getAddressByPostalCodeThunk,
  getUserAddressesThunk,
  saveUserAddressThunk,
  updateUserAddressThunk
} from 'rtk/thunks/vtex-addresses.thunks';

export const useAddresses = () => {
  const { loading, user, isGuest } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const loader = useLoading();
  const toast = useToast();
  const enter = useEnterModal();
  const [address, setAddress] = useState<Address | null>();
  const [mode, setMode] = useState<CrudType | null>(null);
  const [addressModalScreenVisible, setAddressModalScreenVisible] = useState(false);
  const [modalScreenTitle, setModalScreenTitle] = useState<string>('');
  const [postalCodeInfo, setPostalCodeInfo] = useState<PostalCodeInfo | null>();
  const [position, setPosition] = useState<number | null>();
  const [IDToUpdate, setIDToUpdate] = useState<string | null>();
  const [postalCodeError, setPostalCodeError] = useState('');

  useEffect(() => {
    if (loading === false) {
      loader.hide();
    }
  }, [loading]);

  const fetchAddresses = useCallback(async () => {
    if (user.id) {
      await dispatch(getUserAddressesThunk(user.id!));
    }
  }, []);

  const fetchAddressByPostalCode = useCallback(async (postalCode: string) => {
    const data = await dispatch(getAddressByPostalCodeThunk(postalCode)).unwrap();
    const { state, city } = data;
    if (state === '' || city === '') {
      setPostalCodeError('Código no encontrado.');
    }
    setPostalCodeInfo(data);
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  /**
   * If no address is default, one is set.
   * This validation is important specifically when the default address is removed, this way the user will never be left without a default address.
   */
  useEffect(() => {
    const isThereAnyDefault = user.addresses!.filter(x => x.isDefault === true);
    if (isThereAnyDefault.length === 0 && user.addresses!.length > 0) dispatch(setAddressDefault(0));
  }, [user.addresses]);

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
    if (isGuest) {
      enter.show({
        secondaryMessage: 'Guarda tus direcciones de envío para hacer\npedidos más rápido, o continúa tu compra\ncomo invitado desde la canasta..'
      });
      return;
    }

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
        toast.show({ message: 'Dirección eliminada\n correctamente.', type: 'success' });
      } else {
        toast.show({ message: 'Ocurrió un error inesperado.', type: 'warning' });
      }
    } catch (error: any) {
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
   * Function to save and update a user address.
   * @param addressTosubmit
   */
  const onSubmit = async (addressTosubmit: Address) => {
    onPressCloseModalScreen();
    loader.show();

    const addressPayload: Address = {
      addressName: addressTosubmit.tag,
      receiverName: `${user.name} ${user.lastName} ${user.secondLastName}`,
      city: addressTosubmit.city,
      state: addressTosubmit.state,
      country: 'MEX',
      postalCode: addressTosubmit.postalCode,
      street: addressTosubmit.street,
      neighborhood: addressTosubmit.neighborhood,
      reference: addressTosubmit.reference,
      userId: user.id //TODO revisar definicion user.userid o user.id
    };

    try {
      let response: any;
      if (mode === 'create') {
        response = await dispatch(saveUserAddressThunk(addressPayload)).unwrap();
        if (response) {
          addressPayload.id = response.DocumentId;
          if (user.addresses?.length === 0) addressPayload.isDefault = true; // if is the first address in the list, it's set to true (default address).
          dispatch(addAddressToList(addressPayload));
          toast.show({ message: 'Dirección guardada\n correctamente.', type: 'success' });
        } else {
          toast.show({ message: 'Ocurrió un error inesperado al guardar la dirección.', type: 'warning' });
        }
      } else if (mode === 'update') {
        addressPayload.id = IDToUpdate!;
        response = await dispatch(updateUserAddressThunk(addressPayload)).unwrap();
        if (!response) {
          addressPayload.isDefault = address?.isDefault;
          dispatch(replaceAddressFromList({ address: addressPayload, position: position! }));
          toast.show({ message: 'Dirección actualizada\n correctamente.', type: 'success' });
        } else {
          toast.show({ message: 'Ocurrió un error inesperado al actualizar la dirección.', type: 'warning' });
        }
      }
    } catch (error: any) {
      toast.show({ message: error, type: 'error' });
    }
  };

  return {
    user,
    editAddress,
    removeAddress,
    onPressAddNewAddress,
    addressModalScreenVisible,
    postalCodeInfo,
    address,
    mode,
    modalScreenTitle,
    fetchAddressByPostalCode,
    onSubmit,
    onPressCloseModalScreen,
    postalCodeError,
    setPostalCodeError
  };
};
