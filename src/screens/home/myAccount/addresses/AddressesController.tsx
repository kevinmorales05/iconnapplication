import React, { useCallback, useEffect, useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { AddressModalScreen } from 'components';
import AddressesScreen from './AddressesScreen';
import theme from 'components/theme/theme';
import { useAddresses } from '../hooks/useAddresses';
import { getUserAddressesThunk, RootState, useAppDispatch, useAppSelector } from 'rtk';

const AddressesController: React.FC = () => {
  const {
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
  } = useAddresses();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  /**
   * Load User Addresses List and store it in the redux store
   */
  const fetchAddresses = useCallback(async () => {
    // loader.show();
    await setRefreshing(true);
    if (user.id) {
      await dispatch(getUserAddressesThunk(user.id!));
      setRefreshing(false);
    }
  }, []);

  /**
   * We get the user addresses just if there isn`t any address.
   * TODO: if you need reload addresses on each load of the home screen, please remove the "if" sentence.
   */
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <SafeArea topSafeArea={true} bottomSafeArea={true} barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <AddressesScreen
        refreshing={refreshing}
        onRefresh={fetchAddresses}
        addresses={user.addresses!}
        onPressEdit={editAddress}
        onPressDelete={removeAddress}
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
        postalCodeError={postalCodeError}
        setPostalCodeError={setPostalCodeError}
      />
    </SafeArea>
  );
};

export default AddressesController;
