import { useLoading } from 'context';
import React, { useEffect, useState } from 'react';
import { CouponInterface, UserCouponInterface, UserCouponWithStateInterface } from 'rtk/types/coupons.types';
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
  const [coupons, setCoupons] = useState<CouponInterface[]>([]);
  const [userCoupons, setUserCoupons] = useState<UserCouponInterface[]>([]);
  const [userMunicipality, setUserMunicipality] = useState('none');
  const [userState, setUserState] = useState('none');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(true);
  const [pageCoupon, setPageCoupon] = useState(0);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(false);
  const [mixedCoupons, setMixedCoupons] = useState<UserCouponInterface[]>([]);
  const loader = useLoading();
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
            console.log('murcielago', newCoup);
          } else {
            console.log('Ya estaba');
          }
        }
      });
      mixed.sort(compareFn);
      setMixedCoupons(mixed);
      console.log('ALPACA', mixed);
    }
  };

  //console.log('PERA', couponsWithState);
  //console.log('MANGO', cIDAndState);
  //console.log('BANANA', mixedCoupons);
  const halp = async () => {
    const plsHelp = await getCurrentLocation();
    //console.log('plsHelp', plsHelp);
    ///console.log('completeGeolocation', JSON.stringify(completeGeolocation, null, 3));
    setUserMunicipality(completeGeolocation.results[0].address_components[3].short_name);
    setUserState(completeGeolocation.results[0].address_components[4].long_name);
  };
  useEffect(() => {
    halp();
  }, [halp]);
  console.log('userMunicipality', userMunicipality);
  console.log('userState', userState);
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
      //console.log('llego aqui');
      if (!isLoading && isLoadingMore) {
        loadMoreCoupons();
        setOnEndReachedCalledDuringMomentum(true);
      }
    }
  };

  /*   useEffect(() => {
    getCoupons(pageCoupon);
  }, []); */

  const getCoupons = async (pageNumber: number) => {
    //loader.show();
   if (userState !== ' ' && userMunicipality !== ' ') {
      const couponsHome = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber, 20);
      if (couponsHome.responseCode === 6004) {
        setCoupons([]);
      } else if (couponsHome.responseCode === 6003) {
        const { data } = couponsHome;
        setCoupons(data);
      }
    } else if (userState === ' ' && userMunicipality=== ' ') {
      const couponsHome = await citiCouponsServices.getPromotionsCoupons(userState, userMunicipality, pageNumber, 20);
      if (couponsHome.responseCode === 6004) {
        setCoupons([]);
      } else if (couponsHome.responseCode === 6003) {
        const { data } = couponsHome;
        setCoupons(data);
      }
    } else if (userState === ' ' && userMunicipality !== ' ' ) {
      setCoupons([]);
    }
    //return coupons;
  };

  useEffect(() => {
    const getUserCoupons = async () => {
      const userCoupons = await citiCouponsServices.getUserCoupons(user.userId as string, userState, userMunicipality);
      const { data } = userCoupons;
      setUserCoupons(data);
      //console.log('usercoupons', JSON.stringify(userCoupons.data, null, 3));
      //loader.hide();
      return data as UserCouponInterface[];
    };
    //getCoupons(0);
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
  //<CouponsScreen coupons={coupons} userCoupons={userCoupons} />;
};

export default CouponsController;
