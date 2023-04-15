import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Container, TextContainer } from 'components';
import theme from 'components/theme/theme';
import { useLoading, useToast } from 'context';
import { HomeStackParams } from 'navigation/types';
import React from 'react';
import { Image, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState, useAppSelector } from 'rtk';
import { citiCouponsServices } from 'services/coupons.services';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

const CouponDetail: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const route = useRoute<RouteProp<HomeStackParams, 'CouponDetail'>>();
  const { params } = route;
  const toast = useToast();
  const loader = useLoading();
  loader.hide();

  console.log('params.couponInfo', JSON.stringify(params.couponInfo, null, 3), user.userId);
  console.log('HALP', params.couponInfo.promotionid);

  const activateCoupon = async () => {
    const couponActivated = await citiCouponsServices.postAssignCouponUser(params.couponInfo.promotionid, user.userId as string);
    console.log('couponActivated', couponActivated.data);
    if (couponActivated.data !== null && couponActivated.data !== undefined) {
      toast.show({
        message: '¡Se ha activado tu cupón con éxito!',
        type: 'success'
      });
      if (params.origin === 'Home') {
        navigate('ActivatedCoupon', { couponInfo: params.couponInfo, couponActivatedData: couponActivated.data.code, origin: 'Home' });
      } else if (params.origin === 'Coupons') {
        navigate('ActivatedCoupon', { couponInfo: params.couponInfo, couponActivatedData: couponActivated.data.code, origin: 'Coupons' });
      }
    } else {
      toast.show({
        message: 'No fue posible activar el cupón. Intenta más tarde.',
        type: 'error'
      });
    }
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container backgroundColor={theme.brandColor.iconn_white} flex space="between">
        <Container backgroundColor="grey" style={{ marginBottom: 0 }}>
          <Image source={{ uri: params.couponInfo.imageurl }} style={{ height: verticalScale(160), width: '100%' }} resizeMode="cover" />
        </Container>
        <Container>
          <TextContainer text={params.couponInfo.descriptiontitle} fontBold fontSize={16} marginTop={verticalScale(10)} marginHorizontal={moderateScale(32)} />
          <TextContainer
            text={params.couponInfo.descriptionsubtitle}
            fontBold
            fontSize={18}
            textColor={theme.fontColor.light_green}
            marginTop={verticalScale(2)}
            marginLeft={moderateScale(32)}
            marginRight={moderateScale(32)}
          />
        </Container>
        <TextContainer text={params.couponInfo.descriptionc} fontSize={14} marginTop={verticalScale(16)} marginHorizontal={moderateScale(32)} />
        <TextContainer text={params.couponInfo.descriptiontyc} fontSize={12} marginTop={verticalScale(24)} marginHorizontal={moderateScale(32)} />
        <Container style={{ marginBottom: verticalScale(30) }}>
          <Button onPress={activateCoupon} round fontBold fontSize="h4" marginLeft={moderateScale(16)} marginRight={moderateScale(16)}>
            Activar Cupón
          </Button>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default CouponDetail;
