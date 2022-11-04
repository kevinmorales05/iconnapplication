import { FlatList, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container } from 'components/atoms';
import { ImagesCarusel, TextContainer } from 'components/molecules';
import {
  ICONN_CREDIT_CARD,
  ICONN_DEPOSIT,
  ICONN_MOBILE_RECHARGE,
  ICONN_SERVICE_PAYMENT,
  ICONN_QR_CODE,
  ICONN_PACKAGES_SEARCH,
  CFE_LOGO,
  SKY_LOGO,
  TELCEL_LOGO,
  ICONN_DOLLAR_CIRCLE,
  CARD_PETRO,
  CARD_PREF
} from 'assets/images';
import { AnimatedCarouselWithBorder } from 'components/organisms/AnimatedCarouselWithBorder';
import { AnimatedCarousel, TabTwoElements } from 'components';
import { CarouselItem, TabItem } from 'rtk';
import Entypo from 'react-native-vector-icons/Entypo'

type ServiceType = {
  icon: any;
  serviceName: string;
  onPressItem: () => void;
};

const servicesArr: ServiceType[] = [
  {
    icon: ICONN_DEPOSIT,
    serviceName: 'Depósitos',
    onPressItem: () => {}
  },
  {
    icon: ICONN_SERVICE_PAYMENT,
    serviceName: 'Pago de servicios',
    onPressItem: () => {}
  },
  {
    icon: ICONN_MOBILE_RECHARGE,
    serviceName: 'Recargas',
    onPressItem: () => {}
  },
  {
    icon: ICONN_PACKAGES_SEARCH,
    serviceName: 'Rastreo de Paquetes',
    onPressItem: () => {}
  }
];

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

interface Props {
  navigate: () => void;
}

type ServicePayment = {
  image: any;
  serviceUse: string;
  serviceRef: string;
};

const servicesExampleArr: ServicePayment[] = [
  {
    image: CFE_LOGO,
    serviceUse: 'Pago de servicio',
    serviceRef: 'CFE Casa Cumbres'
  },
  {
    image: TELCEL_LOGO,
    serviceUse: 'Recarga Tiempo Aire',
    serviceRef: 'Mamá Paq Amigo 150'
  },
  {
    image: SKY_LOGO,
    serviceUse: 'Pago de servicio',
    serviceRef: 'Sky Casa'
  },
  {
    image: SKY_LOGO,
    serviceUse: 'Pago de servicio',
    serviceRef: 'Sky Casa 2'
  },
  {
    image: SKY_LOGO,
    serviceUse: 'Pago de servicio',
    serviceRef: 'Sky Casa 3'
  },
  {
    image: SKY_LOGO,
    serviceUse: 'Pago de servicio',
    serviceRef: 'Sky Casa 5'
  }
];

interface ServiceCardProps {
  service: ServicePayment;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Container row style={styles.serviceCard}>
      <Image source={service.image} style={{ height: 48, width: 48 }} />
      <Container>
        <TextContainer text={service.serviceUse} textColor={theme.fontColor.placeholder} fontSize={12} marginLeft={16} />
        <TextContainer text={service.serviceRef} fontBold fontSize={14} marginLeft={16} marginTop={6} />
      </Container>
    </Container>
  );
};

type PaymentWallet = {
  paymentType: string;
  addressee: string;
  bank: string;
};

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

interface PaymentCardProps {
  payment: PaymentWallet;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  return (
    <Container row style={styles.serviceCard}>
      <Container crossCenter circle height={32} backgroundColor={theme.brandColor.iconn_green_original} style={{ padding: 4 }}>
        <Image source={ICONN_DOLLAR_CIRCLE} style={{ height: 24, width: 24 }} />
      </Container>
      <Container>
        <TextContainer text={payment.paymentType} marginLeft={16} fontSize={12} textColor={theme.fontColor.placeholder} />
        <TextContainer text={payment.addressee} fontBold marginLeft={16} fontSize={14} marginTop={2} />
        <TextContainer text={payment.bank} marginLeft={16} fontSize={14} marginTop={2} />
      </Container>
    </Container>
  );
};

