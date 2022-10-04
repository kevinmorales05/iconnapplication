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

interface ImageCaruselProps {
  imagesList: [Object];
  imageSize: number;
  selectecPointColor: string;
  generalPointsColor: string;
}

const ImagesCarusel: React.FC<ImageCaruselProps> = ({ imagesList, imageSize, selectecPointColor, generalPointsColor }) => {
  const [statusPoints, setStatusPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const setImagePosition = selected => {
    /*
    console.log('press', selected);
    statusPoints.map((status, index) => {
      status.isMain = (selected == index);
    })
    setStatusPoints(statusPoints);*/
  };

  const changePointsColorFromScroll = ({ nativeEvent }) => {

  }

  useEffect(() => {
    let pointList = [];
    imagesList.map((img) => {
      pointList.push({ isMain: img.isMain  });
    });
    setPoints(pointList);
    setStatusPoints(imagesList);
  }, [imagesList, statusPoints]);

  const openImageZoom = () => {
    navigate('ProductZoom', statusPoints);
  }

  return (
    <Container >
      <View style={style.container}>
        <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={style.scroll} onScroll={(navEvent) => {
          const { nativeEvent } = navEvent;
          let poinLst = points;
          let statusP = statusPoints;
          statusP.map((status, index) => {
            if (nativeEvent.contentOffset.x == status.valueX) {
              status.isMain = true;
              poinLst[index].isMain = true;
            } else {
              status.isMain = false;
              poinLst[index].isMain = false;
            }
          })
          setStatusPoints(statusP);
          setPoints(poinLst);
        }}>
          {
            statusPoints.map((image, index) => {
              return (
                <Touchable onPress={openImageZoom} key={'tchForImg'+index}>
                  <Image key={'imgF'+index} source={{ uri: image.url + imageSize }} style={style.image} />
                </Touchable>
              )
            })
          }
        </ScrollView>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          {
            points.map((img, indx) => {
              return (
                <>
                  <Touchable onPress={() => setImagePosition(indx)} key={"tch" + indx}>
                    <TextContainer
                      textColor={img.isMain ? selectecPointColor : generalPointsColor}
                      text={"⬤"}
                      key={"txt" + indx}
                      fontSize={14}
                      marginTop={4}
                      marginLeft={5}
                      marginRight={5}
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
