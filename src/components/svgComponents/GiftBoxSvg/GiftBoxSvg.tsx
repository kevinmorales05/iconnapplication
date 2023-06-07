import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const GiftBoxSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg data-name="Gift, Box" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <Path d="M17 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" transform="translate(3 8)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
        <Path data-name="Path" d="M.5 13V0" transform="translate(11.5 8)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
        <G data-name="Group">
            <Path data-name="Path" d="M3.6 0A5.294 5.294 0 0 1 0 1.388" transform="translate(12.099 6.612)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M.189 4.38S-.3 1.264.91 0" transform="translate(11.91 3.62)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M2.875 3.612a2.177 2.177 0 0 0 0-2.992A1.978 1.978 0 0 0 0 .619" transform="translate(12.821 3.001)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M0 0a5.294 5.294 0 0 0 3.6 1.388" transform="translate(8.304 6.612)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M.811 4.38S1.3 1.264.09 0" transform="translate(11.09 3.62)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M.6 3.612A2.177 2.177 0 0 1 .6.619a1.978 1.978 0 0 1 2.875 0" transform="translate(7.708 3.001)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M14 0v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V0" transform="translate(5 12)" stroke="#008060" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
        </G>
        <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
    </Svg>
);

export default GiftBoxSvg;
