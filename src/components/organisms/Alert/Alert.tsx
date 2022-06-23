import React from 'react';
import { Container } from 'components/atoms';
import { ModalCard, TextContainer, TouchableText } from 'components/molecules';

interface AlertDataInterface {
  title: string;
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
  onDismiss
}: Props) => {  

  return (
    <ModalCard visible={visible} onDismiss={onDismiss}>
      <TextContainer text={title} marginTop={12} />
      {message !== '' && (
      <TextContainer
        text={message}
        typography="h2"
        marginTop={8}
      />
      )}
      <Container row alignment="end" style={{ marginTop: 20 }}>
        {onCancel && (
          <TouchableText text={cancelTitle || 'Cancelar'} onPress={onCancel} />
        )}
        {onAccept && (
          <TouchableText text={acceptTitle || 'Aceptar'} onPress={onAccept} />
        )}
      </Container>
    </ModalCard>
  );
};

export type { AlertDataInterface }
export { Alert };
