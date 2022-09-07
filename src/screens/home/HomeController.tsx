import { AddressModalScreen, Container, CustomModal, SafeArea, TextContainer, AddressModalSelection } from 'components';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch, setAppInitialState, setAuthInitialState, setGuestInitialState, Address, setAddressDefault } from 'rtk';
import HomeScreen from './HomeScreen';
import { logoutThunk } from 'rtk/thunks/auth.thunks';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ICONN_COFFEE } from 'assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getInvoicingProfileListThunk } from 'rtk/thunks/invoicing.thunks';
import { setInvoicingInitialState } from 'rtk/slices/invoicingSlice';
import { getUserAddressesThunk } from 'rtk/thunks/vtex-addresses.thunks';
import { useLoading } from 'context';
import { useAddresses } from './myAccount/hooks/useAddresses';

const CONTAINER_HEIGHT = Dimensions.get('window').height / 6 - 20;
const CONTAINER_HEIGHTMOD = Dimensions.get('window').height / 5 + 10;

interface Props {
  carouselItems?: ItemProps;
}
interface ItemProps {
  image: ImageSourcePropType;
  text: string;
}
interface State {
  activeIndex: number;
  carouselItems: ItemProps[];
}

class CustomCarousel extends Component<Props, State> {
  ref = React.createRef<Props>();
  state = {
    activeIndex: 0,
    carouselItems: [
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      },
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      },
      {
        image: ICONN_COFFEE,
        text: 'Activa cupones y redimelos en la tienda'
      }
    ]
  };

  renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          height: 150
        }}
      >
        <Image source={item.image} style={{ width: 300, height: CONTAINER_HEIGHTMOD }} resizeMode="stretch" />
        <TextContainer text={item.text} typography="h5" marginTop={30} textAlign="center" />
      </View>
    );
  };

  get pagination() {
    const { carouselItems, activeIndex } = this.state;
    return (
      <Container
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          flex: 1,
          height: 10,
          marginBottom: 10
        }}
      >
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{
            backgroundColor: 'transparent',
            marginTop: 10,
            flex: 1
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: theme.brandColor.iconn_accent_secondary
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: theme.brandColor.iconn_light_grey
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </Container>
    );
  }

  render() {
    return (
      <Container
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 24
        }}
      >
        <Carousel
          layout={'default'}
          data={this.state.carouselItems}
          sliderWidth={280}
          itemWidth={280}
          renderItem={this.renderItem}
          onSnapToItem={(index: number) => this.setState({ activeIndex: index })}
        />
        {this.pagination}
      </Container>
    );
  }
}

