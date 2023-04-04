import { Container, CustomModal, TextContainer, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useState } from 'react';
import { ScrollView, Platform, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'utils/scaleMetrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParams } from 'navigation/types';
import QRCode from 'react-native-qrcode-svg';
import RNQRGenerator from 'rn-qr-generator';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useToast } from 'context';

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
  const route = useRoute<RouteProp<HomeStackParams, 'ActivatedCoupon'>>();
  const { params } = route;

  console.log('params Activated', params);

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
    console.log('params Activated', params);
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
              marginLeft={moderateScale(16)}
              marginRight={moderateScale(200)}
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
                marginLeft={moderateScale(16)}
                marginRight={moderateScale(36)}
                fontSize={14}
              />
            </Touchable>
          </Container>
        </Container>
        <Container center>
          <TextContainer text="Escanea este código en tienda" fontBold fontSize={18} marginTop={verticalScale(30)} />
          <TextContainer text="para hacer válido tu cupón" fontSize={14} marginTop={verticalScale(4)} />
          <Container
            center
            style={{
              height: verticalScale(200),
              width: moderateScale(200),
              marginTop: verticalScale(23),
              marginBottom: verticalScale(26)
            }}
          >
            <QRCode value={params.couponActivatedData} size={200} />
          </Container>
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
        </Container>
      </Container>
      <MoreDetailModal visible={modalVisible} onPressClose={onPressClose} />
    </ScrollView>
  );
};

export default ActivatedCoupon;
