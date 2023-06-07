import React from 'react'
import MobilePaySvg from "components/svgComponents/MobilePaySvg";
import EnergySvg from 'components/svgComponents/EnergySvg';
import RouterWifiSvg from 'components/svgComponents/RouterWifiSvg';
import GiftBoxSvg from 'components/svgComponents/GiftBoxSvg';
import WaterSvg from 'components/svgComponents/WaterSvg';
import RoadSvg from 'components/svgComponents/RoadSvg/RoadSvg';
import ShoppingCartSvg from 'components/svgComponents/ShoppingCartSvg';
import StoreSvg from 'components/svgComponents/StoreSvg';
import InvoiceAcoounting from 'components/svgComponents/InvoiceAcoounting';
import ToysPuzzle from 'components/svgComponents/ToysPuzzle';
import VidePlayerSvg from 'components/svgComponents/VidePlayerSvg';
import MakeUpSvg from 'components/svgComponents/MakeUpSvg';
import KeyboardMouseSvg from 'components/svgComponents/KeyboardMouseSvg';
import HomeHouseSvg from 'components/svgComponents/HomeHouseSvg';
import CarSvg from 'components/svgComponents/CarSvg';
import SquareSvg from 'components/svgComponents/SquareSvg';
import { ABIB, AMIGO_RECHARGE, AMIGO_SIN_RECHARGE, AMIGO_SIN_RECHARGE_LARGE, ATT_LOGO, Acuario, Agua, Aguakan, Amazon, AmeShop, Arabela, Blizzard, CFE_LOGO, DELETE_DEMO, Movistar, PAY_DEMO, QR_DEMO, TELCEL_LOGO, UNEFON, VIRGIN } from 'assets/images';
import { SearchServicesType } from 'navigation/types/HomeStackParams';

export interface ServicesCategories {
    id: string;
    name: string;
    icon: any;
    navigateTo?: string;
    type?: SearchServicesType;
}

export const servicesCategories: ServicesCategories[] = [
    {
        id: '1',
        name: 'Recarga de Tiempo Aire',
        icon: <MobilePaySvg size={24}/>,
        navigateTo: 'SearchScreenService',
        type: 'recharge'
    },
    {
        id: '2',
        name: 'Luz y gas',
        icon: <EnergySvg size={24}/>,
        navigateTo: 'SearchScreenService',
        type: 'others'
    },
    {
        id: '3',
        name: 'Agua',
        icon: <WaterSvg size={24}/>
    },
    {
        id: '4',
        name: 'Comercios digitales',
        icon: <ShoppingCartSvg size={24}/>
    },
    {
        id: '5',
        name: 'Establecimientos',
        icon: <StoreSvg size={24}/>
    },
    {
        id: '6',
        name: 'Streaming',
        icon: <VidePlayerSvg size={24}/>
    },
    {
        id: '7',
        name: 'Ventas por cátalogo',
        icon: <MakeUpSvg size={24}/>
    },
    {
        id: '2',
        name: 'Inmobiliario',
        icon: <HomeHouseSvg size={24}/>
    },
    {
        id: '8',
        name: 'Cable, teléfono e internet',
        icon: <RouterWifiSvg size={24}/>
    },
    {
        id: '9',
        name: 'Tarjetas de regalo',
        icon: <GiftBoxSvg size={24}/>
    },
    {
        id: '10',
        name: 'Transporte',
        icon: <RoadSvg size={24}/>
    },
    {
        id: '11',
        name: 'Gobierno e impuestos',
        icon: <InvoiceAcoounting size={24}/>
    },
    {
        id: '12',
        name: 'Juegos y entretenimiento',
        icon: <ToysPuzzle size={24}/>
    },
    {
        id: '13',
        name: 'Computacionales',
        icon: <KeyboardMouseSvg size={24}/>
    },
    {
        id: '14',
        name: 'Automotriz',
        icon: <CarSvg size={24}/>
    },
    {
        id: '15',
        name: 'Otros',
        icon: <SquareSvg size={24}/>
    }
];

export const servicesList: LisetSearchType[] = [
    {
        value: 'Blizzard',
        key: 'Blizzard',
        image: Blizzard
    },
    {
        value: 'Acuario Inbursa',
        key: 'Acuario',
        image: Acuario
    },
    {
        value: 'Aguakan',
        key: 'Aguakan',
        image: Aguakan
    },
    {
        value: 'Aguas de Saltillo',
        key: 'Agua',
        image: Agua
    },
    {
        value: 'Amazon',
        key: 'Amazon',
        image: Amazon
    },
    {
        value: 'AmeShop',
        key: 'AmeShop',
        image: AmeShop
    },
    {
        value: 'Arabela',
        key: 'Arabela',
        image: Arabela
    },
    {
        value: 'ABIB',
        key: 'ABIB',
        image: ABIB
    },
    {
        value: 'Movistar',
        key: 'Movistar',
        image: Movistar
    }
] 

