import React from 'react';
import { Container } from 'components/atoms';
import { Button, ModalCard, TextContainer } from 'components/molecules';
import { modalType } from 'components/types/modal-type';

interface AlertDataInterface {
  title?: string;
  message?: string;
  acceptTitle?: string;
  cancelTitle?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

interface Props {
  visible: boolean;
  data: AlertDataInterface;
  onDismiss?: () => void;
  type: modalType;
}

const Alert: React.FC<Props> = ({
  visible,
  data: {
    title,
    message = '',
    onAccept,
    onCancel,
    acceptTitle,
    cancelTitle
  },
  onDismiss,
  type
}: Props) => {  

  return (
    <ModalCard visible={visible} onDismiss={onDismiss} secondButton={cancelTitle ? true : false} type={type}>
      <Container style={{marginTop: 40}} >
        <TextContainer text={title} typography='h1' fontWeight='600' marginTop={12} marginHorizontal={32} textAlign='center'/>
        {message !== '' && ( <TextContainer text={message} typography="h3" marginTop={16} marginHorizontal={16} textAlign='center'/> )}
        <Container style={{ marginTop: 32 }}>
          {acceptTitle && (
            <Button borderColor='iconn_med_grey' fontSize='h3' fontBold color='iconn_dark_grey' round onPress={onAccept!} outline length='short' style={{width:'95%', marginHorizontal:16, alignSelf:'center'}} >
              {acceptTitle || 'Aceptar'}
            </Button>
          )}
          {cancelTitle && (
            <Button borderColor='iconn_med_grey' fontSize='h3' fontBold color='iconn_dark_grey' round onPress={onCancel!} outline length='short' style={{width:'95%', marginHorizontal:16, alignSelf:'center', marginTop: 8}}>
              {cancelTitle || 'Cancelar'}
            </Button>
          )}
        </Container>
      </Container>
    </ModalCard>
  );
};

export type { AlertDataInterface }
export { Alert };
