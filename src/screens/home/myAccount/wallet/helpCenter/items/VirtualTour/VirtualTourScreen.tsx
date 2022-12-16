import { Container, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { FlatList, Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import { ImageTour } from 'rtk/types/help.types';

interface Props {
  step: number;
  imageList: ImageTour[];
  toPrevStep: () => void;
  toNextStep: () => void;
  toFinish: () => void;
}

const VirtualTourScreen: React.FC<Props> = ({ step, imageList, toNextStep, toPrevStep, toFinish }) => {
  const insets = useSafeAreaInsets();

  const imageStep: ImageTour = imageList[step - 1];

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container backgroundColor={theme.brandColor.iconn_white} flex space="between" style={{ justifyContent: 'space-between' }}>
        <Container>
          <Container style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, paddingLeft: 16, paddingRight: 15 }}>
            <Image resizeMode="contain" source={imageStep.image} style={{ width: 329, height: 390 }} />
          </Container>
        </Container>
        <Container center style={{ marginTop: 12 }}>
          <FlatList
            data={imageList}
            renderItem={({ index }) => (
              <Container style={{ marginRight: 8, marginTop: 12 }}>
                {index === step - 1 ? <Octicons size={20} name="dot-fill" color={'#008060'} /> : <Octicons size={20} name="dot-fill" color={'#dadadb'} />}
              </Container>
            )}
            horizontal
          />
        </Container>
        <TextContainer text={imageStep.description} fontSize={14} marginHorizontal={30} marginTop={23} textAlign="center" />
        <Container>
          <Container height={2} backgroundColor={theme.brandColor.iconn_background} />
          <Container
            row
            space="between"
            style={
              step - 1 === 0
                ? {
                    alignSelf: 'flex-end',
                    marginBottom: 30,
                    marginRight: 16
                  }
                : { marginBottom: 30, marginHorizontal: 16 }
            }
          >
            {step - 1 === 0 ? (
              <></>
            ) : (
              <Touchable onPress={toPrevStep}>
                <Container row style={{ marginTop: 18 }}>
                  <Octicons name="arrow-left" size={20} color={theme.brandColor.iconn_green_original} />
                  <TextContainer
                    text="Atrás"
                    fontSize={14}
                    underline
                    textColor={theme.brandColor.iconn_green_original}
                    fontBold
                    fontWeight="900"
                    marginLeft={4}
                  />
                </Container>
              </Touchable>
            )}
            {step === imageList.length ? (
              <Touchable onPress={toFinish}>
                <Container row style={{ marginTop: 18 }}>
                  <TextContainer text="Finalizar" fontSize={14} underline textColor={theme.brandColor.iconn_green_original} fontBold fontWeight="900" />
                </Container>
              </Touchable>
            ) : (
              <Touchable onPress={toNextStep}>
                <Container row style={{ marginTop: 18 }}>
                  <TextContainer
                    text="Siguiente"
                    fontSize={14}
                    underline
                    textColor={theme.brandColor.iconn_green_original}
                    fontBold
                    fontWeight="900"
                    marginRight={4}
                  />
                  <Octicons name="arrow-right" size={20} color={theme.brandColor.iconn_green_original} />
                </Container>
              </Touchable>
            )}
          </Container>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default VirtualTourScreen;
