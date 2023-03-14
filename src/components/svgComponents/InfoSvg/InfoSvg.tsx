import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const InfoSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24.01 24.01">
    <Path d="M24.01 24.01H0V0h24.01z" fill="none" />
    <Path d="M9-1A10 10 0 1 1-1 9 10.015 10.015 0 0 1 9-1zm0 18.007A8 8 0 1 0 1 9a8.013 8.013 0 0 0 8 8.007z" transform="translate(3.001 3.001)" fill="#333" />
    <Path data-name="Path" d="M2.31 1.5H0a1 1 0 0 1-1-1 1 1 0 0 1 1-1h2.31a1 1 0 0 1 0 2z" transform="translate(11.005 15.006)" fill="#333" />
    <Path
      data-name="Path"
      d="M1.15 5.252a1 1 0 0 1-1-1V1H0a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1.15a1 1 0 0 1 1 1v4.252a1 1 0 0 1-1 1z"
      transform="translate(11.014 11.255)"
      fill="#333"
    />
    <Path
      data-name="Path"
      d="M.5 1.75a1.25 1.25 0 0 1 0-2.5 1 1 0 0 1 .821.429A1 1 0 0 1 1.75.5 1.252 1.252 0 0 1 .5 1.75z"
      transform="translate(11.355 7.75)"
      fill="#333"
    />
    <Path
      data-name="Path"
      d="M.625 1.625A1 1 0 0 1-.2 1.2 1 1 0 0 1 .375-.625a1.252 1.252 0 0 1 1.25 1.25 1 1 0 0 1-1 1z"
      transform="translate(11.48 7.625)"
      fill="#333"
    />
  </Svg>
);

export default InfoSvg;
