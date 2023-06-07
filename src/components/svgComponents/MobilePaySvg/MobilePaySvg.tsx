import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const MobilePaySvg: React.FC<SvgProps> = ({ size }) => (
    <Svg data-name="Mobile, Devices, Wifi" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <G data-name="Group">
            <Path d="M0 0h24v24H0z" fill="none"/>
            <G data-name="Grupo 40">
                <Path data-name="Path" d="M2.24 1.25H0a.75.75 0 1 1 0-1.5h2.24a.75.75 0 0 1 0 1.5z" transform="translate(9.88 18)" fill="#008060"/>
                <Path data-name="Path" d="M2 2.75A.75.75 0 0 1 1.25 2 1.251 1.251 0 0 0 0 .75.75.75 0 0 1-.75 0 .75.75 0 0 1 0-.75 2.753 2.753 0 0 1 2.75 2a.75.75 0 0 1-.75.75z" transform="translate(14 5)" fill="#008060"/>
                <Path data-name="Path" d="M8 16.75H2A2.753 2.753 0 0 1-.75 14V2A2.753 2.753 0 0 1 2-.75h3a.75.75 0 0 1 .75.75.75.75 0 0 1-.75.75H2A1.251 1.251 0 0 0 .75 2v12A1.251 1.251 0 0 0 2 15.25h6A1.251 1.251 0 0 0 9.25 14V6a.75.75 0 0 1 1.5 0v8A2.753 2.753 0 0 1 8 16.75z" transform="translate(6 5)" fill="#008060"/>
                <Path data-name="Path" d="M4 4.75A.75.75 0 0 1 3.25 4 3.254 3.254 0 0 0 0 .75.75.75 0 0 1-.75 0 .75.75 0 0 1 0-.75 4.755 4.755 0 0 1 4.75 4a.75.75 0 0 1-.75.75z" transform="translate(15 2)" fill="#008060"/>
            </G>
        </G>
    </Svg>
);

export default MobilePaySvg;