export const rechargeCompanyList: LisetSearchType[] = [
    {
        value: 'AT&T',
        key: 'AT&T',
        image: ATT_LOGO
    },
    {
        value: 'AT&T Pospago',
        key: 'AT&T Pospago',
        image: ATT_LOGO
    },
    {
        value: 'Movistar',
        key: 'Movistar',
        image: Movistar
    },
    {
        value: 'Telcel',
        key: 'Telcel',
        image: TELCEL_LOGO,
        navigateTo: 'PayRecharge'
    },
    {
        value: 'Unefon',
        key: 'Unefon',
        image: UNEFON
    },
    {
        value: 'Virgin Mobile',
        key: 'Virgin Mobile',
        image: VIRGIN
    }
] 

export const serviceSearchCompanyList: LisetSearchType[] = [
    {
        value: 'CFE',
        key: 'CFE',
        image: CFE_LOGO,
        isReset: true
    },
    {
        value: 'Naturgy',
        key: 'Naturgy',
        image: CFE_LOGO
    }
] 

export const rechargeOptions: LisetSearchType[] = [
    {
        value: 'Recarga de Tiempo Aire y datos',
        key: 'CFE',
        image: TELCEL_LOGO
    },
    {
        value: 'Paquetes Amigo',
        key: 'Naturgy',
        image: AMIGO_RECHARGE
    },
    {
        value: 'Paquetes Amigo Sin Límite',
        key: 'Naturgy',
        image: AMIGO_SIN_RECHARGE,
        navigateTo: 'AmountRecharge'
    }
] 

export const optionFav: LisetSearchType[] = [
    {
        value: 'Pagar en tienda',
        key: 'store',
        image: QR_DEMO
    },
    {
        value: 'Pagar desde mi App',
        key: 'app',
        image: PAY_DEMO
    },
    {
        value: 'Eliminar como favorito',
        key: 'delete',
        image: DELETE_DEMO,
        navigateTo: 'AmountRecharge'
    }
] 

export type OptionsKey =  'store' | 'app' | 'delete';

export const packageRecharge: LisetSearchType[] = [
    {
        value: 'Vigencia: 1 día',
        key: '10',
        subTitle:'100 MB. Llamadas, SMS y Whatsapp ilimitados.\n200 MB para redes: FB, TW y MSN.',
        image: AMIGO_SIN_RECHARGE_LARGE,
        navigateTo: 'recharge'
    },
    {
        value: 'Vigencia: 7 día',
        key: '50',
        subTitle:'400MB. Llamadas, SMS y Whatsapp ilimitados.\n500 MB para redes: FB, TW, MSN, IG y SNAP.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 13 día',
        key: '80',
        subTitle:'500MB. Llamadas, SMS y Whatsapp ilimitados.\n1 GB para redes: FB, TW, MSN, IG y SNAP.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 15 día',
        key: '100',
        subTitle:'1300MB. Llamadas, SMS y Whatsapp ilimitados.\nRedes: FB, TW, MSN, IG y SNAP ilimitados.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 21 día',
        key: '150',
        subTitle:'2000MB. Llamadas, SMS y Whatsapp ilimitados.\nRedes: FB, TW, MSN, IG y SNAP ilimitados.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 21 día',
        key: '200',
        subTitle:'2000MB. Llamadas, SMS y Whatsapp ilimitados.\nRedes: FB, TW, MSN, IG y SNAP ilimitados.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 30 día',
        key: '300',
        subTitle:'3500MB. Llamadas, SMS y Whatsapp ilimitados.\nRedes: FB, TW, MSN, IG y SNAP ilimitados.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
    {
        value: 'Vigencia: 60 día',
        key: '500',
        subTitle:'5000MB. Llamadas, SMS y Whatsapp ilimitados.\nRedes: FB, TW, MSN, IG y SNAP ilimitados.',
        image: AMIGO_SIN_RECHARGE_LARGE
    },
] 


export type LisetSearchType = {
    value: string;
    key: string;
    image: any;
    navigateTo?: string;
    subTitle?: string;
    isReset?: boolean;
}