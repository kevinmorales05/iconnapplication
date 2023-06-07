import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const VidePlayerSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <G data-name="Grupo 41">
        <Path
          data-name="Path"
          d="M18 16.75H6A3.754 3.754 0 012.25 13V6A3.754 3.754 0 016 2.25h12A3.754 3.754 0 0121.75 6v7A3.754 3.754 0 0118 16.75zm-12-13A2.253 2.253 0 003.75 6v7A2.253 2.253 0 006 15.25h12A2.253 2.253 0 0020.25 13V6A2.253 2.253 0 0018 3.75z"
          fill="#008060"
        />
        <Path
          data-name="Path"
          d="M10.727 12.75a1.378 1.378 0 01-1.377-1.351V7.605a1.378 1.378 0 012.076-1.165l3.24 1.88a1.36 1.36 0 010 2.359l-3.24 1.881a1.378 1.378 0 01-.699.19zm.123-4.911v3.321l2.861-1.661zM20 20.75H10a.75.75 0 010-1.5h10a.75.75 0 010 1.5zM7 20.75H4a.75.75 0 010-1.5h3a.75.75 0 010 1.5z"
          fill="#008060"
        />
        <Path
          d="M8.5 17.75A2.25 2.25 0 116.25 20a2.253 2.253 0 012.25-2.25zm0 3a.75.75 0 10-.75-.75.751.751 0 00.75.75z"
          fill="#008060"
        />
      </G>
    </Svg>
);

export default VidePlayerSvg;
