import { ICONN_ACCOUNT_COUPON, ICONN_CARD_PETRO, ICONN_CARD_SEVEN, ICONN_COUPON_NOCOUPON } from 'assets/images';
import { CardProductSkeleton, Container, SafeArea, SearchBar, TabAnimatable, TextContainer, Touchable } from 'components';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TabItem } from 'rtk';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CouponInterface, UserCouponInterface, UserCouponWithStateInterface } from 'rtk/types/coupons.types';
import { formatDate, formatDate3 } from 'utils/functions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useInConstruction } from 'context';

const NoActivated = () => {
  return (
    <Container center crossCenter style={{ marginTop: verticalScale(100) }}>
      <Image source={ICONN_ACCOUNT_COUPON} style={{ height: verticalScale(40), width: moderateScale(40) }} />
      <TextContainer text="Sin cupones activos" fontBold fontSize={16} marginTop={verticalScale(9)} />
      <TextContainer text="¡Aún no has activado ningún cupón!" fontSize={12} marginTop={verticalScale(11)} />
    </Container>
  );
};

const NoCoupons = () => {
  return (
    <Container center crossCenter style={{ marginTop: verticalScale(100) }}>
      <Image source={ICONN_COUPON_NOCOUPON} style={{ height: verticalScale(40), width: moderateScale(40) }} />
      <TextContainer text="Sin cupones disponibles" fontBold fontSize={16} marginTop={verticalScale(9)} />
      <TextContainer
        text="Estamos preparando cupones para ti, espéralos próximamente."
        fontSize={12}
        marginTop={verticalScale(11)}
        marginHorizontal={moderateScale(62)}
        textAlign="center"
      />
    </Container>
  );
};

