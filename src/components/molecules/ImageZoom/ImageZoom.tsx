import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Image, Platform, PermissionsAndroid, ToastAndroid, Alert, Linking, View, Text, StyleSheet, Dimensions } from 'react-native';
import { ICONN_BASKET, ICONN_REVERSE_BASKET } from 'assets/images';
import { Container, CustomText, Touchable, Input, TextContainer, TouchableText, Button } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';
import { InvoicingProfileInterface, Colony, RootState, useAppDispatch, useAppSelector } from 'rtk';
//import ImageView from "react-native-image-viewing";


const ImageZoom = () => {
  const [statusPoints, setStatusPoints] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [visible, setIsVisible] = useState(true);

  const getProduct = () => {
    const productObject = {
      productId: "1wwfsdf",
      productName: "miproducto",
      productDescription: "producto de prueba",
      productInfo: "este es un producto fake",
      imagesUrl: [
        {
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155405-55-55/01-coca.png?v=637969749439630000"
        },
        {
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155409-55-55/06-Chips-Jalapenos.png?v=637969766610030000"
        },
        {
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155407-55-55/04-gatorade.png?v=637969763253770000"
        },
        {
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155410-55-55/07-cacahuates.png?v=637969769174970000"
        },
        {
          url: "http://oneiconn.vteximg.com.br/arquivos/ids/155411-55-55/08-Rancheritos.png?v=637969936914230000"
        }
      ]
    };
    let { imagesUrl } = productObject;
    setSelectedImage(imagesUrl[0])
    setStatusPoints(imagesUrl);
  };

  const openImageZoom = selected => {
    console.log('press', selected);
    console.log(statusPoints[selected].url);
    setSelectedImage(statusPoints[selected]);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '100%'}}>
      {/*
      <ImageView
        images={statusPoints}
        imageIndex={1}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        key={22}
      />*/
      }
      <Container style={{ marginLeft:50, marginTop: 140, backgroundColor: theme.brandColor.iconn_white, width: '80%', height: '50%' }}>
        <ScrollView minimumZoomScale={3} maximumZoomScale={8}>
        <Image source={{ uri: selectedImage.url }} style={{width: 200, height: 380, alignSelf: 'center'}} ></Image>
        </ScrollView>
      </Container>
      <Container>
        <View style={style.container}>
          <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={style.scroll}>
            {
              statusPoints.map((image, index) => {
                return (
                  <Touchable onPress={() => openImageZoom(index)} key={'tchzoom'+index}>
                    <Image key={'imgzoom'+index} source={{ uri: image.url }} style={style.image} />
                  </Touchable>
                )
              })
            }
          </ScrollView>
        </View>
      </Container>
    </Container>
  );
};

export default ImageZoom;

const style = StyleSheet.create({
  container: { marginTop: 60, marginLeft:20, },
  scroll: { width: '50%', height: 56 },
  image: { width: 56, height: 56, resizeMode: 'cover' },
});
