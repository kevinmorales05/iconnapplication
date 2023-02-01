import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, StyleSheet, Dimensions } from 'react-native';
import { Container, Touchable, TextContainer } from 'components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../navigation/types';

const { width } = Dimensions.get('window');
const height = width * 0.6;

interface ImageCaruselProps {
  imagesList: [Object];
  imageSize: number;
  selectecPointColor: string;
  generalPointsColor: string;
  localImg?: boolean;
  onPressZoom?: () => void;
}

const ImagesCarusel: React.FC<ImageCaruselProps> = ({ imagesList, imageSize, selectecPointColor, generalPointsColor, localImg, onPressZoom }) => {
  const [statusPoints, setStatusPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const setImagePosition = selected => {
    const temarr = statusPoints.concat([]);
    temarr.forEach((status, index) => {
      status.isMain = selected == index;
    });
    setStatusPoints(temarr);
  };

  useEffect(() => {
    let pointList = [];
    imagesList.map(img => {
      pointList.push({ isMain: img.isMain });
    });
    setPoints(pointList);
    setStatusPoints(imagesList);
  }, [imagesList, statusPoints]);

  const openImageZoom = () => {
    if (onPressZoom) onPressZoom();
    navigate('ProductZoom', statusPoints);
  };

  return (
    <Container>
      <View style={style.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={2}
          showsHorizontalScrollIndicator={false}
          style={localImg ? style.localScroll : style.scroll}
          onScroll={navEvent => {
            const { nativeEvent } = navEvent;
            let poinLst = points;
            let statusP = statusPoints;
            statusP.forEach((status, index) => {
              if (nativeEvent.contentOffset.x == status.valueX) {
                status.isMain = true;
                poinLst[index].isMain = true;
              } else {
                status.isMain = false;
                poinLst[index].isMain = false;
              }
            });
            setStatusPoints(statusP);
            setPoints(poinLst);
          }}
        >
          {statusPoints.map((image, index) => {
            return (
              <Touchable onPress={openImageZoom} key={'tchForImg' + index}>
                <Image
                  key={'imgF' + index}
                  source={localImg ? image.url : { uri: image.url + imageSize }}
                  resizeMode={'contain'}
                  style={localImg ? style.localImage : style.image}
                />
              </Touchable>
            );
          })}
        </ScrollView>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          {statusPoints.map((img, indx) => {
            return (
              <>
                <Touchable onPress={() => setImagePosition(indx)} key={'tch' + indx}>
                  <TextContainer
                    textColor={img.isMain ? selectecPointColor : generalPointsColor}
                    text={'⬤'}
                    key={'txt' + indx}
                    fontSize={14}
                    marginTop={4}
                    marginLeft={5}
                    marginRight={5}
                  />
                </Touchable>
              </>
            );
          })}
        </View>
      </View>
    </Container>
  );
};

export default ImagesCarusel;

const style = StyleSheet.create({
  container: { marginTop: 20, width, height },
  scroll: { alignSelf: 'center', width: 240, height: 180 },
  localScroll: { alignSelf: 'center', width: 248, height: 151 },
  image: { width: 240, height: 180 },
  localImage: { width: 248, height: 151 },
  pagination: { flexDirection: 'row', position: 'absolute', width, height, bottom: 0, alignSelf: 'center' },
  paginTex: { fontSize: width / 30, width, height },
  paginActiveTex: { fontSize: width / 30, color: '#fff', margin: 3 }
});
