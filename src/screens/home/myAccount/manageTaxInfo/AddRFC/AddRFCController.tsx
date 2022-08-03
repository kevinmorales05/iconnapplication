import React from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import { BillingScreen } from 'components';
import { useAlert } from 'context';
import { InvoicingProfile } from 'lib/models/InvoicingProfile';

const AddRFCController: React.FC = () => {
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

  const onSubmit = async (invoicingProfile: InvoicingProfile) => {
    console.log("submit from controller:")

  };

  return (
    <SafeArea childrenContainerStyle={{ paddingHorizontal: 0 }} topSafeArea={false} bottomSafeArea barStyle="dark">
      <BillingScreen onSubmit={onSubmit} onDelete={onDelete} />
    </SafeArea>
  );
};

export default AddRFCController;
