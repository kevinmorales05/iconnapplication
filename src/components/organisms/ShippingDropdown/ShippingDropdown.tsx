import { CustomText } from 'components/atoms';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { ImageSource } from 'react-native-vector-icons/Icon';
import theme from 'components/theme/theme';
import { Button, Touchable, Container } from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ICONN_SEVEN_STORE, ICONN_SCOOTER, ICONN_HOUSE_PIN_LOCATION, ICONN_SELLER_PIN_LOCATION } from 'assets/images';
import { Address, RootState, useAppSelector } from 'rtk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import Entypo from 'react-native-vector-icons/Entypo';
import { vtexPickUpPoints } from 'services';
import { useAlert } from 'context';

interface Props {
  onPressAddAddress: () => void;
  onPressShowAddressesModal: () => void;
  address: Address;
  onPressToogle: () => void;
  mode: ShippingMode | null;
  handleMode: (mode: ShippingMode | null) => void;
  isAddressModalSelectionVisible: boolean
}

/*regla de negocio:
  delivery hasta 7 km 
  pickup hasta 20 km
*/

const ShippingDropdown: React.FC<Props> = ({ onPressAddAddress, address, onPressToogle, onPressShowAddressesModal, mode, handleMode, isAddressModalSelectionVisible }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [ near, setNear ] = useState<boolean>(false);
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const alert = useAlert();

  // useEffect(()=>{
  //   if(address?.postalCode){
  //     getPickUpPoints(address?.postalCode).then((isNear)=>{
  //       setNear(isNear);
  //       if(!isNear ){
  //         alert.show(
  //           {
  //             title: 'Entrega a domicilio no disponible.',
  //             message: 'Lo sentimos, por ahora no hay ninguna tienda disponible para envío a domicilio en tu zona, intenta con una nuevo C.P.',
  //             acceptTitle: 'Agregar otra',
  //             cancelTitle: 'Omitir',
  //             cancelOutline: 'iconn_med_grey',
  //             cancelTextColor: 'iconn_accent_secondary',
  //             onCancel() {
  //               alert.hide();
  //             },
  //             onAccept() {
  //               alert.hide();
  //               onPressShowAddressesModal();  
  //             }
  //           },
  //           'error',
  //           true,
  //           true,
  //           true
  //         );
  //       }
  //     })
  //   }
  // },[address])
  
  const getPickUpPoints = async (cp: string) => {
    console.log({getPickUpPoints: cp})
    const pickUp = await vtexPickUpPoints.getPickUpPointsByCP(cp);
    console.log({getPickUpPoints: pickUp})
    let isNear = false;
    if(pickUp.items.length){
      pickUp.items.forEach((store)=>{
        if(store.pickupPoint.id === `${defaultSeller.seller}_${defaultSeller['# Tienda']}`){
          if(store.distance < 7){
            isNear = true;
          }
        }
      })
    }
    return isNear;
  }
  
  console.log({defaultSeller: !address})

  return (
    <Container style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24, backgroundColor: theme.brandColor.iconn_white }}>
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ShippingOption
          selected={mode === ShippingMode.DELIVERY}
          mode={ShippingMode.DELIVERY}
          icon={ICONN_SCOOTER}
          disable={!address || !near}
          text={'A domicilio'}
          onPress={() => {
            handleMode(ShippingMode.DELIVERY);
          }}
          unmark={() => {
            handleMode(null);
          }}
        />
        <ShippingOption
          disable={true}
          mode={ShippingMode.PICKUP}
          selected={mode === ShippingMode.PICKUP}
          icon={ICONN_SEVEN_STORE}
          text={'Recoger en'}
          onPress={() => {
            handleMode(ShippingMode.PICKUP);
          }}
          unmark={() => {
            handleMode(null);
          }}
        />
      </Container>
      {mode !== ShippingMode.PICKUP && (
        <DefaultAddress mode={mode} onPressAddAddress={onPressAddAddress} address={address} onPressShowAddressesModal={onPressShowAddressesModal} isAddressModalSelectionVisible={isAddressModalSelectionVisible} />
      )}
      <DefaultSeller
        onPress={() => {
          navigate('SearchSeller');
        }}
      />
      <Touchable onPress={onPressToogle}>
        <Container style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 5 }}>
          {<AntDesign name="up" size={24} color={theme.brandColor.iconn_green_original} />}
        </Container>
      </Touchable>
    </Container>
  );
};

