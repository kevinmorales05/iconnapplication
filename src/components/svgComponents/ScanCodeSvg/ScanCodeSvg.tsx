import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ScanCodeSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path data-name="Trazado 1847" d="M0 0h24v24H0z" fill="none" />
    <Path
      data-name="Trazado 1848"
      d="M21 8.75a.75.75 0 0 1-.75-.75V5A1.251 1.251 0 0 0 19 3.75h-3a.75.75 0 0 1 0-1.5h3A2.753 2.753 0 0 1 21.75 5v3a.75.75 0 0 1-.75.75z"
      fill="#008060"
    />
    <Path
      data-name="Trazado 1849"
      d="M3 8.75A.75.75 0 0 1 2.25 8V5A2.753 2.753 0 0 1 5 2.25h3a.75.75 0 0 1 0 1.5H5A1.251 1.251 0 0 0 3.75 5v3a.75.75 0 0 1-.75.75z"
      fill="#008060"
    />
    <Path
      data-name="Trazado 1850"
      d="M8 21.75H5A2.753 2.753 0 0 1 2.25 19v-3a.75.75 0 0 1 1.5 0v3A1.251 1.251 0 0 0 5 20.25h3a.75.75 0 0 1 0 1.5z"
      fill="#008060"
    />
    <Path
      data-name="Trazado 1851"
      d="M19 21.75h-3a.75.75 0 0 1 0-1.5h3A1.251 1.251 0 0 0 20.25 19v-3a.75.75 0 0 1 1.5 0v3A2.753 2.753 0 0 1 19 21.75z"
      fill="#008060"
    />
    <Path data-name="Trazado 1852" d="M21 12.75H3a.75.75 0 0 1 0-1.5h18a.75.75 0 0 1 0 1.5z" fill="#008060" />
  </Svg>
);

export default ScanCodeSvg;
