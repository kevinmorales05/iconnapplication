import { ICONN_ACCOUNT_COUPON, ICONN_CARD_PETRO, ICONN_CARD_SEVEN, ICONN_COUPON_NOCOUPON } from 'assets/images';
import { CardProductSkeleton, Container, SafeArea, SearchBar, TabAnimatable, TextContainer, Touchable } from 'components';
import { FlatList, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TabItem } from 'rtk';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CouponInterface, UserCouponInterface } from 'rtk/types/coupons.types';
import { formatDate3 } from 'utils/functions';
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

  function verifyIfActivated(coupon: UserCouponInterface) {
    return coupon.value.promotionid === item?.value.promotionid;
  }

  if (item) {
    const activatedPromotion = userCoupons ? userCoupons.find(verifyIfActivated) : undefined;
    const d1 = new Date(item.value.startdate);
    const dFrom = formatDate3(d1);
    const d2 = new Date(item.value.enddate);
    const dTo = formatDate3(d2);
    if (activatedPromotion?.value.coupons_status_id === 2) {
      const fromIndex = coupons.indexOf(item.value);
      const toIndex = coupons.length - 1;
      const splice = coupons.splice(fromIndex, 1)[0];
      coupons.splice(toIndex, 0, splice);
      return (
        <Touchable
          onPress={() => {
            if (item.value.type === 'Accumulation') {
              inConstruction.show(true);
            } else if (activatedPromotion.value !== undefined) {
              navigate('ActivatedCoupon', { couponInfo: activatedPromotion.value, couponActivatedData: activatedPromotion.value.code, origin: 'Coupons' });
            } else {
              navigate('CouponDetail', { couponInfo: item.value, origin: 'Coupons' });
            }
          }}
        >
          <Container style={{ marginLeft: moderateScale(5), marginRight: moderateScale(5), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: item.value.listviewimage }}
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
                source={item.value.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                style={item.value.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
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
            if (item.value.type === 'Accumulation') {
              inConstruction.show(true);
            } else if (activatedPromotion !== undefined) {
              navigate('ActivatedCoupon', { couponInfo: activatedPromotion.value, couponActivatedData: activatedPromotion.value.code, origin: 'Coupons' });
            } else {
              navigate('CouponDetail', { couponInfo: item.value, origin: 'Coupons' });
            }
          }}
        >
          <Container style={{ marginLeft: moderateScale(5), marginRight: moderateScale(5), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: item.value.listviewimage }}
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
                    source={item.value.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                    style={item.value.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
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
    const d1 = new Date(itemUser.value.startdate);
    const dFrom = formatDate3(d1);
    const d2 = new Date(itemUser.value.enddate);
    const dTo = formatDate3(d2);
    if (itemUser.value.coupons_status_id === 2) {
      return (
        <Touchable onPress={() => navigate('ActivatedCoupon', { couponInfo: itemUser.value, couponActivatedData: itemUser.value.code, origin: 'Coupons' })}>
          <Container style={{ marginLeft: moderateScale(8), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Container backgroundColor={'transparent'}>
              <Image
                source={{ uri: itemUser.value.listviewimage }}
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
                source={itemUser.value.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                style={itemUser.value.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
                resizeMode="center"
              />
            </Container>
          </Container>
        </Touchable>
      );
    } else {
      return (
        <Touchable onPress={() => navigate('ActivatedCoupon', { couponInfo: itemUser.value, couponActivatedData: itemUser.value.code, origin: 'Coupons' })}>
          <Container style={{ marginLeft: moderateScale(8), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
            <Image
              source={{ uri: itemUser.value.listviewimage }}
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
                    source={itemUser.value.establishment === '7Eleven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
                    style={itemUser.value.establishment === '7Eleven' ? styles.sevenEleven : styles.petroSeven}
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
  const [idCouponTab, setIdCouponTab] = useState<string>('1');

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
    if (a.value.coupons_status_id === 2 && b.value.coupons_status_id === 1) {
      return 1;
    }
    if (a.value.coupons_status_id === 1 && b.value.coupons_status_id === 2) {
      return -1;
    }
    return 0;
  }

  const orderedCoupons = userCoupons ? userCoupons.sort(compareFn) : [];

  const skeletor = [1, 2, 3, 4, 5, 6];

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
        {coupons === undefined ? (
          <FlatList
            numColumns={2}
            data={skeletor}
            renderItem={({ item }) => <CardProductSkeleton notMarinLeft={false} />}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '1' && coupons.length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '2' && coupons.filter(coupon => coupon.value.establishment === '7Eleven').length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '3' && coupons.filter(coupon => coupon.value.establishment === 'Petro7').length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '1' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '2' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.value.establishment === '7Eleven')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            onEndReachedThreshold={0}
            showsVerticalScrollIndicator={false}
          />
        ) : idCouponTab === '3' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.value.establishment === 'Petro7')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} coupons={coupons} />}
            onEndReachedThreshold={0}
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
