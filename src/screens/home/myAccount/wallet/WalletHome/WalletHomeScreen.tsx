import { Platform, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container, EmptyCardsCard, ServiceCard, EmptyQRCard } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import { AnimatedCarouselWithBorder } from 'components/organisms/AnimatedCarouselWithBorder';
import { AnimatedCarousel, TabTwoElements, TouchableText } from 'components';
import Entypo from 'react-native-vector-icons/Entypo';
import PointCardsModalController from '../../../pointCards/PointCardsModalController';
import { BeneficiaryInterface, CarouselItem, ServiceQRType, TabItem } from 'rtk';
import BeneficiaryCard from 'components/atoms/BeneficiaryCard/BeneficiaryCard';

const tabNames: TabItem[] = [
  {
    id: '1',
    name: 'Servicios'
  },
  {
    id: '2',
    name: 'Beneficiarios'
  }
];
interface Props {
  cards: CarouselItem[];
  serviceQRs: ServiceQRType[];
  rechargeQR: ServiceQRType[];
  servicesArr: any;
  beneficiaries: BeneficiaryInterface[];
  goToDepositDetail: (beneficiary: BeneficiaryInterface) => void;
  onPressService: (service: ServiceQRType) => void;
}

const WalletHomeScreen: React.FC<Props> = ({ cards, serviceQRs, rechargeQR, servicesArr, beneficiaries, goToDepositDetail, onPressService }) => {
  const insets = useSafeAreaInsets();
  const [idSelected, setIdSelected] = useState('1');
  const savedServices = serviceQRs;
  const savedRecharges = rechargeQR;
  const [allServicesQR, setAllServicesQR] = useState<ServiceQRType[]>();
  const [visiblePointCardModel, setVisiblePointCardModel] = useState<boolean>(false);
  const savedCards = cards;

  const joinServices = () => {
    let allServices: ServiceQRType[] = [];
    if (savedServices && savedRecharges) {
      allServices = savedServices.concat(rechargeQR);
    }
    return allServices;
  };

  const hidePointCardsModal = () => {
    setVisiblePointCardModel(false);
  };

  const showPointCardsModal = () => {
    setVisiblePointCardModel(true);
  };

  useEffect(() => {
    setAllServicesQR(joinServices() as ServiceQRType[]);
  }, [savedRecharges, savedServices]);

  const onPressTab = (tab: TabItem) => {
    if (tab.id) {
      setIdSelected(tab.id);
    }
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container flex space="between">
        <Container>
          <Container row style={{ justifyContent: 'flex-start' }}>
            <TextContainer text="Tarjetas de puntos" fontBold fontSize={16} marginTop={19.5} marginLeft={16} />
            {savedCards && savedCards.length === 0 ? null : (
              <Container row style={{ marginTop: 25, position: 'absolute', end: 16 }}>
                <Entypo name="plus" style={{ marginTop: 3 }} color={'#008060'} />
                <TouchableText
                  underline
                  textColor={theme.brandColor.iconn_accent_principal}
                  text="Agregar"
                  typography="h5"
                  fontBold
                  onPress={() => showPointCardsModal()}
                />
              </Container>
            )}
          </Container>
          {savedCards && savedCards.length === 0 ? (
            <EmptyCardsCard showPointCardsModal={showPointCardsModal} />
          ) : (
            <AnimatedCarousel cards items={savedCards} onPressItem={() => {}} onPressOut={() => {}} />
          )}
        </Container>
        <Container>
          <TextContainer
            text="Servicios en Tienda"
            fontBold
            fontSize={16}
            marginTop={savedCards && savedCards.length === 0 ? 44 : 24}
            marginBottom={16}
            marginLeft={16}
          />
          <Container style={{ paddingHorizontal: 10 }}>
            <AnimatedCarouselWithBorder items={servicesArr} />
          </Container>
        </Container>
        <Container>
          <TextContainer text="QR Guardados" fontBold fontSize={16} marginTop={32} marginBottom={16} marginLeft={16} />
          <Container width="100%" backgroundColor={theme.brandColor.iconn_white} style={{ paddingTop: 16, paddingBottom: 16 }}>
            <TabTwoElements items={tabNames} onPressItem={onPressTab} idSelected={idSelected} />
            {idSelected === '1' ? (
              allServicesQR && allServicesQR.length === 0 ? (
                <EmptyQRCard />
              ) : allServicesQR && allServicesQR.length > 0 ? (
                allServicesQR.map((item, index) => {
                  return <ServiceCard key={index} service={item} onPressService={onPressService} />;
                })
              ) : null
            ) : !beneficiaries.length ? (
              <EmptyQRCard />
            ) : (
              beneficiaries.map((item, index) => {
                return <BeneficiaryCard goToDepositDetail={goToDepositDetail} key={index} beneficiary={item} />;
              })
            )}
          </Container>
        </Container>
        <PointCardsModalController onPressClose={hidePointCardsModal} visible={visiblePointCardModel} />
      </Container>
    </ScrollView>
  );
};

export default WalletHomeScreen;
