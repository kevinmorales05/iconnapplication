import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ShareSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <G data-name="Group">
      <Path
        d="M12 18a1 1 0 01-1-1V3a1 1 0 012 0v14a1 1 0 01-1 1z"
        fill="#fff"
      />
      <Path
        data-name="Path"
        d="M15 7a1 1 0 01-.707-.293L12 4.414 9.707 6.707a1 1 0 01-1.414 0 1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3A1 1 0 0115 7zM19 22H5a3 3 0 01-3-3v-7a3 3 0 013-3h3a1 1 0 011 1 1 1 0 01-1 1H5a1 1 0 00-1 1v7a1 1 0 001 1h14a1 1 0 001-1v-7a1 1 0 00-1-1h-3a1 1 0 01-1-1 1 1 0 011-1h3a3 3 0 013 3v7a3 3 0 01-3 3z"
        fill="#fff"
      />
    </G>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none" />
  </Svg>
);

export default ShareSvg;