const DefaultSeller = ({ onPress }: { onPress: () => void }) => {
  const { card } = styles;
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);

  return (
    <>
      {defaultSeller && (
        <Touchable onPress={onPress}>
          <Container style={[card, { marginTop: 12 }]}>
            <Container style={{ flex: 4 }}>
              <Container style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Container style={{ height: '100%' }}>
                  <Image source={ICONN_SELLER_PIN_LOCATION} style={{ width: 24, height: 24 }} />
                </Container>
                <Container style={{ marginLeft: 10 }}>
                  <Container style={{ flexDirection: 'row' }}>
                    <CustomText fontSize={16} text={'Tienda: '} fontBold />
                    <Container>
                      <CustomText text={defaultSeller.Tienda as string} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
                    </Container>
                  </Container>
                  <Container style={{ flexDirection: 'row', marginVertical: 5, paddingRight: 30 }}>
                    <CustomText lineHeight={22} fontSize={16} text={`${defaultSeller.Domicilio} `} />
                  </Container>
                  <Container row center>
                    <Ionicons name="close-outline" size={24} color={theme.brandColor.iconn_error} />
                    <CustomText text="Recoger en tienda no disponible." textColor={theme.brandColor.iconn_error}/>
                  </Container>
                </Container>
              </Container>
            </Container>
            <Container style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10 }} crossCenter>
              <AntDesign name="right" size={24} color="black" />
            </Container>
          </Container>
        </Touchable>
      )}
    </>
  );
};

interface DefaultItemProps extends Partial<Props> {}

const DefaultAddress: React.FC<DefaultItemProps> = ({ onPressAddAddress, address, onPressShowAddressesModal, mode, isAddressModalSelectionVisible }) => {
  return address ? (
    <Touchable onPress={onPressShowAddressesModal!}>
      <DefaultItem address={address} onPressAddAddress={onPressAddAddress} mode={mode} onPressShowAddressesModal={onPressShowAddressesModal} isAddressModalSelectionVisible={isAddressModalSelectionVisible} />
    </Touchable>
  ) : (
    <DefaultItem address={address} onPressAddAddress={onPressAddAddress} mode={mode} onPressShowAddressesModal={onPressShowAddressesModal} isAddressModalSelectionVisible={isAddressModalSelectionVisible} />
  );
};

