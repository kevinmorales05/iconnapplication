import React from 'react';
import { Container } from 'components/atoms';
import { Button, ModalCard, TextContainer } from 'components/molecules';
import { modalType } from 'components/types/modal-type';
import { BrandColorTypes } from 'components/types/brand-color-type';
import theme from 'components/theme/theme';

interface AlertDataInterface {
  title?: string;
  message?: string;
  secondMessage?: string;
  acceptTitle?: string;
  cancelTitle?: string;
  cancelOutline?: BrandColorTypes;
  cancelTextColor?: BrandColorTypes;
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
    secondMessage = '',
    onAccept,
    onCancel,
    acceptTitle,
    cancelTitle,
    cancelOutline = 'iconn_med_grey',
    cancelTextColor = 'iconn_dark_grey',
  },
  onDismiss,
  type
}: Props) => {  

  return (
    <ModalCard visible={visible} onDismiss={onDismiss} secondButton={cancelTitle ? true : false} type={type}>
      <Container style={{marginTop: 24}} >
        <TextContainer text={title!} typography='h4' fontWeight='600' marginTop={12} marginHorizontal={32} textAlign='center'/>
        {message !== '' && ( <TextContainer text={message} typography="h5" marginTop={16} marginHorizontal={16} textAlign='center'/> )}
        {secondMessage !== '' && ( 
          <TextContainer text={secondMessage} typography="h5" marginTop={16} marginHorizontal={16} textAlign='center' fontBold textColor={theme.brandColor.iconn_green_original}/> 
        )}
        <Container style={{ marginVertical: 10 }}>
          {acceptTitle && (
            <Button borderColor='iconn_med_grey' fontSize='h3' fontBold color='iconn_dark_grey' round onPress={onAccept!} outline length='short' style={{width:'95%', marginHorizontal:16, alignSelf:'center'}} >
              {acceptTitle || 'Aceptar'}
            </Button>
          )}
          {cancelTitle && (
            <Button borderColor={cancelOutline} fontSize='h3' fontBold color={cancelTextColor} round onPress={onCancel!} outline length='short' style={{width:'95%', marginHorizontal:16, alignSelf:'center', marginTop: 5}}>
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
