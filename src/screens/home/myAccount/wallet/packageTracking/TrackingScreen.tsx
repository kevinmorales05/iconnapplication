import { ICONN_ESTAFETA_LOGO, ICONN_TRACKING_PACKAGE } from 'assets/images';
import { Container, Input, TextContainer, Button, PackageCard, Touchable } from 'components';
import theme from 'components/theme/theme';
import React, { useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Image, Platform, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'utils/scaleMetrics';
import { alphaNumericWithoutSpaces } from 'utils/rules';
import { PackageVtex } from 'rtk';

interface Props {
  onPressDetail: (waybill: string, packageVtex: PackageVtex) => void;
  onSubmit: (data: FieldValues) => void;
  packages: PackageVtex[];
  onPressScan: () => void;
  onPressHelp: () => void;
  onPressDelete: (id: string) => void;
}

const TrackingScreen: React.FC<Props> = ({ onPressDetail, onSubmit, packages, onPressScan, onPressHelp, onPressDelete }) => {
  const insets = useSafeAreaInsets();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm({
    mode: 'onChange'
  });

  const barCodeRef = useRef<TextInput>(null);
  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields);
    setValue('barcodeNumber', '');
  };
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex>
        <Container center style={{ marginTop: 23.5 }}>
          <Image source={ICONN_ESTAFETA_LOGO} style={{ height: 48, width: 140 }} />
        </Container>
        <Container>
          <Container row style={{ marginHorizontal: 16, marginTop: 24 }}>
            <TextContainer text="Código de rastreo o número de guía" fontBold fontSize={12} />
            <Touchable onPress={onPressHelp}>
              <AntDesign name="questioncircle" size={16} color={theme.brandColor.iconn_green_original} style={{ marginLeft: 8 }} />
            </Touchable>
          </Container>
          <Container row center style={{ height: moderateScale(70), marginHorizontal: 16 }}>
            <Input
              {...register('barcodeNumber')}
              ref={barCodeRef}
              name="barcodeNumber"
              control={control}
              keyboardType="default"
              placeholder={'Ingresa o escanea código'}
              blurOnSubmit
              marginTop={2}
              maxLength={22}
              scanIcon={true}
              rules={alphaNumericWithoutSpaces(22)}
              onPressScan={onPressScan}
            />
          </Container>
          <Button onPress={handleSubmit(submit)} round disabled={!isValid} marginTop={24} marginLeft={16} marginRight={16} fontSize="h4">
            Agregar
          </Button>
        </Container>
        <Container>
          <Container row space="between" style={{ marginHorizontal: 16, marginTop: 40 }}>
            <TextContainer text="Paquetes agregados" fontBold fontSize={16} />
            <TextContainer text={packages !== undefined ? `${packages.length} de 10 paquetes` : '0 de 10 paquetes'} fontSize={14} />
          </Container>
          <Container
            height={'75%'}
            backgroundColor={theme.brandColor.iconn_white}
            style={{ marginTop: 8, paddingHorizontal: 0, paddingBottom: 200, marginBottom: 10 }}
          >
            {packages === undefined || packages.length === 0 ? (
              <Container center style={{ paddingTop: 80, paddingHorizontal: 50, paddingBottom: 80, alignSelf: 'flex-end', marginHorizontal: 0, width: '100%' }}>
                <Image source={ICONN_TRACKING_PACKAGE} style={{ height: 40, width: 40 }} />
                <TextContainer
                  text="Aquí verás tus paquetes agregados para rastrear, puedes rastrear hasta 10 paquetes al mismo tiempo."
                  fontSize={14}
                  textAlign="center"
                  textColor={theme.fontColor.placeholder}
                  marginTop={12}
                />
              </Container>
            ) : (
              packages.map((element, index) => {
                return (
                  <PackageCard
                    onPressDetail={() => onPressDetail(element.waybill, element.id)}
                    key={index}
                    onPressDelete={onPressDelete}
                    packageVtex={element}
                  />
                );
              })
            )}
          </Container>
        </Container>
      </Container>
    </ScrollView>
  );
};

export default TrackingScreen;
