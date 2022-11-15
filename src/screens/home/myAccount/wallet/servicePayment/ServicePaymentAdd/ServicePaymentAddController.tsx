import React, { useState } from 'react';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeArea } from 'components/atoms/SafeArea';
import { ServicePaymentHelper, ServicePaymentScreen } from 'components';
import { useNavigation } from '@react-navigation/native';
import { WalletStackParams } from 'navigation/types';

/**
 * This is a component with typing for route, this is the best way for this kind of typing.
 * @param route
 * @returns React.FC
 */
const ServicePaymentAddController: React.FC<any> = ({ route }: NativeStackScreenProps<WalletStackParams, 'ServicePaymentAdd'>) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<WalletStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  const onPressQuestionButton = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    setHelpVisible(false);
  };

  const onSubmit = () => {
    // console.log('Submiting service...', route.params.servicePayment.helpImageURL);
    // TODO: Arcus request...
    navigate('ServicePaymentQRDetail');
  };

  return (
    <SafeArea barStyle="dark">
      <ServicePaymentScreen mode="create" servicePayment={route.params.servicePayment} onSubmit={onSubmit} onPressQuestionButton={onPressQuestionButton} />
      <ServicePaymentHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        message={
          'Captura el número de servicio impreso en tu\nrecibo. Lo puedes encontrar en la cabecera del\nrecibo o cerca del código de barras al pie de\npágina.'
        }
        img={route.params.servicePayment.helpImageURL}
      />
    </SafeArea>
  );
};

export default ServicePaymentAddController;
