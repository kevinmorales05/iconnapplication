import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert } from 'context';
import { InvoicingProfile } from 'lib/models/InvoicingProfile';
import { invoicingServices } from 'services';
import { SubmitHandler, FieldValues } from 'react-hook-form';

const CreateTaxProfileController: React.FC = () => {
  const alert = useAlert();

  const onDelete = async () => {
    alert.show({
      title: 'Eliminar perfil fiscal',
      message: 'Puedes registrarlo de nuevo en otro momento.',
      acceptTitle: 'Entendido',
      onAccept() {
        alert.hide();

        try {
          // const data = await invoicingServices.deleteInvoicingProfile(invoicingProfile);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const submit = (invoicingProfile: InvoicingProfile) => {
    console.log("submit from controller:",invoicingProfile)

  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen submit={submit} onDelete={onDelete} />
    </SafeArea>
  );
};

export default CreateTaxProfileController;
