import React from 'react';
import { StyleSheet } from 'react-native';
import { ICONN_DELETE_SHOPPING_CART_ITEM } from 'assets/images';
import theme from 'components/theme/theme';
import { Button, Container, TextContainer, TouchableText } from 'components';
import { Image } from 'react-native';
import { useAlert, useToast } from 'context';
import { authServices } from 'services';


interface Props {
  onPressClose: () => void;
  visible: boolean
  logOut: () => void;
}

import { RootState, useAppSelector } from 'rtk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParams } from '../../../../navigation/types';

const DeleteAccountScreen: React.FC<Props> = ({ visible, onPressClose, logOut }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const alert = useAlert();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { containerStyle } = styles;

  const deleteAccountConfirmation = () => {
    console.log('deleting user account');
    try {
      if (user.id) {
        console.log('---------------');
        console.log(user.id);
        console.log(user.userId);
        console.log('---------------');

      }

      toast.show({
        message: 'Cuenta eliminada con éxito',
        type: 'success'
      });

      logOut();
    } catch (error) {
      toast.show({
        message: 'No se pudo eliminar tu cuenta, por favor inténtalo más tarde.',
        type: 'error'
      });
    }
  };

  const showAlert = () => {
    alert.show(
      {
        title: '¿Seguro que quieres eliminar tu cuenta?',
        message: 'Dentro de 7 días tu cuenta y contenido se eliminarán de forma permanente e irreversible.',
        acceptTitle: 'Eliminar',
        cancelTitle: 'Cancelar',
        cancelOutline: 'iconn_light_grey',
        cancelTextColor: 'iconn_dark_grey',
        onAccept() {
          deleteAccountConfirmation();
          alert.hide();
        },
        onCancel() {
          alert.hide('cancelar');
        }
      },
      'deleteCart',
      false,
      true
    );
  };

  return (
    <Container center style={{ backgroundColor: theme.brandColor.iconn_white }}>
      <Container style={{ width: '80%', height: '100%' }}>
        <Container>
          <Container style={{ marginTop: 30 }}>
            <TextContainer
              numberOfLines={3}
              text={'Estás intentando eliminar tu cuenta. El proceso tiene una duración de 7 días hábiles.'}
              fontSize={14}
              marginTop={4}
            ></TextContainer>
            <TextContainer
              numberOfLines={3}
              text={'Antes de continuar, considera lo siguiente:'}
              fontSize={14}
              marginTop={16}
            ></TextContainer>
          </Container>
          <Container row style={{ marginTop: 30 }}>
            <TextContainer
              text={"⬤"}
              fontSize={12}
              marginTop={10}
              marginLeft={5}
              marginRight={5}
              textColor={theme.brandColor.iconn_green_original}
            ></TextContainer>
            <TextContainer
              numberOfLines={3}
              text={'Perderás el historial de tus pedidos, así como cualquier artículo o servicio.'}
              fontSize={14}
              marginTop={4}
              marginLeft={5}
            ></TextContainer>
          </Container>
          <Container row style={{ marginTop: 30 }}>
            <TextContainer
              text={"⬤"}
              fontSize={12}
              marginTop={10}
              marginLeft={5}
              marginRight={5}
              textColor={theme.brandColor.iconn_green_original}
            ></TextContainer>
            <TextContainer
              numberOfLines={3}
              text={'Ya no podrás recuperar tu cuenta actual, para comprar otra vez deberás registrarte nuevamente.'}
              fontSize={14}
              marginTop={4}
              marginLeft={5}
            ></TextContainer>
          </Container>
          <Container row style={{ marginTop: 30 }}>
            <TextContainer
              text={"⬤"}
              fontSize={12}
              marginTop={10}
              marginLeft={5}
              marginRight={5}
              textColor={theme.brandColor.iconn_green_original}
            ></TextContainer>
            <TextContainer
              numberOfLines={3}
              text={'Al eliminar tu cuenta, aceptas haber leído nuestro, Aviso de privacidad.'}
              fontSize={14}
              marginTop={4}
              marginLeft={5}
            ></TextContainer>
          </Container>
          <Container style={{ marginTop: 110 }}>
            <Button length="long"
              fontColor='dark'
              fontSize="h5"
              round
              fontBold
              leftIcon={<Image source={ICONN_DELETE_SHOPPING_CART_ITEM} />}
              borderColor="iconn_med_grey"
              style={{ marginTop: 1, marginBottom: 5, backgroundColor: theme.brandColor.iconn_white, height: 50, borderRadius: 10 }}
              onPress={showAlert}>Eliminar cuenta</Button>
          </Container>
          <Container center style={{ marginTop: 30 }}>
            <TouchableText underline textColor={theme.brandColor.iconn_accent_principal} text="Regresar" typography="h5" fontBold onPress={() => {
              navigate('Profile');
            }} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
    maxHeight: '80%'
  }
});

export default DeleteAccountScreen;
