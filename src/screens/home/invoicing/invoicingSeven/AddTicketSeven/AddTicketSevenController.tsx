import React, { useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketSevenScreen from './AddTicketSevenScreen';
import { useToast } from 'context';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_SEVEN_REFERENCE } from 'assets/images';

const AddTicketSevenController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = (fields: SubmitHandler<FieldValues>): void => {
    console.log('Datos del Ticket Seven...', fields);
    toast.show({ message: 'Ticket agregado correctamente.', type: 'success' });
    navigate('InvoiceTicketSeven');
  };

  const onPressHelpIcon = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    setHelpVisible(false);
  };

  const onPressScan = () => {
    console.log('onPressScan...');
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketSevenScreen onSubmit={onSubmit} goBack={goBack} onPressScan={onPressScan} onPressQuestionButton={onPressHelpIcon} />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar los 35 dígitos del código de\nbarras del ticket en tu comprobante físico.`}
        img={ICONN_INVOICING_SEVEN_REFERENCE}
      />
    </SafeArea>
  );
};

export default AddTicketSevenController;
