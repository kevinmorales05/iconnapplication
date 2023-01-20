import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, AddressCard, TouchableText } from '../../molecules';
import { CustomModal, Container, InfoCard, CustomText, ActionButton } from '../../atoms';
import { ICONN_HOME_LOCATION, ICONN_NO_ADDRESSES } from 'assets/images';
import { Address, RootState, useAppSelector } from 'rtk';
import NetInfo from '@react-native-community/netinfo';
import theme from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import analytics from '@react-native-firebase/analytics';

interface Props {
  visible: boolean;
  addresses: Address[];
  onPressAddNewAddress: () => void;
  onPressEdit: (address: Address, position: number) => void;
  onPressDelete: (address: Address, position: number) => void;
  onPressClose: () => void;
  onPressSetDefault: (address: Address, position: number) => void;
}

const AddressModalSelection: React.FC<Props> = ({ visible, addresses, onPressAddNewAddress, onPressEdit, onPressDelete, onPressClose, onPressSetDefault }) => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);

  NetInfo.fetch().then(state => {
    if (state.isInternetReachable) {
      setIsOnline(true);
    }
  });

  const order = (a: any, b: any) => {
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const { containerStyle } = styles;

  return (
    <CustomModal visible={visible} onDismiss={onPressClose} animationType="slide">
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white,
            height: '90%'
          }}
        >
          <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
            <Container />
            <Container>
              <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Selección de dirección" typography="h3" fontBold />
            </Container>
            <Container>
              <ActionButton
                style={{ marginTop: -6, shadowColor: 'none' }}
                icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                size="xxsmall"
                onPress={onPressClose}
                color="iconn_med_grey"
                circle
              />
            </Container>
          </Container>
          <ScrollView
            bounces={false}
            contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Container flex space={addresses.length === 0 ? 'evenly' : undefined}>
              {!isOnline ? (
                <InfoCard text={`No podemos cargar la información,\n revisa tu conexión a intenta mas tarde.`} />
              ) : addresses.length === 0 ? (
                <Container center>
                  <Image source={ICONN_NO_ADDRESSES} style={{ width: 40, height: 40 }} />
                  <TextContainer text="Sin direcciones guardadas" fontBold marginTop={10} />
                  <TextContainer text={`¡Aún no tienes ninguna\ndirección guardada!`} typography="description" textAlign="center" marginTop={11} />
                </Container>
              ) : (
                addresses
                  .map(function (address, i) {
                    return (
                      <Container key={i} style={{ borderBottomWidth: 1, borderBottomColor: theme.brandColor.iconn_light_grey }}>
                        <AddressCard
                          onPressSetDefault={async () => {
                            try {
                              await analytics().logEvent('hmSelectAddress', {
                                id: user.id,
                                description: 'Seleccionar una tienda de la lista de tiendas disponibles'
                              });
                              //console.log('succesfully added to firebase!');
                            } catch (error) {
                              //console.log(error);
                            }
                            onPressSetDefault(address, i);
                          }}
                          address={address}
                          onPressEdit={() => {
                            onPressClose();
                            onPressEdit(address, i);
                          }}
                          index={i}
                        />
                      </Container>
                    );
                  })
                  .sort(order)
              )}
            </Container>
            <Container flex row center crossCenter style={{ marginTop: 24, alignItems: 'flex-end' }}>
              <Image source={ICONN_HOME_LOCATION} style={{ width: 24, height: 24 }} />
              <TouchableText
                underline
                textColor={theme.brandColor.iconn_green_original}
                text="Agregar nueva dirección"
                typography="h4"
                fontBold
                onPress={onPressAddNewAddress}
                textAlign="center"
                marginLeft={5}
              />
            </Container>
          </ScrollView>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
    maxHeight: '90%'
  }
});

export default AddressModalSelection;