const DefaultItem: React.FC<DefaultItemProps> = ({ onPressAddAddress, address, onPressShowAddressesModal, mode, isAddressModalSelectionVisible }) => {
  const { card } = styles;
  const { defaultSeller } = useAppSelector((state: RootState) => state.seller);
  const [ near, setNear ] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(()=>{
    if(address?.postalCode && !isAddressModalSelectionVisible){
      getPickUpPoints(address?.postalCode).then((isNear)=>{
        setNear(isNear);
        if(!isNear){
          console.log('ShippingDropDown')
          alert.show(
            {
              title: 'Entrega a domicilio no disponible.',
              message: 'Lo sentimos, por ahora no hay ninguna tienda disponible para envío a domicilio en tu zona, intenta con una nuevo C.P.',
              acceptTitle: 'Agregar otra',
              cancelTitle: 'Omitir',
              cancelOutline: 'iconn_med_grey',
              cancelTextColor: 'iconn_accent_secondary',
              onCancel() {
                alert.hide();
              },
              onAccept() {
                alert.hide();
                onPressShowAddressesModal();  
              }
            },
            'error',
            true,
            true,
            true
          );
        }
      })
    }
  },[address, isAddressModalSelectionVisible])
  
  const getPickUpPoints = async (cp: string) => {
    console.log({getPickUpPoints: cp})
    const pickUp = await vtexPickUpPoints.getPickUpPointsByCP(cp);
    console.log({getPickUpPoints: pickUp})
    let isNear = false;
    if(pickUp.items.length){
      pickUp.items.forEach((store)=>{
        if(store.pickupPoint.id === `${defaultSeller.seller}_${defaultSeller['# Tienda']}`){
          if(store.distance < 7){
            isNear = true;
          }
        }
      })
    }
    return isNear;
  }

  return (
    <Container style={[card, { marginTop: 24 }]}>
      <Container width={address ? '90%' : '100%'}>
        <Container style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Container style={{ height: '100%' }}>
            <Image source={ICONN_HOUSE_PIN_LOCATION} style={{ width: 24, height: 24 }} />
          </Container>
          <Container style={{ marginLeft: 10 }}>
            <Container row flex={1}>
              <CustomText numberOfLines={1} fontSize={16} text={address ? address.addressName! : 'Agrega una dirección de entrega'} fontBold />
            </Container>
            {address ?
            <Container style={{ flexDirection: 'row', width: '95%', marginVertical: 5 }}>
              <CustomText
                numberOfLines={2}
                lineHeight={22}
                fontSize={16}
                text={`${address?.street}, ${address?.neighborhood}, ${address?.city}, ${address?.state}`}
              />
            </Container>
            :
            <></>
            }
            {address ?
              near ? (
                  <Container row center>
                    <Ionicons name="md-checkmark-sharp" size={24} color={theme.brandColor.iconn_green_original} />
                    <CustomText text="Entrega a domicilio" />
                  </Container>
                )
              :
                (
                  <Container row center>
                    <Ionicons name="close-outline" size={24} color={theme.brandColor.iconn_error} />
                    <CustomText text="Entrega a domicilio no disponible." textColor={theme.brandColor.iconn_error}/>
                  </Container>
                )
              :
                  null
            }
          </Container>
        </Container>
        {!address && (
          <Container style={{ marginVertical: 10 }}>
            <Button onPress={onPressAddAddress!} round fontBold fontSize="h4" length="long">
              Agregar dirección
            </Button>
          </Container>
        )}
      </Container>
      {address && (
        <Container center crossCenter>
          <Container>
            <AntDesign name="right" size={24} color="black" />
          </Container>
        </Container>
      )}
    </Container>
  );
};

const ShippingOption = ({
  text,
  icon,
  selected,
  onPress,
  unmark,
  disable,
  mode
}: {
  text: string;
  icon: ImageSource;
  selected: boolean;
  disable: boolean;
  mode: number;
  onPress: () => void;
  unmark: () => void;
}) => {
  const highlight: ViewStyle = {
    backgroundColor: '#E7F3EE',
    borderWidth: 2,
    borderColor: theme.brandColor.iconn_green_original
  };

  return (
    <Container style={styles.content}>
      {selected && (
        <Container style={styles.option}>
          <Touchable onPress={unmark}>
            <Entypo name="cross" size={20} color={theme.brandColor.iconn_white} />
          </Touchable>
        </Container>
      )}
      <Container>
        <Touchable  disabled={disable} onPress={onPress}>
          <Container
            style={[
              {
                backgroundColor: '#F5F5F2',
                width: 100,
                height: 100,
                borderRadius: 100,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center'
              },
              selected && highlight
            ]}
          >
            <Image source={icon} style={{tintColor: (mode === ShippingMode.DELIVERY) ? (disable ? theme.fontColor.placeholder : theme.brandColor.iconn_accent_principal) : (theme.fontColor.placeholder )}} />
          </Container>
        </Touchable>
      </Container>
      <CustomText text={text} />
    </Container>
  );
};

export enum ShippingMode {
  DELIVERY,
  PICKUP
}

export default ShippingDropdown;

const styles = StyleSheet.create({
  content: { display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' },
  option: {
    width: 26,
    height: 26,
    borderRadius: 26,
    backgroundColor: theme.brandColor.iconn_green_original,
    position: 'absolute',
    top: 15,
    right: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: theme.brandColor.iconn_med_grey,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
