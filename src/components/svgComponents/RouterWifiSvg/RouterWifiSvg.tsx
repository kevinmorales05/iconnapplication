import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const RouterWifiSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg data-name="Wifi, Wireless, Router, Internet" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <G data-name="Group">
            <Path d="M24 0v24H0V0z" fill="none" transform="rotate(90 12 12)"/>
            <G data-name="a-link">
                <Path data-name="a" d="M24 0v24H0V0z" fill="none" transform="rotate(90 12 12)"/>
            </G>
            <G data-name="Grupo 37">
                <Path d="M7 1.25H0a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5z" transform="translate(7 16.5)" fill="#008060"/>
                <Path data-name="Path" d="M4-.75h10a4.75 4.75 0 0 1 0 9.5H4a4.75 4.75 0 0 1 0-9.5zm10 8a3.25 3.25 0 0 0 0-6.5H4a3.25 3.25 0 0 0 0 6.5z" transform="translate(3 13)" fill="#008060"/>
                <Path data-name="Path" d="M.5 4.75A.75.75 0 0 1-.25 4V0A.75.75 0 0 1 .5-.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75z" transform="translate(16.5 9)" fill="#008060"/>
                <Path data-name="Path" d="M.5 1.3a.8.8 0 1 1 .566-.235A.8.8 0 0 1 .5 1.3z" transform="translate(16.5 16.5)" fill="#008060"/>
                <Path data-name="Path" d="M0 6.75h-.009a.75.75 0 0 1-.741-.759 7.349 7.349 0 0 1 .409-2.36A6.4 6.4 0 0 1 3.629-.34a7.335 7.335 0 0 1 2.362-.41.75.75 0 0 1 .759.741.75.75 0 0 1-.741.759 5.839 5.839 0 0 0-1.88.324A4.925 4.925 0 0 0 1.073 4.13 5.852 5.852 0 0 0 .75 6.009.75.75 0 0 1 0 6.75z" transform="translate(11 3)" fill="#008060"/>
                <Path data-name="Path" d="M0 3.75h-.017a.75.75 0 0 1-.733-.767A3.682 3.682 0 0 1 2.983-.75a.75.75 0 0 1 .766.733.75.75 0 0 1-.732.767A2.188 2.188 0 0 0 .75 3.017.75.75 0 0 1 0 3.75z" transform="translate(14 6)" fill="#008060"/>
            </G>
        </G>
    </Svg>

);

export default RouterWifiSvg;
