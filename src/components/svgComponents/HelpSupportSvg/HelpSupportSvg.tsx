import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HelpSupportSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9-1A10 10 0 1 1-1 9 10.011 10.011 0 0 1 9-1zm0 18a8 8 0 1 0-8-8 8.009 8.009 0 0 0 8 8z" transform="translate(3 3)" fill="#333"/>
    <Path data-name="Oval" d="M3.5-1A4.5 4.5 0 1 1-1 3.5 4.505 4.505 0 0 1 3.5-1zm0 7A2.5 2.5 0 1 0 1 3.5 2.5 2.5 0 0 0 3.5 6z" transform="translate(8.5 8.5)" fill="#333"/>
    <Path d="M0 4.888A1 1 0 0 1-.707 4.6a1 1 0 0 1 0-1.414L3.181-.707a1 1 0 0 1 1.414 0A1 1 0 0 1 4.6.707L.707 4.6A1 1 0 0 1 0 4.888z" transform="translate(14.475 5.637)" fill="#333"/>
    <Path data-name="Path" d="M0 4.888A1 1 0 0 1-.707 4.6a1 1 0 0 1 0-1.414L3.181-.707a1 1 0 0 1 1.414 0A1 1 0 0 1 4.6.707L.707 4.6A1 1 0 0 1 0 4.888z" transform="translate(5.637 14.475)" fill="#333"/>
    <Path data-name="Path" d="M3.888 4.888a1 1 0 0 1-.707-.288L-.707.707a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0L4.6 3.181a1 1 0 0 1-.707 1.707z" transform="translate(5.637 5.637)" fill="#333"/>
    <Path data-name="Path" d="M3.888 4.888a1 1 0 0 1-.707-.288L-.707.707a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0L4.6 3.181a1 1 0 0 1-.707 1.707z" transform="translate(14.475 14.475)" fill="#333"/>
    <Path data-name="Path" d="M24 24H0V0h24z" fill="none"/>
  </Svg>
);

export default HelpSupportSvg;
