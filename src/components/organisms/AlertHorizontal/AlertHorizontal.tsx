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

const AlertHorizontal: React.FC<Props> = ({
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
      <Container middle style={{marginTop: 24}} >
        <TextContainer text={title!} typography='h3' fontWeight='600' marginTop={15} marginHorizontal={32} textAlign='center'/>
        {message !== '' && ( <TextContainer text={message} typography="h5" marginTop={16} marginHorizontal={16} textAlign='center'/> )}
        {secondMessage !== '' && ( 
          <TextContainer text={secondMessage} typography="h5" marginTop={40} marginBottom={10} marginHorizontal={16} textAlign='center' fontBold textColor={theme.brandColor.iconn_green_original}/> 
        )}
        <Container space='between' row style={{ marginBottom: 5, paddingHorizontal: 10, width: "100%", marginTop: 45}}>
          {cancelTitle && (
            <Button size={"xxsmall"} borderColor={cancelOutline} fontSize='h3' fontBold color={cancelTextColor} round onPress={onCancel!} outline length='short' width='xsmall'>
              {cancelTitle || 'Cancelar'}
            </Button>
          )}
          {acceptTitle && (
            <Button size={"xxsmall"} borderColor={'iconn_red_original'} fontSize='h3' fontBold color='iconn_white' style={{backgroundColor: theme.brandColor.iconn_red_original, borderRadius: 10}} round onPress={onAccept!} length='short' width='xsmall' >
              {acceptTitle || 'Aceptar'}
            </Button>
          )}
        </Container>
      </Container>
    </ModalCard>
  );
};

export type { AlertDataInterface }
export { AlertHorizontal };
