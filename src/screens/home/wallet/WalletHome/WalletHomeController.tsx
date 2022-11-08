import React, { useCallback, useEffect, useState } from 'react';
import WalletHomeScreen from './WalletHomeScreen';
import { StyleSheet } from 'react-native';
import { vtexDocsServices } from 'services';
import { CarouselItem, PointCard, RootState, ServiceQRType, ServiceType, useAppSelector } from 'rtk';
import { CARD_PETRO, CARD_PREF, ICONN_DEPOSIT, ICONN_MOBILE_RECHARGE, ICONN_PACKAGES_SEARCH, ICONN_SERVICE_PAYMENT } from 'assets/images';
import Config from 'react-native-config';





const WalletHomeController: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { id } = user;
  const [cards, setCards] = useState();
  const [cardsPics, setCardsPics] = useState<PointCard[]>();
  const [serviceQR, setServiceQR] = useState<ServiceQRType[]>();
  const [serviceQRTypes, setServiceQRTypes] = useState<ServiceQRType[]>();
  const [rechargeQRTypes, setRechargeQRTypes] = useState<ServiceQRType[]>();
  const {CATEGORIES_ASSETS} = Config;
  const [cardPic, setCardPic] = useState<CarouselItem[]>();


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

  const getCards = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocByUserID('PC', id as string);
    if (data > 0) {
      setCards(data);
    }
    return data;
  }, []);

  const getServiceQR = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocByUserID('SP', id as string);
    if (data > 0) {
      setServiceQR(data);
    }
    return data;
  }, []);
  const getRechargeQR = useCallback(async () => {
    const data = await vtexDocsServices.getAllDocByUserID('UR', id as string);
    return data;
  }, []);

const setServiceQRType = async (services: any) => {
    const arr = services;
    const serviceArr = [];
    if ( arr.length > 0) {
      for (const service of arr) {
        let userServiceQR: ServiceQRType = {
          imageURL: CATEGORIES_ASSETS + `${service.supplierName}Logo.png`,
          supplierName: service.suppierName,
          isActive: service.isActive,
          label: service.label,
          qrType: 'service', 
          reference: service.reference, 
          type: service.type,
          userId: service.userId
        };
        serviceArr.push(userServiceQR);
      }
    }
    setServiceQRTypes(serviceArr);
}

const setRechargeQRType = async (recharges: any) => {
    const arr = recharges;
    const rechargesArr = [];
    if ( arr.length > 0) {
      for (const recharge of arr) {
        let userRechargeQR: ServiceQRType = {
          imageURL: CATEGORIES_ASSETS + `${recharge.supplierName}Logo.png`,
          isActive: recharge.isActive,
          supplierName: recharge.supplierName,
          label: recharge.label,
          qrType: 'recharge', 
          reference: recharge.reference, 
          type: recharge.type,
          userId: recharge.userId
        };
        rechargesArr.push(userRechargeQR);
      }
    }
    setRechargeQRTypes(rechargesArr);
}

  const setCardsForImages = async (cards: any) => {
    const arr = cards;
    const cardsArr = [];
    if (arr.length > 0) {
      for (const card of arr) {
        let userCards: PointCard = {
          barCode: card.barCode,
          id: card.id,
          isActive: card.isActive,
          type: card.type,
          userId: card.userId,
          image: card.type == 'preferente' ? CARD_PREF : CARD_PETRO
        };
        cardsArr.push(userCards);
      }
    }
    setCardsPics(cardsArr);
    return cardsArr;
  };

  const setCardsforCarousel = (cards: PointCard[]) => {
    const arr: PointCard[] | undefined | null = cards;
    const cardsCarousel: CarouselItem[] = [];
    if (arr) {
      if (arr.length > 0) {
        for (const card of arr) {
          const newCarouselItem: CarouselItem = {
            id: card.id,
            image: card.image,
            description: card.type == 'preferente' ? 'Tarjeta Preferente' : 'Tarjeta Payback',
            link: '',
            navigationType: '',
            promotion_name: 'principal',
            promotion_type: 'cards',
            status: card.isActive ? 'active' : 'inactive',
            navigateTo: ''
          };
          cardsCarousel.push(newCarouselItem);
        }
      }
    }
    setCardPic(cardsCarousel);
  };

  useEffect(() => {
    getCards().then(data => setCardsForImages(data)).then(cardsArr => setCardsforCarousel(cardsArr) );
  }, [getCards]);

  useEffect(() => {
    getServiceQR().then(data => setServiceQRType(data));
  }, [getServiceQR]);

  useEffect(() => {
    getRechargeQR().then(data => setRechargeQRType(data));
  }, [getRechargeQR]);

  return <WalletHomeScreen servicesArr={servicesArr} rechargeQR={rechargeQRTypes as ServiceQRType[]} serviceQRs={serviceQRTypes as ServiceQRType[]} cards={cardPic as CarouselItem[]} navigate={() => {}} />;
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 0
  }
});

export default WalletHomeController;
