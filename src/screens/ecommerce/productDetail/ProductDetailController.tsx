import React, { useState, useEffect } from 'react';
import ProductDetailScreen from './ProductDetailScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { vtexReviewsRatings } from 'services';
import { ReviewModal } from 'components';
import { useLoading, useToast } from 'context';
import theme from 'components/theme/theme';
import { RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';
import { View } from 'react-native';

interface Props {
  productIdentifier?: string;
  productPromotions: Map<string, Object>;
}

const ProductDetailController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'ProductDetail'>>();
  const { params } = route;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [countUno, setCountUno] = useState(0);
  const [countDos, setCountDos] = useState(0);
  const [countTres, setCountTres] = useState(0);
  const [countFour, setCountFour] = useState(0);
  const [countFive, setCountFive] = useState(0);
  const [average, setAverage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [buttonReviewed, setButtonReviewed] = useState(false);
  //Default rating value
  const [ratingValue, setRatingValue] = useState(3);
  const productIdentifier = params.productIdentifier;
  const prodId = parseInt(productIdentifier);
  const loader = useLoading();
  const toast = useToast();

  const fetchReviewData = async () => {
    const responseAverage = await vtexReviewsRatings.getReviewByProductID(prodId);
    const responseList = await vtexReviewsRatings.getReviewList(prodId);
    setAverage(responseAverage.average);
    setTotalCount(responseAverage.totalCount);
    setCountUno(0);
    setCountDos(0);
    setCountTres(0);
    setCountFour(0);
    setCountFive(0);

    let variable = await Object.values(responseList.data);
    variable.forEach(value => {
      if (value.rating === 1) {
        setCountUno(countUno => countUno + 1);
      } else if (value.rating === 2) {
        setCountDos(countDos => countDos + 1);
      } else if (value.rating === 3) {
        setCountTres(countTres => countTres + 1);
      } else if (value.rating === 4) {
        setCountFour(countFour => countFour + 1);
      } else if (value.rating === 5) {
        setCountFive(countFive => countFive + 1);
      } else {
        //console.log(typeof value.rating);
      }
    });
  };

  const ratingCompleted = (rating: number) => {
    setRatingValue(rating);
    logEvent('pdRate', { id: user.id, description: 'Calificar un producto, seleccionar estrellas', starNumber: rating });
  };

  const postRating = async () => {
    loader.show();
    try {
      let arregloInterfaz = [
        {
          productId: productIdentifier,
          rating: ratingValue,
          title: 'Reviewers',
          text: 'This is a review!',
          reviewerName: 'AppReviewer',
          approved: true,
          verifiedPurchaser: true
        }
      ];
      vtexReviewsRatings.postReview(arregloInterfaz);
      closeModal();
      setButtonReviewed(true);
      setTotalCount(totalCount => totalCount + 1);
      logEvent('pdPublishRating', { id: user.id, description: 'Botón de publicar' });
      // loader.hide();
      toast.show({
        message: 'Calificación publicada\n exitosamente.',
        type: 'success'
      });
    } catch (error) {
      toast.show({
        message: 'No fue posible publicar tu\n calificación. Intenta más tarde.',
        type: 'error'
      });
    } finally {
      loader.hide();
    }
  };

  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    logEvent('pdCloseRaiting', { id: user.id, description: 'Cerrar calificar un producto' });
    setModal(false);
  };

  useEffect(() => {}, [productIdentifier]);

  return (
    <View style={{ backgroundColor: theme.brandColor.iconn_white, paddingBottom: 70 }}>
      <ProductDetailScreen
        itemId={productIdentifier}
        fetchReviewData={fetchReviewData}
        star1={countUno}
        star2={countDos}
        star3={countTres}
        star4={countFour}
        star5={countFive}
        totalCount={totalCount}
        average={average}
        modalShow={modal}
        showModal={showModal}
        isReviewed={buttonReviewed}
      />

      <ReviewModal visible={modal} closeModal={closeModal} postRating={postRating} ratingCompleted={ratingCompleted} />
    </View>
  );
};

export default ProductDetailController;
