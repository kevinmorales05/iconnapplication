import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { moderateScale } from 'utils/scaleMetrics';

const TargetSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg data-name="User,Profile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M2.25 5.5A3.25 3.25 0 0 1-1 2.25 3.25 3.25 0 0 1 2.25-1 3.25 3.25 0 0 1 5.5 2.25 3.25 3.25 0 0 1 2.25 5.5zm0-4.5a1.25 1.25 0 1 0 .884.366A1.242 1.242 0 0 0 2.25 1z" transform="translate(6.25 7.5)" fill="#333"/>
        <Path data-name="Path" d="M18 18H2a3 3 0 0 1-3-3V2.041A3.044 3.044 0 0 1 2.041-1H18a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3zM2.041 1A1.042 1.042 0 0 0 1 2.041V15a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" transform="translate(2 3.5)" fill="#333"/>
        <Path data-name="Path" d="M4 1.5H0a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z" transform="translate(15 9)" fill="#333"/>
        <Path data-name="Path" d="M2.4 1.5H0a1 1 0 0 1 0-2h2.4a1 1 0 0 1 0 2z" transform="translate(15 13)" fill="#333"/>
        <Path data-name="Path" d="M7.19 3a1 1 0 0 1-.929-.63A2.176 2.176 0 0 0 4.241 1H2.949a2.176 2.176 0 0 0-2.02 1.37 1 1 0 0 1-1.3.559 1 1 0 0 1-.559-1.3A4.176 4.176 0 0 1 2.949-1h1.292a4.176 4.176 0 0 1 3.878 2.63A1 1 0 0 1 7.19 3z" transform="translate(4.905 14.5)" fill="#333"/>
    </G>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
  </Svg>

);

export default TargetSvg;
