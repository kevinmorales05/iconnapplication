import { View, Text, StyleSheet, Image, ImageSourcePropType, SafeAreaView, Dimensions, Pressable } from 'react-native'
import React, { Component, useState } from 'react'
import { SafeArea, CustomModal, Container, TextContainer } from 'components'
import theme from '../../components/theme/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import {ICONN_COFFEE} from 'assets/images'
const CONTAINER_HEIGHT = (Dimensions.get('window').height)/6-20;
const CONTAINER_HEIGHTMOD = (Dimensions.get('window').height)/5 + 10;

interface HomeProps{
}
interface Props {
    carouselItems?: ItemProps;
}
interface ItemProps {
    image:ImageSourcePropType;
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
          text: "Activa cupones y redimelos en la tienda",
        },
        {
          image: ICONN_COFFEE,
          text: "Activa cupones y redimelos en la tienda",
        },
        {
          image: ICONN_COFFEE,
          text: "Activa cupones y redimelos en la tienda",
        },
      ],
    };

    renderItem = ({ item, index }: { item: ItemProps; index: number }) => {
        return (
          <View
            style={{
              borderRadius: 5,
              height: 150,
            }}
          >
            <Image source={item.image} style={{ width: 300, height: CONTAINER_HEIGHTMOD }} resizeMode="stretch"/>
            <TextContainer 
            text={item.text}
            typography="h5"
            marginTop={30}
            textAlign="center"/>
          </View>
        );
      };

      get pagination () {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Container style={{flexDirection:'column', justifyContent:'space-around', flex: 1, height: 10, marginBottom: 10}}>
                <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'transparent', marginTop: 10, flex: 1 }}
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
            <Container style={{ flex: 1, flexDirection: "column", justifyContent: "center", marginTop: 24 }}>
              <Carousel
                layout={"default"}
                ref={this.ref}
                data={this.state.carouselItems}
                sliderWidth={280}
                itemWidth={280}
                renderItem={this.renderItem}
                onSnapToItem={(index: number) => this.setState({ activeIndex: index })}
              />
              { this.pagination }
            </Container>
        );
      }
}

const HomeScreen: React.FC<HomeProps> = ({
}) => {
 return (
    <SafeArea>
        <View style={styles.homeBackground}>
            <Text>Home</Text>
        </View>
    </SafeArea>
 );
};


const styles = StyleSheet.create({
    homeBackground: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex:1
    },
    modalBackground: {
        justifyContent: 'space-evenly',
        backgroundColor:"white", 
        flex: 1, 
        height: CONTAINER_HEIGHT, 
        marginVertical: CONTAINER_HEIGHT, 
        marginHorizontal: 40,
        borderRadius: 16, 
        paddingTop: 10
    },
    iconContainer:{
        backgroundColor: theme.brandColor.iconn_warm_grey, 
        alignSelf:'flex-end',
        marginTop: 12,
        marginRight: 12,
        padding: 8
    }
  });

export default HomeScreen