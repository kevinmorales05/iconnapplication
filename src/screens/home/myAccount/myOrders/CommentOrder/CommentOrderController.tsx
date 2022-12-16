import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useToast } from 'context';
import { HomeStackParams } from 'navigation/types';
import React from 'react';
import { RatingOrderInterface, RootState, useAppSelector } from 'rtk';
import { ratingServices } from 'services/rating-services';
import CommentOrderScreen from './CommentOrderScreen';

const CommentOrderController: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParams, 'CommentOrder'>>();
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { params } = route;
  const { user } = useAppSelector((state: RootState) => state.auth);
  const paramSuggestions = params?.suggestions;
  const paramRating = params.rating;
  const paramOrderId = params.orderId;
  const onSubmit = async (comment: any) => {
    let suggestions: number[] = [];
    paramSuggestions.forEach(suggestion => suggestions.push(suggestion.suggestions_cat_id));
    let sendRating: RatingOrderInterface = {
      user_id: user.userId as string,
      order_id: paramOrderId,
      suggestions: suggestions,
      score: paramRating as number,
      comment: comment ? comment.comment : ''
    };

    try {
      await ratingServices.postOrderRating(sendRating);
      toast.show({
        message: '¡Muchas gracias! Tu opinión es muy importante para nosotros.',
        type: 'success'
      });
      navigate('MyOrders');
    } catch (error) {
      toast.show({
        message: 'No se pudo enviar tu evaluación. \nPor favor intenta más tarde.',
        type: 'error'
      });
      navigate('MyOrders');
    }
  };
  return <CommentOrderScreen onSubmit={onSubmit} />;
};

export default CommentOrderController;
