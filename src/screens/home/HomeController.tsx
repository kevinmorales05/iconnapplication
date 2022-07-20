import { Container, CustomModal, SafeArea, TextContainer } from 'components';
import React, { Component, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import { RootState, useAppSelector, useAppDispatch, setIsLogged } from 'rtk';
import HomeScreen from './HomeScreen';
import { logoutThunk } from 'rtk/thunks/auth.thunks';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ICONN_COFFEE } from 'assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

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
        <Image
          source={item.image}
          style={{ width: 300, height: CONTAINER_HEIGHTMOD }}
          resizeMode="stretch"
        />
        <TextContainer
          text={item.text}
          typography="h5"
          marginTop={30}
          textAlign="center"
        />
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
          onSnapToItem={(index: number) =>
            this.setState({ activeIndex: index })
          }
        />
        {this.pagination}
      </Container>
    );
  }
}

const HomeController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [modVisibility, setModVisibility] = useState(true);
  const dispatch = useAppDispatch();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const logOut = async () => {
    const { meta } = await dispatch(logoutThunk());
    if (meta.requestStatus === 'fulfilled') {
      dispatch(setIsLogged({ isLogged: false }));
    }
  };

  const goToMyAccount = () => navigate('Profile');

  return (
    <SafeArea
      topSafeArea={false}
      bottomSafeArea={false}
      backgroundColor="transparent"
      barStyle="dark"
    >
      <HomeScreen
        name={user.name}
        email={user.email}
        onPressLogOut={logOut}
        onPressMyAccount={goToMyAccount}
      />
      <CustomModal visible={modVisibility}>
        <Container center style={styles.modalBackground}>
          <Pressable
            style={{ alignSelf: 'flex-end' }}
            onPress={() => setModVisibility(false)}
          >
            <Container circle style={styles.iconContainer}>
              <Icon name="window-close" size={20} />
            </Container>
          </Pressable>
          <Container row>
            <TextContainer
              text={`¡Hola ${user.name ? user.name : user.email} ${user.lastName ? user.lastName : ''}!`}
              typography="h3"
              fontBold={true}
              textAlign="center"
              marginTop={4}
            />
          </Container >
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
