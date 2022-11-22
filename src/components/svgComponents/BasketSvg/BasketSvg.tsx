import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { moderateScale } from 'utils/scaleMetrics';

const BasketSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg data-name="Basket, Pack" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M.5 2.01a1 1 0 0 1-1-1V0a1 1 0 0 1 2 0v1.01a1 1 0 0 1-1 1z" transform="translate(13.5 15.98)" fill={color}/>
        <Path data-name="Path" d="M.5 2.01a1 1 0 0 1-1-1V0a1 1 0 0 1 2 0v1.01a1 1 0 0 1-1 1z" transform="translate(9.5 15.98)" fill={color}/>
        <Path data-name="Path" d="M17 5H1a2 2 0 0 1-2-2V1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2zM1 1v2h16V1z" transform="translate(3 8)" fill={color}/>
        <Path data-name="Path" d="M2.961 5.94a1 1 0 0 1-.861-.486L-.858.514A1 1 0 0 1-.514-.858a1 1 0 0 1 1.372.344l2.96 4.94a1 1 0 0 1-.857 1.514z" transform="translate(14.04 3.03)" fill={color}/>
        <Path data-name="Path" d="M0 5.94a1 1 0 0 1-.514-.14 1 1 0 0 1-.344-1.374L2.1-.514a1 1 0 0 1 1.374-.344A1 1 0 0 1 3.818.514l-2.96 4.94A1 1 0 0 1 0 5.94z" transform="translate(7 3.03)" fill={color}/>
        <Path data-name="Path" d="M12.363 9.971h-9.21A2.515 2.515 0 0 1 .71 8L-.977.212A1 1 0 0 1-.212-.977a1 1 0 0 1 1.189.765l1.687 7.789a.5.5 0 0 0 .489.394h9.21a.5.5 0 0 0 .489-.393l1.687-7.79a1 1 0 0 1 1.189-.766 1 1 0 0 1 .765 1.19L14.806 8a2.513 2.513 0 0 1-2.443 1.971z" transform="translate(4.242 12)" fill={color}/>
    </G>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
</Svg>

);

export default BasketSvg;
