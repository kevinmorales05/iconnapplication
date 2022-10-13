import React, { useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextContainer, Button, Container, AddressCard, InfoCard, CustomText } from 'components';
import { ICONN_NO_ADDRESSES } from 'assets/images';
import { Address } from 'rtk';
import NetInfo from '@react-native-community/netinfo';
import theme from 'components/theme/theme';
import { moderateScale } from 'utils/scaleMetrics';
import Octicons from 'react-native-vector-icons/Octicons';

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
        {/* <Container style={styles.containerInfo}>
          <Octicons name="info" size={theme.iconSize.large} color={theme.brandColor.iconn_accent_secondary}/>
          <Container style={{marginLeft: moderateScale(10)}}>
            <CustomText
              text={'Por el momento solo podrás disfrutar de dos tiendas en el código postal 66230.'}
              fontSize={theme.fontSize.h6}
            />
          </Container>
        </Container> */}
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

const styles = StyleSheet.create({
  containerInfo: {
    width: moderateScale(339),
    height: moderateScale(55),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.yellow_container,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_warning,
    marginTop: moderateScale(40),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(40),
    flexDirection: 'row',
    alignItems:'center'
  }
})