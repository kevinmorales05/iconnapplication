import React, { useState } from 'react';
import { Container, CustomModal, CustomText } from 'components/atoms';
import styles from './styles';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CloseSvg } from 'components/svgComponents';
import { moderateScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';

interface WelcomeModalDataInterface {
  visible: boolean;
  onPressOut: () => void;
  userName: string;
  imageToRender: ImagesWelcomeLogin[];
}

interface ImagesWelcomeLogin {
  id: string;
  index: number;
  description: string;
  imageURL: string;
  isActive: boolean;
}

const _renderItems = ({ item }: { item: ImagesWelcomeLogin }) => (
  <Container>
    <Container style={styles.containerImage}>
      <Image resizeMode="cover" source={{ uri: item.imageURL }} style={styles.image} />
    </Container>
    <Container style={styles.containerSubText}>
      <CustomText fontSize={theme.fontSize.h5} text={item.description} />
    </Container>
  </Container>
);

const WelcomeModal: React.FC<WelcomeModalDataInterface> = ({ visible, onPressOut, userName, imageToRender }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
  };

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container style={styles.container} flex alignment="end">
        <Container style={styles.containerModal}>
          <Container style={styles.containerButtonClose}>
            <TouchableOpacity onPress={onPressOut} style={styles.buttonClose}>
              <CloseSvg size={moderateScale(24)} />
            </TouchableOpacity>
          </Container>
          <Container style={styles.containerText}>
            <CustomText fontSize={theme.fontSize.h3} fontBold text={`¡Hola ${userName}!`} />
          </Container>
          <ScrollView bounces={false} onScroll={onScroll} showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal>
            <View onStartShouldSetResponder={(): boolean => true}>
              <FlatList
                data={imageToRender}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                bounces={false}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItems}
              />
            </View>
          </ScrollView>
          <Container style={styles.containerDots}>
            {imageToRender.map((_, index) => {
              if (index === currentIndex) {
                return <Container style={styles.dotSelect} />;
              } else {
                return <Container style={styles.dot} />;
              }
            })}
          </Container>
          <Container style={styles.containerSkip}>
            <TouchableOpacity onPress={() => onPressOut()}>
              <Text style={styles.textButtonSkip}>Omitir</Text>
            </TouchableOpacity>
          </Container>
        </Container>
      </Container>
    </CustomModal>
  );
};

export type { WelcomeModalDataInterface };
export { WelcomeModal };
