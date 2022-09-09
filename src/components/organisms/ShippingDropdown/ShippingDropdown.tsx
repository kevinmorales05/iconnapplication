import { CustomText } from 'components/atoms';
import React, { useEffect } from 'react';
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

interface Props {
  onPressAddAddress: () => void;
  onPressShowAddressesModal: () => void;
  address: Address;
  onPressToogle: () => void;
  mode: ShippingMode | null;
  handleMode: (mode: ShippingMode | null) => void;
}

const ShippingDropdown: React.FC<Props> = ({ onPressAddAddress, address, onPressToogle, onPressShowAddressesModal, mode, handleMode }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <Container style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24, backgroundColor: theme.brandColor.iconn_white }}>
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ShippingOption
          selected={mode === ShippingMode.DELIVERY}
          icon={ICONN_SCOOTER}
          text={'A domicilio'}
          onPress={() => {
            handleMode(ShippingMode.DELIVERY);
          }}
          unmark={() => {
            handleMode(null);
          }}
        />
        <ShippingOption
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
        <DefaultAddress onPressAddAddress={onPressAddAddress} address={address} onPressShowAddressesModal={onPressShowAddressesModal} />
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

const DefaultAddress: React.FC<DefaultItemProps> = ({ onPressAddAddress, address, onPressShowAddressesModal }) => {
  return address ? (
    <Touchable onPress={onPressShowAddressesModal!}>
      <DefaultItem address={address} onPressAddAddress={onPressAddAddress} onPressShowAddressesModal={onPressShowAddressesModal} />
    </Touchable>
  ) : (
    <DefaultItem address={address} onPressAddAddress={onPressAddAddress} onPressShowAddressesModal={onPressShowAddressesModal} />
  );
};

const DefaultItem: React.FC<DefaultItemProps> = ({ onPressAddAddress, address, onPressShowAddressesModal }) => {
  const { card } = styles;
  return (
    <Container style={[card, { marginTop: 24 }]}>
      <Container width={address ? '90%' : '100%'}>
        <Container style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Container style={{ height: '100%' }}>
            <Image source={ICONN_HOUSE_PIN_LOCATION} style={{ width: 24, height: 24 }} />
          </Container>
          <Container style={{ marginLeft: 10 }}>
            <Container style={{ flexDirection: 'row' }}>
              <CustomText fontSize={16} text={address ? address.addressName! : 'Agrega una dirección de entrega'} fontBold />
            </Container>
            <Container style={{ flexDirection: 'row', width: '95%', marginVertical: 5 }}>
              <CustomText
                numberOfLines={2}
                lineHeight={22}
                fontSize={16}
                text={address ? `${address?.street}, ${address?.neighborhood}, ${address?.city}, ${address?.state}` : '64680, Monterrey, N.L.'}
              />
            </Container>
            {address && (
              <Container row center>
                <Ionicons name="md-checkmark-sharp" size={24} color={theme.brandColor.iconn_green_original} />
                <CustomText text="Entrega a domicilio" />
              </Container>
            )}
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
  unmark
}: {
  text: string;
  icon: ImageSource;
  selected: boolean;
  onPress: () => void;
  unmark: () => void;
}) => {
  const highlight: ViewStyle = {
    backgroundColor: '#E7F3EE',
    borderWidth: 2,
    borderColor: theme.brandColor.iconn_green_original
  };

  useEffect(() => {
    return () => {
      unmark();
    };
  }, []);

  return (
    <>
      <Container style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        {selected && (
          <Container
            style={{
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
            }}
          >
            <Touchable onPress={unmark}>
              <Entypo name="cross" size={20} color={theme.brandColor.iconn_white} />
            </Touchable>
          </Container>
        )}
        <Container>
          <Touchable onPress={onPress}>
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
              <Image source={icon} />
            </Container>
          </Touchable>
        </Container>
        <CustomText text={text} />
      </Container>
    </>
  );
};

export enum ShippingMode {
  DELIVERY,
  PICKUP
}

export default ShippingDropdown;

const styles = StyleSheet.create({
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