const EmptyQRScreen: React.FC = () => {
  return (
    <Container center style={{ marginTop: 75, paddingHorizontal: 40 }}>
      <Image source={ICONN_QR_CODE} style={{ height: 40, width: 40 }} />
      <TextContainer
        text="Aquí verás tus códigos QR para pagar más rápido en tienda."
        textColor={theme.fontColor.placeholder}
        fontSize={14}
        textAlign="center"
        marginTop={12}
      />
    </Container>
  );
};

const EmptyCards: React.FC = () => {
  return (
    <Container center crossCenter style={styles.containerCardDot}>
      <Image source={ICONN_CREDIT_CARD} style={styles.cardIcon} />
      <TextContainer text="Agregar" fontBold fontSize={16} textColor={theme.fontColor.grey} />
    </Container>
  );
};


let imageArr2: CarouselItem = [
  {
    id: 1,
    image: CARD_PETRO,
    description: 'asdasda',
    link: 'dsdfasdfa',
    navigationType: '?',
    promotion_name: 'principal',
    promotion_type: 'cards',
    status: 'ok',
    navigateTo: 'home'
  },
  {
    id: 2,
    image: CARD_PREF,
    description: 'asdasda',
    link: 'dsdfasdfa',
    navigationType: '?',
    promotion_name: 'principal',
    promotion_type: 'cards',
    status: 'ok',
    navigateTo: 'home'
  }
];

/* const AddCard: React.FC = () => {
    return (
        
    )
} */

const WalletHomeScreen: React.FC<Props> = ({ navigate }) => {
  const insets = useSafeAreaInsets();
  const [idSelected, setIdSelected] = useState('1');
  const savedServices = 1;
  const savedAddressee = 1;
  const savedCards = 1;

  const onPressTab = (tab: TabItem) => {
    if (tab.id) {
      setIdSelected(tab.id);
    }
  };

  return (
    <ScrollView
      bounces={false}
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
        {savedCards == 0 ? null : (
          <Container row style={{position: 'absolute', end: 10}} >
            <Entypo name='plus' style={{marginTop: 25}} color={'#008060'}/>
            <TextContainer text="Agregar" fontBold fontSize={16} marginTop={19.5} textColor={theme.fontColor.light_green} underline />
          </Container>
        )}
      </Container>
      {savedCards == 0 ? <EmptyCards /> : <AnimatedCarousel cards items={imageArr2} />}
      <TextContainer text="Servicios en Tienda" fontBold fontSize={16} marginTop={24} marginBottom={16} marginLeft={10} />
      <Container style={{ paddingHorizontal: 10 }}>
        <AnimatedCarouselWithBorder items={servicesArr} />
      </Container>
      <TextContainer text="QR Guardados" fontBold fontSize={16} marginTop={32} marginBottom={16} marginLeft={10} />
      <Container width="100%" backgroundColor={theme.brandColor.iconn_white} style={{ paddingTop: 16, paddingBottom: 100 }}>
        <TabTwoElements items={tabNames} onPressItem={onPressTab} idSelected={idSelected} />
        {idSelected == '1' ? (
          savedServices == 0 ? (
            <EmptyQRScreen />
          ) : (
            servicesExampleArr.map((item, index) => {
              return <ServiceCard key={item.serviceRef} service={item} />;
            })
          )
        ) : savedAddressee == 0 ? (
          <EmptyQRScreen />
        ) : (
          paymentExamplesArr.map((item, index) => {
            return <PaymentCard key={index} payment={item} />;
          })
        )}
      </Container>
    </ScrollView>
  );
};

export default WalletHomeScreen;

const styles = StyleSheet.create({
  containerCardDot: {
    borderColor: theme.brandColor.iconn_grey,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 65,
    marginTop: 16,
    paddingTop: 50,
    paddingBottom: 50,
    height: 164,
    width: 261
  },
  cardIcon: {
    height: 32,
    width: 32
  },
  serviceCard: {
    paddingLeft: 16,
    marginLeft: 16,
    paddingTop: 28,
    borderBottomColor: '#e9edf7',
    borderBottomWidth: 1,
    paddingBottom: 15.5
  }
});
