import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CloseSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg data-name="Delete, Disabled.2" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path data-name="Trazado 151" d="M0 0h24v24H0z" fill="none" />
    <Path data-name="Trazado 152" d="M16 16.75a.748.748 0 0 1-.53-.22l-8-8a.75.75 0 0 1 1.06-1.06l8 8a.75.75 0 0 1-.53 1.28z" fill="#333" />
    <Path data-name="Trazado 153" d="M8 16.75a.75.75 0 0 1-.53-1.28l8-8a.75.75 0 0 1 1.06 1.06l-8 8a.748.748 0 0 1-.53.22z" fill="#333" />
  </Svg>
);

export default CloseSvg;
