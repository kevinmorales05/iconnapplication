import React, { useCallback, useState, useEffect } from 'react';
import { SafeArea } from 'components/atoms/SafeArea';
import ProductDetailScreen from './ProductDetailScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import { vtexReviewsRatings } from 'services';
import { ReviewModal } from 'components';
import { useLoading, useToast } from 'context';

interface Props {
  productIdentifier?: string;
  productPromotions: Map<string, Object>;
}

const ProductDetailController: React.FC<Props> = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'ProductDetail'>>();
  const {params} = route;
  console.log('identifier:::',params.productIdentifier);
  console.log(JSON.stringify(route,null,4));

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
  const promotions = params.productPromotions;
  const prodId = parseInt(productIdentifier);
  const loader = useLoading();
  const toast = useToast();


   const fetchReviewData = useCallback( async () => {
    const responseAverage = await vtexReviewsRatings.getReviewByProductID(prodId);
    const responseList = await vtexReviewsRatings.getReviewList(prodId);
    setAverage(responseAverage.average);
    setTotalCount(responseAverage.totalCount);

    let variable = await (Object.values(responseList.data));
      variable.forEach((value, index) => {
        if(value.rating === 1){
            setCountUno(countUno => ((countUno + 1)));
        }else if(value.rating === 2){
            setCountDos(countDos => (countDos + 1));
          }else if(value.rating === 3){
            setCountTres(countTres => (countTres + 1));
        }   else if(value.rating === 4){
              setCountFour(countFour => (countFour + 1));
            } else if(value.rating === 5){
                  setCountFive(countFive => (countFive + 1));
              }
              else{
                console.log(typeof value.rating);
              }
    });
  },[]);

  const ratingCompleted =(rating:number)=>{
    setRatingValue(rating);
  };

  
  const postRating = () =>{
    loader.show();
    try{

      let arregloInterfaz = [
        {
          productId:productIdentifier,
          rating:ratingValue,
          title: "Reviewers",
          text: "This is a review!",
          reviewerName: "AppReviewer",
          approved: true,
          verifiedPurchaser: true
        }
      ];
      vtexReviewsRatings.postReview(arregloInterfaz);
      closeModal();
      setButtonReviewed(true);
      setTotalCount(totalCount => ((totalCount + 1)));
      // loader.hide();
      toast.show({
        message:'Calificación publicada\n exitosamente.',
        type: 'success'
      });
    }catch (error) {
      console.log(error);
      toast.show({
        message: 'No fue posible publicar tu\n calificación. Intenta más tarde.',
        type: 'error'
      });
    }
    finally {
      loader.hide()
    }
  };

  const showModal = () =>{
    setModal(true);
  }
  const closeModal = () =>{
    setModal(false);
  }

  useEffect(() => {

  }, [productIdentifier])

  return (
    <SafeArea topSafeArea={false} bottomSafeArea barStyle="dark">
      <ProductDetailScreen itemId={productIdentifier} fetchReviewData={fetchReviewData} 
      star1={countUno} star2={countDos} star3={countTres} star4={countFour} star5={countFive} 
      totalCount={totalCount} average={average} modalShow={modal} showModal={showModal} isReviewed={buttonReviewed} productPromotions={promotions} />
      
        <ReviewModal
          visible={modal}
          closeModal={closeModal}
          postRating={postRating}
          ratingCompleted={ratingCompleted}
          />

    </SafeArea>
  );
};

export default ProductDetailController;
