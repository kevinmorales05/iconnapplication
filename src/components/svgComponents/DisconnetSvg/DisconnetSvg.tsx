import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PinMapSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 56 56">
    <Path fill="none" d="M0 0h56v56H0z" />
    <Path
      d="M38.333 40.083a1.745 1.745 0 0 1-1.237-.513L-.237 2.237A1.75 1.75 0 0 1 2.237-.237L39.571 37.1a1.75 1.75 0 0 1-1.237 2.987z"
      transform="translate(8.333 8.333)"
      fill="#d91212"
    />
    <Path
      data-name="Path"
      d="M22-.75a13.93 13.93 0 0 1 13.815 12.288 10.592 10.592 0 0 1-1.658 21.053H9.841a10.593 10.593 0 0 1-1.656-21.055A13.928 13.928 0 0 1 22-.75zm12.157 29.841a7.091 7.091 0 1 0 0-14.182 1.75 1.75 0 0 1-1.75-1.75 10.409 10.409 0 0 0-20.818 0 1.75 1.75 0 0 1-1.75 1.75 7.092 7.092 0 0 0 0 14.184z"
      transform="translate(6 11.159)"
      fill="#d91212"
    />
  </Svg>
);

export default PinMapSvg;
