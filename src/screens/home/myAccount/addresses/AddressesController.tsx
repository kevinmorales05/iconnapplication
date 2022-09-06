import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { AddressModalScreen } from 'components';
import AddressesScreen from './AddressesScreen';
import theme from 'components/theme/theme';
import { useAddresses } from '../hooks/useAddresses';

const AddressesController: React.FC = () => {
  const {
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
    onPressCloseModalScreen
  } = useAddresses();

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <AddressesScreen addresses={user.addresses!} onPressEdit={editAddress} onPressDelete={removeAddress} onPressAddNewAddress={onPressAddNewAddress} />
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
