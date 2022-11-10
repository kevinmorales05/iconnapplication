import React from 'react';
import ServicePaymentScreen from './ServicePaymentScreen';
import { SafeArea } from 'components/atoms/SafeArea';
import theme from 'components/theme/theme';

const ServicePaymentController: React.FC = () => {
  // const data = await dispatch(getAddressByPostalCodeThunk(postalCode)).unwrap();

  return (
    <SafeArea barStyle="dark" backgroundColor={theme.brandColor.iconn_background}>
      <ServicePaymentScreen servicePaymentList={[]} onSubmit={() => {}} />
    </SafeArea>
  );
};

export default ServicePaymentController;
