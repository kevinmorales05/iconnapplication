import { ICONN_ACCOUNT_COUPON, ICONN_CARD_PETRO, ICONN_CARD_SEVEN, ICONN_COUPON_NOCOUPON } from 'assets/images';
import { Container, SafeArea, SearchBar, TabAnimatable, TextContainer, Touchable } from 'components';
import { FlatList, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TabItem } from 'rtk';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import { CouponInterface, UserCouponInterface } from 'rtk/types/coupons.types';
import { formatDate } from 'utils/functions';
import { FlashList } from '@shopify/flash-list';

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
}
const CouponCard: React.FC<CouponCardProps> = ({ item, itemUser, userCoupons }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  //console.log('AQUI', userCoupons);
  function verifyIfActivated(coupon: UserCouponInterface) {
    return coupon.promotionid === item?.promotionid;
  }
  if (item) {
    const activatedPromotion = userCoupons.find(verifyIfActivated);
    //console.log('activatedPromotion', activatedPromotion);
    const d1 = new Date(item.startdate);
    const dFrom = formatDate(d1);
    const d2 = new Date(item.enddate);
    const dTo = formatDate(d2);
    return (
      <Touchable
        onPress={() =>
          activatedPromotion !== undefined
            ? navigate('ActivatedCoupon', { couponInfo: activatedPromotion, couponActivatedData: activatedPromotion.code, origin: 'Coupons' })
            : navigate('CouponDetail', { couponInfo: item })
        }
      >
        <Container style={{ marginLeft: moderateScale(5), marginRight: moderateScale(5), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
          <Image
            source={{ uri: item.imageurl }}
            style={{ width: moderateScale(156), height: verticalScale(144), borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
            resizeMode="stretch"
          />
          <Container width={'100%'} row backgroundColor={theme.brandColor.iconn_white} style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>
            <Container style={{ marginRight: moderateScale(12) }}>
              <TextContainer fontSize={8} text="Vigencia" />
              <TextContainer fontSize={8} text={`${dFrom} al ${dTo}`} marginBottom={5} />
            </Container>
            <Image
              source={item.establishment === 'Seven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
              style={item.establishment === 'Seven' ? styles.sevenEleven : styles.petroSeven}
              resizeMode="center"
            />
          </Container>
        </Container>
      </Touchable>
    );
  } else if (itemUser) {
    const d1 = new Date(itemUser.Promotions_Cupon.startdate);
    const dFrom = formatDate(d1);
    const d2 = new Date(itemUser.Promotions_Cupon.enddate);
    const dTo = formatDate(d2);
    //console.log('Fechas', d1, dFrom, d2, dTo);
    //console.log('itemUser.Promotions_Cupon.start_date', itemUser.Promotions_Cupon.start_date);
    return (
      <Touchable onPress={() => navigate('ActivatedCoupon', { couponInfo: itemUser.Promotions_Cupon, couponActivatedData: itemUser.code })}>
        <Container style={{ marginLeft: moderateScale(8), marginTop: verticalScale(16), paddingLeft: moderateScale(3) }}>
          <Image
            source={{ uri: itemUser.Promotions_Cupon.imageUrl }}
            style={{ width: moderateScale(156), height: verticalScale(144), borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
            resizeMode="stretch"
          />
          <Container width={'100%'} row backgroundColor={theme.brandColor.iconn_white} style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>
            <Container style={{ marginRight: moderateScale(12) }}>
              <TextContainer fontSize={8} text="Vigencia" />
              <TextContainer fontSize={8} text={`${dFrom} al ${dTo}`} marginBottom={5} />
            </Container>
            <Image
              source={itemUser.Promotions_Cupon.establishment === 'Seven' ? ICONN_CARD_SEVEN : ICONN_CARD_PETRO}
              style={itemUser.Promotions_Cupon.establishment === 'Seven' ? styles.sevenEleven : styles.petroSeven}
              resizeMode="center"
            />
          </Container>
        </Container>
      </Touchable>
    );
  } else {
    return <></>;
  }
};

interface Props {
  coupons: CouponInterface[];
  userCoupons: UserCouponInterface[];
}

const CouponsScreen: React.FC<Props> = ({ coupons, userCoupons }) => {
  console.log('usercoupons Screen', JSON.stringify(userCoupons, null, 3));
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
  return (
    <SafeArea backgroundColor={theme.brandColor.iconn_background}>
      <Container backgroundColor={theme.brandColor.iconn_white} style={{ marginHorizontal: moderateScale(-13) }}>
        <Container style={{ marginHorizontal: 8, marginTop: 10 }}>
          <SearchBar isButton onPressSearch={() => {}} onChangeTextSearch={() => {}} placeHolderText={'¿Qué estás buscando?'} />
        </Container>
        <Container style={{ marginTop: 16, paddingHorizontal: 8 }}>
          <TabAnimatable items={couponsTab} idSelected={idCouponTab} onPressItem={onPressTab} />
        </Container>
      </Container>
      <Container style={{ paddingBottom: verticalScale(100) }} backgroundColor={theme.brandColor.iconn_background}>
        {idCouponTab === '1' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons}
            renderItem={({ item }) => (
              //<Image source={{uri: item.imageUrl}} style={{width: 30, height: 30}} />
              <CouponCard item={item} userCoupons={userCoupons} />
            )}
          />
        ) : idCouponTab === '2' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.establishment === 'Seven')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} />}
          />
        ) : idCouponTab === '3' && coupons.length > 0 ? (
          <FlatList
            numColumns={2}
            data={coupons.filter(coupon => coupon.establishment === 'Seven')}
            renderItem={({ item }) => <CouponCard item={item} userCoupons={userCoupons} />}
          />
        ) : (idCouponTab === '1' || idCouponTab === '2' || idCouponTab === '3') && coupons.length === 0 ? (
          <NoCoupons />
        ) : idCouponTab === '4' && userCoupons.length > 0 ? (
          <FlatList numColumns={2} data={userCoupons} renderItem={({ item }) => <CouponCard itemUser={item} userCoupons={userCoupons} />} />
        ) : idCouponTab === '4' && userCoupons.length === 0 ? (
          <NoActivated />
        ) : (
          <></>
        )}
      </Container>
    </SafeArea>
  );
};

export default CouponsScreen;

const styles = StyleSheet.create({
  sevenEleven: {
    height: verticalScale(8),
    width: moderateScale(43),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5)
  },
  petroSeven: {
    height: verticalScale(16.7),
    width: moderateScale(41)
  }
});
