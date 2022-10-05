import React from 'react';
import { Container, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import { Button, TextContainer } from 'components/molecules';
import { ICONN_EMPTY_SHOPPING_CART, ICONN_LEFT_ARROW } from 'assets/images';
import { Bar } from 'react-native-progress';
import { Image } from 'react-native-svg';
import { Rating } from 'react-native-ratings';

interface Props {
    average?: number;
    reviews?: number;
    countFive?: number;
    percentCinco?: number;
    countFour?: number;
    percentCuatro?: number;
    countTres?: number;
    percentTres?: number;
    countDos?: number;
    percentDos?: number;
    countUno?: number;
    percentUno?: number;
    reviewed?: boolean;
    deleteReview?: () => void;
    reviewProduct?: () => void;
  }
  
const ReviewPercentage: React.FC<Props> = ({
    average,
    reviews,
    countFive,
    countFour,
    countTres,
    countDos,
    countUno,
    percentCinco,
    percentCuatro,
    percentTres,
    percentDos,
    percentUno,
    reviewed,
    deleteReview,
    reviewProduct
}) => {

return(
<Container backgroundColor={theme.brandColor.iconn_white}>
            <Container style={{marginTop:24, marginHorizontal:16}}>
            <TextContainer text={`Calificaciones de clientes`} fontBold fontSize={theme.fontSize.h4} lineHeight={theme.fontSize.h2}/>
            <Container row style={{marginTop:16}}>
              <Rating imageSize={16} readonly startingValue={average ? average : 1.4}/>
              <Container style={{marginLeft:8}} crossCenter>
              <TextContainer text={`${average ? average : 0} de 5`} fontBold fontSize={theme.fontSize.h5}/>
              </Container>
            </Container>
              <TextContainer marginTop={8} text={`${reviews ? reviews : 0} calificaciones`} fontSize={theme.fontSize.h5}/>
              <Container row style={{marginTop:16, justifyContent:'space-between'}}>
              <TextContainer text='5 estrellas' fontSize={theme.fontSize.h6}/>
              <Bar  style={{marginLeft:16}} width={220} progress={countFive ? countFive : 0.2} height={16} color={theme.brandColor.yellow_star} borderRadius={8} borderColor={'transparent'} unfilledColor={theme.brandColor.iconn_light_grey}></Bar>
              <TextContainer marginLeft={16} text={`${percentCinco ? percentCinco : 0}%`} fontSize={theme.fontSize.h6}/>
              </Container>
              <Container  row style={{marginTop:12, justifyContent:'space-between'}}>
              <TextContainer text='4 estrellas' fontSize={theme.fontSize.h6}/>
              <Bar  style={{marginLeft:16}} width={220} progress={countFour ? countFour : 0.2} height={16} color={theme.brandColor.yellow_star} borderRadius={8} borderColor={'transparent'} unfilledColor={theme.brandColor.iconn_light_grey}></Bar>
              <TextContainer marginLeft={16} text={`${percentCuatro ? percentCuatro : 0}%`} fontSize={theme.fontSize.h6}/>
              </Container>
              <Container  row style={{marginTop:12, justifyContent:'space-between'}}>
              <TextContainer text='3 estrellas' fontSize={theme.fontSize.h6}/>
              <Bar  style={{marginLeft:16}} width={220} progress={countTres ? countTres : 0.2} height={16} color={theme.brandColor.yellow_star} borderRadius={8} borderColor={'transparent'} unfilledColor={theme.brandColor.iconn_light_grey}></Bar>
              <TextContainer marginLeft={16} text={`${percentTres ? percentTres : 0}%`} fontSize={theme.fontSize.h6}/>
              </Container>
              <Container  row style={{marginTop:12, justifyContent:'space-between'}}>
              <TextContainer text='2 estrellas' fontSize={theme.fontSize.h6}/>
              <Bar  style={{marginLeft:16}} width={220} progress={countDos ? countDos : 0.2} height={16} color={theme.brandColor.yellow_star} borderRadius={8} borderColor={'transparent'} unfilledColor={theme.brandColor.iconn_light_grey}></Bar>
              <TextContainer marginLeft={16} text={`${percentDos ? percentDos : 0}%`} fontSize={theme.fontSize.h6}/>
              </Container>
              <Container  row style={{marginTop:12, justifyContent:'space-between'}}>
              <TextContainer text='1 estrellas' fontSize={theme.fontSize.h6}/>
              <Bar  style={{marginLeft:16}} width={220} progress={countUno ? countUno : 0.2} height={16} color={theme.brandColor.yellow_star} borderRadius={8} borderColor={'transparent'} unfilledColor={theme.brandColor.iconn_light_grey}></Bar>
              <TextContainer marginLeft={16} text={`${percentUno ? percentUno : 0}%`} fontSize={theme.fontSize.h6}/>
              </Container>
              <Container style={{marginTop:24, marginBottom:58}}>
              {reviewed ? (
        <>
          <Container row space='between'>
                <TextContainer fontSize={theme.fontSize.h6} textColor={theme.fontColor.placeholder} text='Ya calificaste este producto.'/>
                <Touchable onPress={deleteReview} opacityEffect>
                <Container row>
                <Image source={ICONN_EMPTY_SHOPPING_CART} tintColor={theme.brandColor.iconn_error} resizeMode="cover" style={{ width: 16, height: 16}} />
                <TextContainer marginLeft={2} fontSize={theme.fontSize.h6} textColor={theme.brandColor.iconn_error} text='Eliminar calificación'/>
                </Container>
                </Touchable>

          </Container>
        </>
      ) : (
        <>
          <Button
                      round
                      rightIcon={<Image source={ICONN_LEFT_ARROW} tintColor={theme.brandColor.iconn_green_original} style={{ width: 28, height: 28, position:'absolute', marginLeft:34, bottom:-14}} />}
                      fontColor={theme.brandColor.iconn_green_original}
                      fontBold
                      fontSize="h4"
                      outline
                      onPress={reviewProduct}
                      >
                      Calificar producto
            </Button>
        </>
      )}
              </Container>
            </Container>
          </Container>
  );
};

export default ReviewPercentage;