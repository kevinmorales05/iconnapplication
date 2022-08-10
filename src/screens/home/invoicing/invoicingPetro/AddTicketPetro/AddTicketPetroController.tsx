import React, { useState } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import AddTicketPetroScreen from './AddTicketPetroScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { InvoicingHelper } from 'components';
import { ICONN_INVOICING_PETRO_REFERENCE } from 'assets/images';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const AddTicketPetroController: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [helpVisible, setHelpVisible] = useState<boolean>(false);

  const onSubmit = (fields: SubmitHandler<FieldValues>):void => {
    console.log('submit from controller...', fields);
  };

  const onPressHelpIcon = () => {
    setHelpVisible(true);
  };

  const onPressOut = () => {
    setHelpVisible(false);
  };

  const onPressScan = () => {
    console.log('onPressScan...')
  }

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <AddTicketPetroScreen onSubmit={onSubmit} goBack={goBack} onPressQuestionButton={onPressHelpIcon} onPressScan={onPressScan} />
      <InvoicingHelper
        onPressOut={onPressOut}
        visible={helpVisible}
        onUnderstood={onPressOut}
        message={`Puedes encontrar la estación, folio y el web ID\ndel ticket a facturar en tu comprobante físico.`}
        img={ICONN_INVOICING_PETRO_REFERENCE}
        />
    </SafeArea>
  );
};

export default AddTicketPetroController;
