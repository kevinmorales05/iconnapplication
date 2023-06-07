import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ReceiptListSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        d="M20 21V4.5a1 1 0 00-.551-.9l-.99-.5a1 1 0 00-.892 0l-1.573.781-1.541-.774a1 1 0 00-.895 0L12 3.882l-1.559-.776a1 1 0 00-.895 0l-1.54.775L6.433 3.1a1 1 0 00-.892 0l-.99.5A1 1 0 004 4.5V21"
        stroke="#008060"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth="1.5px"
        fill="none"
      />
      <Path
        data-name="Path"
        d="M14.999 16h1M16 12.5h-1M8 16h4M12 12.5H8M16 9H8M22 21H2"
        stroke="#008060"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth="1.5px"
        fill="none"
      />
    </Svg>
);

export default ReceiptListSvg;