const HomeController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { user: userLogged, loading: authLoading } = useAppSelector((state: RootState) => state.auth);
  const { loading: invoicingLoading, invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const { guest: guestLogged } = useAppSelector((state: RootState) => state.guest);
  const { isGuest } = guestLogged;
  const { isLogged } = userLogged;
  const modVis = isLogged ? false : false; // TODO: don't forget revert this to show carrusel...
  const [modVisibility, setModVisibility] = useState(modVis);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const loader = useLoading();
  const [addressModalSelectionVisible, setAddressModalSelectionVisible] = useState(false);

  useEffect(() => {
    if (invoicingLoading === false) loader.hide();
  }, [invoicingLoading]);

  useEffect(() => {
    if (authLoading === false) loader.hide();
  }, [authLoading]);

  const logOut = async () => {
    if (isLogged) {
      const { meta } = await dispatch(logoutThunk());
      if (meta.requestStatus === 'fulfilled') {
        dispatch(setAppInitialState());
        dispatch(setAuthInitialState());
        dispatch(setGuestInitialState());
        dispatch(setInvoicingInitialState());
      }
    } else {
      dispatch(setAppInitialState());
      dispatch(setAuthInitialState());
      dispatch(setGuestInitialState());
      dispatch(setInvoicingInitialState());
    }
  };

  const goToMyAccount = () => {
    isGuest ? navigate('InviteSignUp') : navigate('Mi Cuenta');
  };
  const goToInvoice = () => {
    isGuest ? navigate('InviteSignUp') : navigate('Invoice');
  };

  const goToShopCart = () => {
    navigate('ShopCart');
  };

  /**
   * Load User Addresses List and store it in the redux store
   */
  const fetchAddresses = useCallback(async () => {
    console.log('fetchAddresses...');
    loader.show();
    await dispatch(getUserAddressesThunk(user.user_id!));
  }, []);

  /**
   * We get the user addresses just if there isn`t any address.
   */
  useEffect(() => {
    if (user.addresses?.length === 0) fetchAddresses();
  }, [fetchAddresses]);

  /**
   * Load Invocing Profile List and store it in the redux store.
   */
  const fetchInvoicingProfileList = useCallback(async () => {
    console.log('fetchInvoicingProfileList...');
    loader.show();
    await dispatch(getInvoicingProfileListThunk(user.user_id!));
  }, []);

  /**
   * We get the invoicing profile list just if there isn`t any profile.
   */
  useEffect(() => {
    if (user.user_id && invoicingProfileList.length === 0) fetchInvoicingProfileList();
  }, [fetchInvoicingProfileList]);

  const {
    editAddress,
    removeAddress,
    onPressAddNewAddress,
    addressModalScreenVisible,
    postalCodeInfo,
    address,
    mode,
    modalScreenTitle,
    fetchAddressByPostalCode,
    onSubmit,
    onPressCloseModalScreen
  } = useAddresses();

  const onPressCloseAddressModalSelection = () => {
    setAddressModalSelectionVisible(false);
  };

  const onPressAddNewAddressFromHome = () => {
    setAddressModalSelectionVisible(false);
    onPressAddNewAddress();
  };

  /**
   * Function to set a default address locally (just in redux store)
   * @param address
   * @param position
   */
  const onPressSetDefault = (address: Address, position: number) => {
    dispatch(setAddressDefault(position));
  };

  return (
    <SafeArea topSafeArea={false} bottomSafeArea={false} backgroundColor={theme.brandColor.iconn_background} barStyle="dark">
      <HomeScreen
        name={user.name}
        email={user.email}
        onPressLogOut={logOut}
        onPressMyAccount={goToMyAccount}
        onPressInvoice={goToInvoice}
        onPressAddNewAddress={onPressAddNewAddress}
        onPressShowAddressesModal={() => setAddressModalSelectionVisible(true)}
        onPressShopCart={goToShopCart}
      />
      <CustomModal visible={modVisibility}>
        <Container center style={styles.modalBackground}>
          <Pressable style={{ alignSelf: 'flex-end' }} onPress={() => setModVisibility(false)}>
            <Container circle style={styles.iconContainer}>
              <Icon name="window-close" size={20} />
            </Container>
          </Pressable>
          <Container row>
            <TextContainer text={user.name ? `¡Hola ${user.name}!` : '¡Hola!'} typography="h3" fontBold={true} textAlign="center" marginTop={4} />
          </Container>
          <Container center middle flex={1}>
            <CustomCarousel />
          </Container>

          <Container
            style={{
              backgroundColor: theme.brandColor.iconn_warm_grey,
              alignSelf: 'stretch',
              borderRadius: 16
            }}
          >
            <Pressable onPress={() => setModVisibility(false)}>
              <TextContainer
                text="Omitir"
                typography="link"
                fontBold={true}
                textAlign="center"
                textColor={theme.fontColor.link}
                underline={true}
                marginTop={27}
                marginBottom={30}
              />
            </Pressable>
          </Container>
        </Container>
      </CustomModal>

      <AddressModalSelection
        visible={addressModalSelectionVisible}
        addresses={user.addresses}
        onPressEdit={editAddress}
        onPressDelete={removeAddress}
        onPressAddNewAddress={onPressAddNewAddressFromHome}
        onPressClose={onPressCloseAddressModalSelection}
        onPressSetDefault={onPressSetDefault}
      />
      <AddressModalScreen
        visible={addressModalScreenVisible}
        postalCodeInfo={postalCodeInfo!}
        address={address!}
        mode={mode!}
        title={modalScreenTitle}
        onPressFindPostalCodeInfo={fetchAddressByPostalCode}
        onSubmit={onSubmit}
        onPressClose={onPressCloseModalScreen}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  modalBackground: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 1,
    height: CONTAINER_HEIGHT,
    marginVertical: CONTAINER_HEIGHT,
    marginHorizontal: 40,
    borderRadius: 16,
    paddingTop: 10
  },
  iconContainer: {
    backgroundColor: theme.brandColor.iconn_warm_grey,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 12,
    padding: 8
  }
});

export default HomeController;
