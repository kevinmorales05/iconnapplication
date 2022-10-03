import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking, View, Text, StyleSheet, Dimensions } from 'react-native';
import { ICONN_BASKET, ICONN_REVERSE_BASKET } from 'assets/images';
import { Container, CustomText, Touchable, Input, TextContainer, TouchableText, Button } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';

const { width } = Dimensions.get("window");
const height = width * 0.6;

const ImagesCarusel = () => {
  const [statusPoints, setStatusPoints] = useState([]);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const getProduct = () => {
    const productObject = {
      productId: "1wwfsdf",
      productName: "miproducto",
      productDescription: "producto de prueba",
      productInfo: "este es un producto fake",
      imagesUrl: [
        {
          id: "1",
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155405-55-55/01-coca.png?v=637969749439630000",
          initialX: 0,
          selectedColor: true
        },
        {
          id: "2",
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155409-55-55/06-Chips-Jalapenos.png?v=637969766610030000",
          initialX: 240,
          selectedColor: false
        },
        {
          id: "3",
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155407-55-55/04-gatorade.png?v=637969763253770000",
          initialX: 480,
          selectedColor: false
        },
        {
          id: "4",
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155410-55-55/07-cacahuates.png?v=637969769174970000",
          initialX: 720,
          selectedColor: false
        },
        {
          id: "5",
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155411-55-55/08-Rancheritos.png?v=637969936914230000",
          initialX: 960,
          selectedColor: false
        }
      ]
    };
    let { imagesUrl } = productObject;
    setStatusPoints(imagesUrl);
  };

  const setImagePosition = selected => {
    console.log('press', selected);
    //    let statusImg = statusPoints;
    statusPoints.map((status, index) => {
      status.selectedColor = (selected == index);
    })
    console.log(JSON.stringify(statusPoints, null, 4));
    setStatusPoints(statusPoints);
  };

  const changePointsColorFromScroll = ({ nativeEvent }) => {
//    let statusToChange = statusPoints;
    const { contentOffset } = nativeEvent
    console.log('contentOffset.x: ',contentOffset.x);

    /*
    statusPoints.map((status, index) => {
      if (contentOffset.x == (status.initialX)) {
        status.selectedColor = true;
      } else { status.selectedColor = false; }
    })
*/
statusPoints[0].selectedColor = false;
statusPoints[4].selectedColor = true;
    console.log('---');
    console.log(statusPoints);
    console.log('---');
    setStatusPoints(statusPoints);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const openImageZoom = () => {
    navigate('ProductZoom');
   }

  return (
    <Container >
      <View style={style.container}>
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={style.scroll} onScroll={(nativeEvent) => {
          //const { contentOffset } = nativeEvent
          statusPoints[0].selectedColor = false;
          statusPoints[4].selectedColor = true;
          console.log(statusPoints);
          setStatusPoints(statusPoints);
        }}>
          {
            statusPoints.map((image) => {
              return (
                <Touchable onPress={openImageZoom}>
                <Image key={image.id} source={{ uri: image.url }} style={style.image} />
                </Touchable>
              )
            })
          }
        </ScrollView>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          {
            statusPoints.map((img, indx) => {
              return (
                <>
                  <Touchable onPress={() => setImagePosition(indx)} key={"tch"+indx}>
                    <TextContainer
                      textColor={img.selectedColor ? "#333333" : "#f37721"}
                      text={"⬤"}
                      key={"txt"+indx}
                      fontSize={14}
                      marginTop={4}
                      marginLeft={6}
                      marginRight={6}
                    ></TextContainer>
                  </Touchable>
                </>
              )
            })
          }
        </View>
      </View>
    </Container>
  );
};

export default ImagesCarusel;

const style = StyleSheet.create({
  container: { marginTop: 20, width, height },
  scroll: { alignSelf: 'center', width: 240, height: 180 },
  image: { width: 240, height: 180, resizeMode: 'cover' },
  pagination: { flexDirection: 'row', position: 'absolute', width, height, bottom: 0, alignSelf: 'center' },
  paginTex: { fontSize: (width / 30), width, height },
  paginActiveTex: { fontSize: (width / 30), color: '#fff', margin: 3 }
});
