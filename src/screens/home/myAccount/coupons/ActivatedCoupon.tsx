import { Container, CustomModal, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useEffect, useState } from 'react';
import { ScrollView, Platform, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'utils/scaleMetrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import QRCode from 'react-native-qrcode-svg';
import RNQRGenerator from 'rn-qr-generator';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useLoading, useToast } from 'context';
import { citiCouponsServices } from 'services/coupons.services';
import AnimatedLottieView from 'lottie-react-native';
import redeemedAnimation from '../../../../assets/images/success-redeemed.json';
import { formatDate } from 'utils/functions';

interface ModalProps {
  visible: boolean;
  onPressClose: () => void;
}

const MoreDetailModal: React.FC<ModalProps> = ({ visible, onPressClose }) => {
  const route = useRoute<RouteProp<HomeStackParams, 'ActivatedCoupon'>>();
  const { params } = route;

  return (
    <CustomModal visible={visible} animationType={'slide'}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: theme.brandColor.iconn_light_grey,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: '100%',
            padding: 16,
            maxHeight: '80%'
          }}
        >
          <Touchable onPress={onPressClose}>
            <AntDesign name="close" size={24} style={{ alignSelf: 'flex-end' }} />
          </Touchable>
          <TextContainer text={params.couponInfo.descriptiontitle} fontBold fontSize={16} marginLeft={16} marginRight={80} marginTop={20} />
          <TextContainer
            text={params.couponInfo.descriptionsubtitle}
            textColor={theme.brandColor.iconn_green_original}
            fontBold
            fontSize={18}
            marginLeft={16}
            marginTop={4}
          />
          <TextContainer
            text={params.couponInfo.description ? params.couponInfo.description : params.couponInfo.descriptionc}
            fontSize={14}
            marginRight={16}
            marginLeft={16}
            marginTop={24}
          />
          <TextContainer text={params.couponInfo.descriptiontyc} fontSize={12} marginRight={16} marginLeft={16} marginTop={32} marginBottom={40} />
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const ActivatedCoupon: React.FC = () => {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [cs, setCS] = useState<number>();
  const [rd, setRD] = useState<string>();
  const route = useRoute<RouteProp<HomeStackParams, 'ActivatedCoupon'>>();
  const { params } = route;
  const loader = useLoading();
  loader.hide();

  //console.log('params Activated', params);

  const getCouponStatus = async (couponId: string) => {
    const status = await citiCouponsServices.getCoupon(couponId);
    const { data } = status;
    return data;
  };

  const couponStatus = async () => {
    const statusCoupon = await getCouponStatus(params.couponActivatedData);
    const d1 = new Date(statusCoupon.redemptionDate);
    const dRedeemed = formatDate(d1);
    setCS(statusCoupon.coupons_status_id);
    setRD(dRedeemed);
  };
  useEffect(() => {
    couponStatus();
  }, []);

  RNQRGenerator.generate({
    value: params.couponActivatedData,
    height: 200,
    width: 200,
    correctionLevel: 'H'
  })
    .then(response => {
      const { uri } = response;
      setQrImage(uri);
    })
    .catch(error => console.log('Cannot create QR code', error));

  async function hasAndroidPermission() {
    const permission = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(qrImage, { type: 'photo' });
    toast.show({
      message: 'Código guardado exitosamente.',
      type: 'success'
    });
  }

  const onPressOpen = () => {
    setModalVisible(true);
  };

  const onPressClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container backgroundColor={theme.brandColor.iconn_white} flex>
        <Container row backgroundColor={theme.brandColor.iconn_background} style={{ width: '100%', height: '20%' }}>
          <Image
            source={{ uri: params.couponInfo.activecouponimage }}
            style={{
              height: verticalScale(80),
              width: moderateScale(120),
              marginTop: verticalScale(23),
              marginBottom: verticalScale(26),
              marginLeft: moderateScale(27)
            }}
            resizeMode="contain"
          />
          <Container>
            <TextContainer
              text={params.couponInfo.name}
              marginTop={verticalScale(22.5)}
              marginLeft={moderateScale(10)}
              marginRight={moderateScale(150)}
              fontSize={14}
              numberOfLines={2}
            />
            <Touchable onPress={onPressOpen}>
              <TextContainer
                text="Más detalles"
                fontBold
                underline
                textColor={theme.fontColor.light_green}
                marginTop={verticalScale(14)}
                marginLeft={moderateScale(10)}
                marginRight={moderateScale(36)}
                fontSize={14}
              />
            </Touchable>
          </Container>
        </Container>
        <Container center>
          {cs === 2 ? (
            <Container style={{ marginTop: verticalScale(50) }} />
          ) : (
            <Container>
              <TextContainer text="Escanea este código en tienda" fontBold fontSize={18} marginTop={verticalScale(30)} />
              <TextContainer text="para hacer válido tu cupón" fontSize={14} marginTop={verticalScale(4)} textAlign="center" />
            </Container>
          )}
          <Container
            center
            style={{
              height: verticalScale(200),
              width: moderateScale(200),
              marginTop: verticalScale(15),
              marginBottom: verticalScale(26)
            }}
          >
            {cs === 2 ? (
              <Container style={{ justifyContent: 'center' }}>
                <AnimatedLottieView
                  style={{
                    width: moderateScale(80),
                    height: verticalScale(80),
                    zIndex: 2,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    position: 'absolute'
                  }}
                  source={redeemedAnimation}
                  autoPlay
                  loop={false}
                />
                <Container style={{ zIndex: 1, opacity: 0.25, justifyContent: 'center', alignSelf: 'center' }}>
                  <QRCode value={params.couponActivatedData} size={210} />
                </Container>
              </Container>
            ) : (
              <QRCode value={params.couponActivatedData} size={210} />
            )}
          </Container>
          {cs === 2 ? (
            <Container>
              <TextContainer text="¡Cupón redimido exitosamente!" fontBold fontSize={18} />
              <TextContainer text={rd as string} textAlign="center" fontSize={14} marginTop={12} />
            </Container>
          ) : (
            <Touchable onPress={savePicture}>
              <Container
                row
                style={{
                  marginBottom: verticalScale(100),
                  paddingLeft: moderateScale(4),
                  paddingRight: moderateScale(8),
                  paddingVertical: verticalScale(8),
                  borderColor: theme.brandColor.iconn_med_grey,
                  borderWidth: 1,
                  borderRadius: 8
                }}
              >
                <AntDesign name="download" size={moderateScale(20)} />
                <TextContainer text="Descargar" marginLeft={moderateScale(4)} />
              </Container>
            </Touchable>
          )}
        </Container>
      </Container>
      <MoreDetailModal visible={modalVisible} onPressClose={onPressClose} />
    </ScrollView>
  );
};

export default ActivatedCoupon;
