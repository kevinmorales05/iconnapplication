import React, { useEffect, useState } from 'react';
import { ScrollView, Image, View, StyleSheet } from 'react-native';
import { Container, Touchable } from 'components';
import theme from 'components/theme/theme';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParams } from '../../../navigation/types';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ImageZoomProps {
  imagesList?: [Object];
  mainImageSize?: number;
  caruselImageSize?: number;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ imagesList, mainImageSize, caruselImageSize }) => {
  const route = useRoute<RouteProp<HomeStackParams, 'ProductZoom'>>();
  const { params } = route;
  const [statusPoints, setStatusPoints] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  const openImageZoom = selected => {
    setSelectedImage([statusPoints[selected]]);
  };

  useEffect(() => {
    setSelectedImage(params != undefined && params.length > 0 ? [params[0]] : undefined);
    setStatusPoints(params);
  }, [statusPoints]);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_white, width: '100%', height: '100%' }}>
      <Container center style={{ marginTop: 120, backgroundColor: theme.brandColor.iconn_white, width: '95%', height: '50%' }}>
        <ScrollView minimumZoomScale={3} maximumZoomScale={8}>
          {selectedImage.length > 0 ? (
            <View style={{ backgroundColor: theme.brandColor.iconn_red_original, width: 300, height: 328 }}>
              <ImageViewer imageUrls={selectedImage} backgroundColor="white" />
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </Container>
      <Container>
        <View style={style.container}>
          <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={style.scroll}>
            {statusPoints && statusPoints.length > 0 ? (
              statusPoints.map((image, index) => {
                return (
                  <Touchable onPress={() => openImageZoom(index)} key={'tchzoom' + index}>
                    <Image key={'imgzoom' + index} source={{ uri: image.url }} style={style.image} />
                  </Touchable>
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      </Container>
    </Container>
  );
};

export default ImageZoom;

const style = StyleSheet.create({
  container: { marginTop: 100, marginLeft: 20 },
  scroll: { width: '60%', height: 56 },
  image: { width: 56, height: 56, resizeMode: 'cover' },
  containerView: {
    marginTop: 100,
    width: 300,
    height: 300,
    flex: 1,
    backgroundColor: theme.brandColor.iconn_red_original
  }
});
