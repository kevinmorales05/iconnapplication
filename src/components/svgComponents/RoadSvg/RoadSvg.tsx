import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const RoadSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg width={size} height={size} viewBox="0 0 24.01 24.01">
        <Path
            d="M4.415.215 7.91 5.2a.5.5 0 0 1-.514.778L4 5.283l-3.4.691A.5.5 0 0 1 .092 5.2L3.588.215a.506.506 0 0 1 .827 0z"
            transform="translate(8.004 15.024)"
            stroke="#008060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            fill="none"
        />
        <Path
            d="M3 13.005 0 0"
            transform="translate(18.007 5.002)"
            stroke="#008060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            fill="none"
        />
        <Path
            d="M0 13.005 3 0"
            transform="translate(3.001 5.002)"
            stroke="#008060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            fill="none"
        />
        <Path
            d="M.5 0v2"
            transform="translate(11.505 3.001)"
            stroke="#008060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            fill="none"
        />
        <Path
            d="M.5 0v2"
            transform="translate(11.505 9.004)"
            stroke="#008060"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
            fill="none"
        />
        <Path d="M0 0h24.01v24.01H0z" fill="none" />
    </Svg>
);

export default RoadSvg;
