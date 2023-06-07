import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ShoppingCartSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg
      data-name="Shopping Cart"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <G data-name="Group">
        <Path d="M0 0h24v24H0z" fill="none" />
        <G data-name="Grupo 38">
          <Path
            data-name="Path"
            d="M9.365 16.582A2.762 2.762 0 016.674 14.4L5.14 7.155a.75.75 0 01.151-.627.75.75 0 01.583-.278H18.5a1.75 1.75 0 011.7 2.175l-1.35 5.392a2.757 2.757 0 01-2.394 2.069l-6.816.682a2.83 2.83 0 01-.275.014zM6.8 7.75l1.343 6.341a1.255 1.255 0 001.222.991c.042 0 .084 0 .126-.006l6.816-.682a1.253 1.253 0 001.088-.941l1.348-5.392a.25.25 0 00-.243-.311z"
            fill="#008060"
          />
          <Path
            data-name="Path"
            d="M5.873 7.75a.75.75 0 01-.732-.591L4.619 4.75H3.5A.75.75 0 012.75 4a.75.75 0 01.75-.75h1.724a.75.75 0 01.733.591l.65 3a.751.751 0 01-.734.909zM17.111 20.749a1.117 1.117 0 01-1.116-1.116 1.1 1.1 0 01.322-.786 1.107 1.107 0 01.794-.33 1.12 1.12 0 011.116 1.116 1.118 1.118 0 01-1.116 1.116zM8.698 20.751a1.108 1.108 0 01-.793-.331 1.1 1.1 0 01-.322-.786 1.1 1.1 0 01.321-.786 1.107 1.107 0 01.794-.331 1.117 1.117 0 010 2.233z"
            fill="#008060"
          />
        </G>
      </G>
    </Svg>
);

export default ShoppingCartSvg;
