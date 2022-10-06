import React, { useState } from 'react';
import { Image, RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, AddressCard, InfoCard } from 'components';
import { ICONN_NO_ADDRESSES } from 'assets/images';
import { Address } from 'rtk';
import NetInfo from '@react-native-community/netinfo';

interface Props {
  addresses: Address[];
  onPressAddNewAddress: () => void;
  onPressEdit: (address: Address, position: number) => void;
  onPressDelete: (address: Address, position: number) => void;
  onRefresh: ()=>{};
  refreshing: boolean;
}

const AddressesScreen: React.FC<Props> = ({ addresses, onPressAddNewAddress, onPressEdit, onPressDelete, onRefresh, refreshing }) => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(false);

  NetInfo.fetch().then(state => {
    if (state.isInternetReachable) {
      setIsOnline(true);
    }
  });

  const order = (a: any, b: any) => {
    return a < b ? -1 : a > b ? 1 : 0;
  };
  

  return (
    <Container flex useKeyboard>
      <ScrollView
        bounces={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{
              onRefresh()
            }}
          />
        }
      >
        <Container flex>
          {!isOnline ? (
            <InfoCard text={`No podemos cargar la información,\n revisa tu conexión a intenta mas tarde.`} />
          ) : addresses.length === 0 ? (
            <Container center style={{ top: '40%' }}>
              <Image source={ICONN_NO_ADDRESSES} style={{ width: 40, height: 40 }} />
              <TextContainer text="Sin direcciones guardadas" fontBold marginTop={10} />
              <TextContainer text={`¡Aún no tienes ninguna\ndirección guardada!`} typography="description" textAlign="center" marginTop={11} />
            </Container>
          ) : (
            addresses
              .map(function (address, i) {
                return (
                  <AddressCard
                    key={i}
                    address={address}
                    onPressEdit={() => onPressEdit(address, i)}
                    onPressDelete={() => onPressDelete(address, i)}
                    index={i}
                  />
                );
              })
              .sort(order)
          )}
        </Container>
        <Container>
          <Button color="iconn_green_original" marginTop={16} round fontBold fontSize="h4" onPress={onPressAddNewAddress}>
            Agregar dirección
          </Button>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default AddressesScreen;
