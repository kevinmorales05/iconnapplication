import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container, EmptyCardsCard, ServiceCard, PaymentCard, EmptyQRCard } from 'components/atoms';
import { TextContainer } from 'components/molecules';
import { AnimatedCarouselWithBorder } from 'components/organisms/AnimatedCarouselWithBorder';
import { AnimatedCarousel, TabTwoElements, TouchableText } from 'components';
import Entypo from 'react-native-vector-icons/Entypo';
import PointCardsModalController from '../../pointCards/PointCardsModalController';
import { CarouselItem, PaymentWallet, ServiceQRType, TabItem } from 'rtk';

const tabNames: TabItem[] = [
  {
    id: '1',
    name: 'Servicios'
  },
  {
    id: '2',
    name: 'Destinatarios'
  }
];

const paymentExamplesArr: PaymentWallet[] = [
  {
    paymentType: 'Depósito Bancario',
    addressee: 'María Ramírez Saavedra',
    bank: 'Santander'
  },
  {
    paymentType: 'Depósito Bancario',
    addressee: 'Ana Victoria Rodríguez',
    bank: 'BBVA'
  },
  {
    paymentType: 'Depósito Bancario',
    addressee: 'Marcela Ramos de León',
    bank: 'Banamex'
  },
  {
    paymentType: 'Depósito Bancario',
    addressee: 'Gabriel García Medea',
    bank: 'BBVA'
  }
];
interface Props {
    navigate: () => void;
    cards: CarouselItem[];
    serviceQRs: ServiceQRType[];
    rechargeQR: ServiceQRType[];
    servicesArr: any;
  }
  
const WalletHomeScreen: React.FC<Props> = ({ navigate, cards, serviceQRs, rechargeQR, servicesArr }) => {
  const insets = useSafeAreaInsets();
  const [idSelected, setIdSelected] = useState('1');
  const savedServices = serviceQRs;
  const savedRecharges = rechargeQR;
  const [allServicesQR, setAllServicesQR] = useState<ServiceQRType[]>();
  const savedAddressee = 1;
  const [visiblePointCardModel, setVisiblePointCardModel] = useState<boolean>(false);
  const savedCards = cards;

  const joinServices = () => {
    let allServices: ServiceQRType[] = []
      if (savedServices && savedRecharges ) {
        allServices = savedServices.concat(rechargeQR);
    }
    return allServices;
  }

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
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16,
        marginLeft: insets.left,
        backgroundColor: theme.brandColor.iconn_background,
        width: '100%'
      }}
    >
      <Container row style={{ justifyContent: 'flex-start' }}>
        <TextContainer text="Tarjetas de puntos" fontBold fontSize={16} marginTop={19.5} marginLeft={10} />
        {(savedCards && savedCards.length == 0 )? null : (
          <Container row style={{marginTop: 25, position: 'absolute', end: 10}} >
            <Entypo name='plus' style={{marginTop: 3}} color={'#008060'}/>
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
      {savedCards && savedCards.length == 0 ? <EmptyCardsCard /> : <AnimatedCarousel cards items={savedCards} />}
      <TextContainer text="Servicios en Tienda" fontBold fontSize={16} marginTop={24} marginBottom={16} marginLeft={10} />
      <Container style={{ paddingHorizontal: 10 }}>
        <AnimatedCarouselWithBorder items={servicesArr} />
      </Container>
      <TextContainer text="QR Guardados" fontBold fontSize={16} marginTop={32} marginBottom={16} marginLeft={10} />
      <Container width="100%" backgroundColor={theme.brandColor.iconn_white} style={{ paddingTop: 16, paddingBottom: 100 }}>
        <TabTwoElements items={tabNames} onPressItem={onPressTab} idSelected={idSelected} />
        {idSelected == '1' ? (
          (allServicesQR && allServicesQR.length == 0 )? (
            <EmptyQRCard />
          ) : (allServicesQR && allServicesQR.length > 0 ) ? (
            allServicesQR.map((item, index) => {
              return <ServiceCard key={item.reference} service={item} />;
            })
          ) : null
        ) : savedAddressee == 0 ? (
          <EmptyQRCard />
        ) : (
          paymentExamplesArr.map((item, index) => {
            return <PaymentCard key={index} payment={item} />;
          })
        )}
      </Container>
      <PointCardsModalController onPressClose={hidePointCardsModal} visible={visiblePointCardModel} ></PointCardsModalController>
    </ScrollView>
  );
};

export default WalletHomeScreen;


