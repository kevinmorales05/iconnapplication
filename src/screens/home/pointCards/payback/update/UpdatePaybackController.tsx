import React, { useState } from 'react';
import UpdatePaybackScreen from './UpdatePaybackScreen';
import { RootState, useAppSelector } from 'rtk';
import { vtexDocsServices } from 'services';
import theme from 'components/theme/theme';
import { SafeArea } from 'components';
import { useToast } from 'context';

interface Props {

}

const UpdatePaybackController: React.FC<Props> = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [paybackCardToUpdate, setPaybackCardToUpdate] = useState('');
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { cardNumber } = userFields
    let paybackPointCardBody = { type: 'preferente', userId: user.userId, isActive: true, barCode: cardNumber };
    try {
      if (cardNumber.length == 18) {
        const response = vtexDocsServices.createDoc('PC', paybackPointCardBody).then(cardSaved => {
          if (cardSaved) {
            setPaybackCardToUpdate(cardSaved.DocumentId);
          }
        });
      } else {
      }
    } catch (error) {
      toast.show({
        message: 'Hubo un error al guardar tus datos.\nIntenta mas tarde.',
        type: 'error'
      });
    } finally {

    }
  };

  const deletePointCard = async () => {
    vtexDocsServices.deleteDocByDocID('PC', paybackCardToUpdate);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <UpdatePaybackScreen
        onSubmit={onSubmit} deleteCard={deletePointCard} cardToUpdate={paybackCardToUpdate} />
    </SafeArea>
  );
};

export default UpdatePaybackController;
