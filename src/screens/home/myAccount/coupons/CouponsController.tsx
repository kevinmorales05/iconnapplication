import { useLoading } from 'context';
import React, { useEffect, useState } from 'react';
import { CouponInterface, CouponResponseInterface, UserCouponInterface } from 'rtk/types/coupons.types';
import { citiCouponsServices } from 'services/coupons.services';
import CouponsScreen from './CouponsScreen';
import { useLocation } from 'hooks/useLocation';
import { RootState, useAppSelector } from 'rtk';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CardProductSkeleton, Container } from 'components';
import { Dimensions } from 'react-native';
import { moderateScale } from 'utils/scaleMetrics';
import CouponsScrollScreen from './CouponsScrollScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const CouponsController: React.FC = () => {
  const { completeGeolocation, getCurrentLocation } = useLocation();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [coupons, setCoupons] = useState<CouponInterface[]>([]);
  const [userCoupons, setUserCoupons] = useState<UserCouponInterface[]>([]);
  const [userMunicipality, setUserMunicipality] = useState('none');
  const [userState, setUserState] = useState('none');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pageCoupon, setPageCoupon] = useState(0);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(false);
  const loader = useLoading();
  const isFocused = useIsFocused();

  const halp = async () => {
    const plsHelp = await getCurrentLocation();
    //console.log('plsHelp', plsHelp);
    ///console.log('completeGeolocation', JSON.stringify(completeGeolocation, null, 3));
    setUserMunicipality(completeGeolocation.results[0].address_components[3].long_name);
    setUserState(completeGeolocation.results[0].address_components[4].long_name);
  };
  useEffect(() => {
    halp();
  }, [halp]);
  //console.log('userMunicipality', userMunicipality);
  //console.log('userState', userState);
  //console.log('location', userLocation);

  const loadMoreCoupons = async () => {
    setLoading(true);
    const couponsRequest = await getCoupons(pageCoupon + 1);
    if (couponsRequest.responseCode === 6003 && couponsRequest.data) {
      if (couponsRequest.data.length) {
        const couponsTem: CouponInterface[] = couponsRequest.data;
        if (!couponsRequest.data.length) {
          setLoading(false);
          setLoadingMore(false);
        } else {
          const couponsToRender: CouponInterface[] = coupons.concat(couponsTem);
          await setCoupons(couponsToRender);
          await setPageCoupon(pageCoupon + 1);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setLoadingMore(false);
      }
    } else {
      setCoupons(coupons);
    }
  };

  const loadMoreItem = () => {
    if (!onEndReachedCalledDuringMomentum) {
      if (!isLoading && isLoadingMore) {
        loadMoreCoupons();
        setOnEndReachedCalledDuringMomentum(true);
      }
    }
  };

  useEffect(() => {
    getCoupons(pageCoupon);
  }, []);

  const getCoupons = async (pageNumber: number) => {
    const coupons = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber);
    console.log('coupons', JSON.stringify(coupons, null, 3));
    const { data } = coupons;
    setCoupons(data);
    return coupons;
  };
  useEffect(() => {
    loader.show();
    const getUserCoupons = async () => {
      const userCoupons = await citiCouponsServices.getUserCoupons(user.userId as string, userState, userMunicipality);
      const { data } = userCoupons;
      setUserCoupons(data);
      console.log('usercoupons', JSON.stringify(userCoupons.data, null, 3));
      loader.hide();
    };
    //getCoupons(0);
    getUserCoupons();
  }, [isFocused, userState, userMunicipality]);

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  return <CouponsScrollScreen coupons={coupons} userCoupons={userCoupons} loadMoreItem={loadMoreItem} onPressSearch={onPressSearch} isLoading={isLoading} />;
  //<CouponsScreen coupons={coupons} userCoupons={userCoupons} />;
};

export default CouponsController;
