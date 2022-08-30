import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Vibration } from 'react-native';
import { Container, CustomText, Touchable } from 'components';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BarcodeMask from 'react-native-barcode-mask';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { HomeStackParams } from 'navigation/types';

interface Props {
  onPressOk: (code: any) => void;
}

const CodeReaderScreen: React.FC<Props> = ({ onPressOk }) => {
  const { goBack } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { arrowContainer, arrowStyle } = styles;
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.ALL_FORMATS], {
    checkInverted: true
  });

  const [hasPermission, setHasPermission] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);

  const read = useRef<boolean>(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0 && !read.current) {
      read.current = true;
      console.log(barcodes[0].displayValue);
      Vibration.vibrate(10);
      setCameraActive(false);
      Alert.alert('Código de barras: ', barcodes[0].displayValue, [
        {
          onPress: () => {
            onPressOk(barcodes[0].displayValue);
          }
        }
      ]);
    }
  }, [barcodes]);

  const onPressBack = () => {
    setCameraActive(false);
    goBack();
  };

  return (
    <Container flex>
      <Container style={{ paddingHorizontal: 16, marginVertical: 16 }}>
        <CustomText text="Escanea el código" typography="h3" textAlign="center" />
        <Container style={arrowContainer}>
          <Touchable
            onPress={() => {
              onPressBack();
            }}
            rounded
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </Touchable>
        </Container>
      </Container>
      <Container style={styles.container}>
        {device != null && hasPermission && (
          <Camera style={StyleSheet.absoluteFill} device={device} isActive={cameraActive} frameProcessor={frameProcessor} frameProcessorFps={5}>
            <BarcodeMask
              height="45%"
              width="100%"
              backgroundColor={theme.brandColor.iconn_accent_secondary}
              edgeColor={theme.brandColor.iconn_accent_principal}
              showAnimatedLine={false}
            />
          </Camera>
        )}
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    marginVertical: '40%'
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  arrowStyle: {
    width: 19,
    height: 22,
    marginHorizontal: 16,
    marginVertical: 12
  }
});

export default CodeReaderScreen;
