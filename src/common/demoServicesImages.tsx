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

interface ServicesCategories {
    id: string;
    name: string;
    icon: any;
}

export const servicesCategories: ServicesCategories[] = [
    {
        id: '1',
        name: 'Recarga de Tiempo Aire',
        icon: <MobilePaySvg size={24}/>
    },
    {
        id: '2',
        name: 'Luz y gas',
        icon: <EnergySvg size={24}/>
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

export const servicesList = [
    {
        value: 'Blizzard',
        key: 'blizzard',
    },
    {
        value: 'Acuario Inbursa',
        key: 'acuario-inbursa',
    },
    {
        value: 'Aguakan',
        key: 'aguakan',
    },
    {
        value: 'Aguas de Saltillo',
        key: 'aguas-de-saltillo',
    },
    {
        value: 'Amazon',
        key: 'amazon',
    },
    {
        value: 'AmeShop',
        key: 'ame-shop',
    },
    {
        value: 'Arabela',
        key: 'arabela',
    },
    {
        value: 'ABIB',
        key: 'abib',
    },
    {
        value: 'Movistar',
        key: 'movistar',
    },
] 