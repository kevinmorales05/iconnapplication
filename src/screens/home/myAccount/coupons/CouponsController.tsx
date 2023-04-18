import React, { useEffect, useState } from 'react';
import { CouponInterface, UserCouponInterface } from 'rtk/types/coupons.types';
import { citiCouponsServices } from 'services/coupons.services';
import { useLocation } from 'hooks/useLocation';
import { RootState, useAppSelector } from 'rtk';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CouponsScrollScreen from './CouponsScrollScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

const CouponsController: React.FC = () => {
  const { completeGeolocation, getCurrentLocation } = useLocation();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [coupons, setCoupons] = useState<CouponInterface[]>();
  const [userCoupons, setUserCoupons] = useState<UserCouponInterface[]>([]);
  const [userMunicipality, setUserMunicipality] = useState('none');
  const [userState, setUserState] = useState('none');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(true);
  const [pageCoupon, setPageCoupon] = useState(0);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(false);
  const [mixedCoupons, setMixedCoupons] = useState<UserCouponInterface[]>([]);
  const isFocused = useIsFocused();

  function compareFn(a: UserCouponInterface, b: UserCouponInterface) {
    if (a.coupons_status_id === 2 && b.coupons_status_id !== 2) {
      return 1;
    }
    if (a.coupons_status_id !== 2 && b.coupons_status_id === 2) {
      return -1;
    }
    return 0;
  }

  const getCouponsMixed = () => {
    if (coupons && userCoupons) {
      if (coupons.length > 0 && userCoupons.length > 0) {
        const mixed: UserCouponInterface[] = [];
        coupons.forEach(coupon => {
          const couponfound = userCoupons.find(userCoupon => userCoupon.promotionid === coupon.promotionid);
          if (couponfound !== undefined) {
            mixed.push(couponfound);
          } else if (couponfound === undefined) {
            const searchList: UserCouponInterface = mixed.find(mix => mix.promotionid === coupon.promotionid) as UserCouponInterface;
            if (searchList === undefined) {
              const newCoup: UserCouponInterface = {
                activecouponimage: coupon.activecouponimage,
                code: '',
                coupons_status_id: 0,
                description: coupon.descriptionc,
                descriptionsubtitle: coupon.descriptionsubtitle,
                descriptiontitle: coupon.descriptiontitle,
                descriptiontyc: coupon.descriptiontyc,
                enddate: coupon.enddate,
                establishment: coupon.establishment,
                imageurl: coupon.imageurl,
                listviewimage: coupon.listviewimage,
                name: coupon.name,
                promotionid: coupon.promotionid,
                startdate: coupon.startdate,
                type: coupon.type,
                updatedat: null
              };
              mixed.push(newCoup);
            }
          }
        });
        mixed.sort(compareFn);
        setMixedCoupons(mixed);
      }
    }
  };

  const halp = async () => {
    await getCurrentLocation();
    const googleLocation = completeGeolocation.plus_code.compound_code.split(',');
    const googleState = completeGeolocation.plus_code.compound_code.split(',')[1];
    const googleM = completeGeolocation.plus_code.compound_code.trim().split(' ')[1];
    const googleMunicipality = googleM.replace(',', '');
    console.log('completeGeolocation', JSON.stringify(completeGeolocation, null, 3));
    console.log('BONES', googleLocation, googleState, googleMunicipality);
    setUserMunicipality(googleMunicipality);
    setUserState(googleState);
  };
  useEffect(() => {
    halp();
  }, [halp]);

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

  const getCoupons = async (pageNumber: number) => {
    const couponsGot = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber, 20);
    if (couponsGot.responseCode === 6004) {
      setCoupons([]);
    } else if (couponsGot.responseCode === 6003) {
      const { data } = couponsGot;
      setCoupons(data);
    }
  };

  useEffect(() => {
    const getUserCoupons = async () => {
      const userCoupons = await citiCouponsServices.getUserCoupons(user.userId as string, userState, userMunicipality);
      const { data } = userCoupons;
      setUserCoupons(data);
      return data as UserCouponInterface[];
    };
    getCoupons(pageCoupon);
    getUserCoupons();
    getCouponsMixed();
  }, [isFocused, userState, userMunicipality]);

  const onPressSearch = () => {
    navigate('SearchProducts');
  };

  return (
    <CouponsScrollScreen
      couponsMixed={mixedCoupons}
      coupons={coupons}
      userCoupons={userCoupons}
      loadMoreItem={loadMoreItem}
      onPressSearch={onPressSearch}
      isLoading={isLoading}
    />
  );
};

export default CouponsController;