interface CouponCardProps {
  item?: CouponInterface;
  itemUser?: UserCouponInterface;
  userCoupons: UserCouponInterface[];
  coupons: CouponInterface[];
}
const CouponCard: React.FC<CouponCardProps> = ({ item, itemUser, userCoupons, coupons }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const inConstruction = useInConstruction();

  //console.log('MARTILLO', item);

  //console.log('amarillo', cs, itemUser?.name);
  //console.log('AQUI', userCoupons);
  function verifyIfActivated(coupon: UserCouponInterface) {
    return coupon.promotionid === item?.promotionid;
  }

  if (item) {
    const activatedPromotion = userCoupons ? userCoupons.find(verifyIfActivated) : undefined;
    /*  const couponStat = async () => {
      const statusCoupon = await getCouponStatus(activatedPromotion?.code as string);
      //console.log('SANDIA', statusCoupon);
      setCs(statusCoupon);
      return statusCoupon;
    };
    const coupStat = couponStat(); */
    //console.log('activatedPromotion', activatedPromotion);
    const d1 = new Date(item.startdate);
    const dFrom = formatDate3(d1);
    const d2 = new Date(item.enddate);
    const dTo = formatDate3(d2);
    if (activatedPromotion?.coupons_status_id === 2) {
      const fromIndex = coupons.indexOf(item);
      const toIndex = coupons.length - 1;
      const splice = coupons.splice(fromIndex, 1)[0];
      coupons.splice(toIndex, 0, splice);
      return (
        <Touchable
          onPress={() => {
            if (item.type === 'Accumulation') {
              inConstruction.show(true);
            } else if (activatedPromotion !== undefined) {
              navigate('ActivatedCoupon', { couponInfo: activatedPromotion, couponActivatedData: activatedPromotion.code, origin: 'Coupons' });
            } else {
              navigate('CouponDetail', { couponInfo: item, origin: 'Coupons' });
            }
          }}
        >
          <Container style={{ marginLeft: moderateScale(5), marginRight: moderateScale(5), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: item.listviewimage }}
              style={{ width: moderateScale(156), height: verticalScale(134), borderTopRightRadius: 8, borderTopLeftRadius: 8, opacity: 0.4 }}
              resizeMode="cover"
            />
            <Container
              width={'100%'}
              height={verticalScale(50)}
              row
              backgroundColor={theme.brandColor.iconn_white}
              style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}
              center
            >
              <Container row style={{ marginRight: 16, marginLeft: 5 }}>
                <AntDesign name="checkcircle" color={theme.brandColor.iconn_green_original} size={moderateScale(16)} />
                <TextContainer fontSize={8} text="Cupón redimido" fontBold marginTop={verticalScale(3)} marginLeft={moderateScale(4)} />
              </Container>
              <Image
                source={item.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                style={item.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
                resizeMode="center"
              />
            </Container>
          </Container>
        </Touchable>
      );
    } else {
      return (
        <Touchable
          onPress={() => {
            if (item.type === 'Accumulation') {
              inConstruction.show(true);
            } else if (activatedPromotion !== undefined) {
              navigate('ActivatedCoupon', { couponInfo: activatedPromotion, couponActivatedData: activatedPromotion.code, origin: 'Coupons' });
            } else {
              navigate('CouponDetail', { couponInfo: item, origin: 'Coupons' });
            }
          }}
        >
          <Container style={{ marginLeft: moderateScale(5), marginRight: moderateScale(5), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: item.listviewimage }}
              style={{ width: moderateScale(156), height: verticalScale(134), borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
              resizeMode="cover"
            />
            <Container
              width={'100%'}
              height={verticalScale(50)}
              backgroundColor={theme.brandColor.iconn_white}
              style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8, paddingTop: verticalScale(8) }}
            >
              <Container style={{ marginRight: moderateScale(8), marginVertical: verticalScale(0), marginLeft: moderateScale(5) }}>
                <Container row space="between">
                  <TextContainer fontSize={12} text="Vigencia" />
                  <Image
                    source={item.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                    style={item.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
                    resizeMode="center"
                  />
                </Container>
                <TextContainer fontSize={12} text={`${dFrom} al ${dTo}`} marginBottom={5} marginTop={5} />
              </Container>
            </Container>
          </Container>
        </Touchable>
      );
    }
  } else if (itemUser) {
    const d1 = new Date(itemUser.startdate);
    const dFrom = formatDate3(d1);
    const d2 = new Date(itemUser.enddate);
    const dTo = formatDate3(d2);
    if (itemUser.coupons_status_id === 2) {
      return (
        <Touchable onPress={() => navigate('ActivatedCoupon', { couponInfo: itemUser, couponActivatedData: itemUser.code, origin: 'Coupons' })}>
          <Container style={{ marginLeft: moderateScale(8), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Container backgroundColor={'transparent'}>
              <Image
                source={{ uri: itemUser.listviewimage }}
                style={{ width: moderateScale(156), height: verticalScale(144), borderTopRightRadius: 8, borderTopLeftRadius: 8, opacity: 0.4 }}
                resizeMode="stretch"
              />
            </Container>
            <Container
              width={'100%'}
              height={verticalScale(50)}
              row
              backgroundColor={theme.brandColor.iconn_white}
              style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}
              center
            >
              <Container row style={{ marginRight: 16, marginLeft: 5 }}>
                <AntDesign name="checkcircle" color={theme.brandColor.iconn_green_original} size={moderateScale(16)} />
                <TextContainer fontSize={8} text="Cupón redimido" fontBold marginTop={verticalScale(3)} marginLeft={moderateScale(4)} />
              </Container>
              <Image
                source={itemUser.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                style={itemUser.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
                resizeMode="center"
              />
            </Container>
          </Container>
        </Touchable>
      );
    } else {
      return (
        <Touchable onPress={() => navigate('ActivatedCoupon', { couponInfo: itemUser, couponActivatedData: itemUser.code, origin: 'Coupons' })}>
          <Container style={{ marginLeft: moderateScale(8), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: itemUser.listviewimage }}
              style={{ width: moderateScale(156), height: verticalScale(144), borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
              resizeMode="stretch"
            />
            <Container
              width={'100%'}
              height={verticalScale(50)}
              backgroundColor={theme.brandColor.iconn_white}
              style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8, paddingTop: verticalScale(8) }}
            >
              <Container style={{ marginRight: moderateScale(8), marginVertical: verticalScale(0), marginLeft: moderateScale(5) }}>
                <Container row space="between">
                  <TextContainer fontSize={12} text="Vigencia" />
                  <Image
                    source={itemUser.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                    style={itemUser.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
                    resizeMode="center"
                  />
                </Container>
                <TextContainer fontSize={12} text={`${dFrom} al ${dTo}`} marginBottom={5} marginTop={5} />
              </Container>
            </Container>
          </Container>
        </Touchable>
      );
    }
    //console.log('Fechas', d1, dFrom, d2, dTo);
    //console.log('itemUser.Promotions_Cupon.start_date', itemUser.Promotions_Cupon.start_date);
  } else {
    return <></>;
  }
};

interface Props {
  couponsMixed: UserCouponInterface[];
  userCoupons: UserCouponInterface[];
  loadMoreItem: () => void;
  onPressSearch: () => void;
  isLoading: boolean;
  coupons: CouponInterface[];
}

const CouponsScrollScreen: React.FC<Props> = ({ coupons, userCoupons, loadMoreItem, onPressSearch, isLoading, couponsMixed }) => {
  //console.log('usercoupons Screen', JSON.stringify(userCoupons, null, 3));
  //console.log('USER COUPONS LENGHT', userCoupons.length);
  const [idCouponTab, setIdCouponTab] = useState<string>('1');

  console.log('coupons from Screen', JSON.stringify(coupons, null, 3), coupons.length);

  const couponsTab: TabItem[] = [
    {
      id: '1',
      name: 'Todos'
    },
    {
      id: '2',
      name: '7-Eleven'
    },
    {
      id: '3',
      name: 'Petro Seven'
    },
    {
      id: '4',
      name: 'Activados'
    }
  ];

  const onPressTab = (couponTab: TabItem) => {
    setIdCouponTab(couponTab.id);
  };

  function compareFn(a: UserCouponInterface, b: UserCouponInterface) {
    if (a.coupons_status_id === 2 && b.coupons_status_id === 1) {
      return 1;
    }
    if (a.coupons_status_id === 1 && b.coupons_status_id === 2) {
      return -1;
    }
    return 0;
  }

  const orderedCoupons = userCoupons ? userCoupons.sort(compareFn) : [];
  console.log('orderedCoupons', orderedCoupons);

  const skeletor = [1, 2, 3, 4, 5, 6];

  const _renderFooter = () => {
    if (isLoading) {
      const residuoOperation = coupons.length % 2;
      if (residuoOperation === 0) {
        return (
          <Container
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: Dimensions.get('screen').width,
              paddingHorizontal: moderateScale(15),
              left: -moderateScale(15)
            }}
          >
            <CardProductSkeleton notMarinLeft />
            <CardProductSkeleton notMarinLeft />
          </Container>
        );
      } else {
        return (
          <Container row>
            <CardProductSkeleton notMarinLeft />
          </Container>
        );
      }
    }
    return <Container height={moderateScale(60)} />;
  };

  return (
    <SafeArea backgroundColor={theme.brandColor.iconn_background}>
      <Container backgroundColor={theme.brandColor.iconn_white} style={{ marginHorizontal: moderateScale(-13) }}>
        <Container style={{ marginHorizontal: 8, marginTop: 10 }}>
          <SearchBar isButton onPressSearch={onPressSearch} onChangeTextSearch={() => {}} placeHolderText={'¿Qué estás buscando?'} />
        </Container>
        <Container style={{ marginTop: 16, paddingHorizontal: 8 }}>
          <TabAnimatable items={couponsTab} idSelected={idCouponTab} onPressItem={onPressTab} />
        </Container>
      </Container>
      <Container style={{ marginBottom: verticalScale(100) }} backgroundColor={theme.brandColor.iconn_background}>
        {coupons.length === 0 ? (
          <FlatList
            numColumns={2}
            data={skeletor}
            renderItem={({ item }) => <CardProductSkeleton notMarinLeft={false} />}
            //ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
            /* onEndReached={loadMoreItem} */
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '1' && coupons.length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '2' && coupons.filter(coupon => coupon.establishment === '7Eleven').length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '3' && coupons.filter(coupon => coupon.establishment === 'Petro7').length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '1' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            //ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
            /* onEndReached={loadMoreItem} */
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '2' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.establishment === '7Eleven')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            /*             ListFooterComponent={_renderFooter}
             */ onEndReachedThreshold={0}
            /* onEndReached={loadMoreItem} */
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '3' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.establishment === 'Petro7')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            /*             ListFooterComponent={_renderFooter}
             */ onEndReachedThreshold={0}
            /* onEndReached={loadMoreItem} */
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '4' && userCoupons.length === 0 ? (
          <NoActivated />
        ) : idCouponTab === '4' && userCoupons ? (
          <FlatList
            numColumns={2}
            data={orderedCoupons}
            renderItem={({ item }) => <CouponCard itemUser={item} userCoupons={userCoupons} coupons={coupons} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <></>
        )}
      </Container>
    </SafeArea>
  );
};

export default CouponsScrollScreen;

const styles = StyleSheet.create({
  sevenEleven: {
    height: verticalScale(8),
    width: moderateScale(40),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(5),
    marginRight: moderateScale(2)
  },
  petroSeven: {
    height: verticalScale(16.7),
    width: moderateScale(41)
  },
  sevenElevenActivated: {
    height: verticalScale(8),
    width: moderateScale(40)
  },
  petroSevenActivated: {
    height: verticalScale(16.7),
    width: moderateScale(41),
    marginVertical: verticalScale(9),
    marginRight: moderateScale(5)
  }
});
