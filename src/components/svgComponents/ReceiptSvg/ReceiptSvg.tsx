import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ReceiptSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      d="M14 19H2a3 3 0 0 1-3-3V1.5A1.99 1.99 0 0 1 .1-.29l.99-.5a2 2 0 0 1 1.787-.003L4-.236l1.1-.55a2 2 0 0 1 1.789 0L8-.236 9.113-.79a2 2 0 0 1 1.789 0l1.1.55 1.126-.557a2 2 0 0 1 1.785.006l.99.5A1.99 1.99 0 0 1 17 1.5V16a3 3 0 0 1-3 3zM1.99 1 1 1.5V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V1.5l-.99-.5-1.572.778a1 1 0 0 1-.892 0L10 1l-1.559.776a1 1 0 0 1-.891 0L6 1l-1.541.774a1 1 0 0 1-.892 0z"
      transform="translate(4 3)"
      fill="#333"
    />
    <Path data-name="Path" d="M4 1.5H0a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2z" transform="translate(8.002 8.5)" fill="#333" />
    <Path data-name="Path" d="M4 1.5H0a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2z" transform="translate(8.002 15.5)" fill="#333" />
    <Path data-name="Path" d="M4 1.5H0a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2z" transform="translate(8.002 12)" fill="#333" />
    <Path data-name="Path" d="M1 1.5H0a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" transform="translate(15.002 8.5)" fill="#333" />
    <Path data-name="Path" d="M1 1.5H0a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" transform="translate(15.002 15.5)" fill="#333" />
    <Path data-name="Path" d="M1 1.5H0a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" transform="translate(15.002 12)" fill="#333" />
  </Svg>
);

export default ReceiptSvg;
