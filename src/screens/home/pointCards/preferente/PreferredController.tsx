import React, { useState } from 'react';
import PreferredScreen from './PreferredScreen';
import { SafeArea } from 'components';
import theme from 'components/theme/theme';
import { vtexDocsServices } from 'services';
import { RootState, useAppSelector } from 'rtk';
import { useToast } from 'context';

interface Props {

}

const PreferredController: React.FC<Props> = () => {

  const { user } = useAppSelector((state: RootState) => state.auth);
  const [preferenteCardToUpdate, setPreferenteCardToUpdate] = useState('');
  const toast = useToast();

  const onSubmit = async (userFields: any) => {
    let { cardNumber } = userFields
    let preferentePointCardBody = { type: 'preferente', userId: user.userId, isActive: true, barCode: cardNumber };
    try {
      if (cardNumber.length == 18) {
        const response = vtexDocsServices.createDoc('PC', preferentePointCardBody).then(cardSaved => {
          if (cardSaved) {
            setPreferenteCardToUpdate(cardSaved.DocumentId);
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
    vtexDocsServices.deleteDocByDocID('PC', preferenteCardToUpdate);
  };

  return (
    <SafeArea
      childrenContainerStyle={{ paddingHorizontal: 0 }}
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor={theme.brandColor.iconn_background}
      barStyle="dark"
    >
      <PreferredScreen
        onSubmit={onSubmit} deleteCard={deletePointCard} cardToUpdate={preferenteCardToUpdate} />
    </SafeArea>
  );
};

export default PreferredController;
