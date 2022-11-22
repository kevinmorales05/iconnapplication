import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PenSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg data-name="Pen, Edit.8" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20">
    <Path data-name="Trazado 1762" d="M0 0h20v20H0z" fill="none" />
    <Path
      data-name="Trazado 1763"
      d="M16.255 9.668a.831.831 0 0 1-.589-.244l-2.542-2.541A.833.833 0 0 1 14.3 5.7l2.542 2.542a.833.833 0 0 1-.589 1.423z"
      transform="translate(-1.8 -.749)"
      fill="#008060"
    />
    <Path
      data-name="Trazado 1764"
      d="M5.707 19.626H2.833A.833.833 0 0 1 2 18.793v-2.874a1.726 1.726 0 0 1 .5-1.219L14.29 2.917a1.716 1.716 0 0 1 2.429 0l1.989 1.989a1.716 1.716 0 0 1 0 2.429L6.921 19.123a1.725 1.725 0 0 1-1.214.503zm-2.04-1.666h2.04a.049.049 0 0 0 .034-.013L17.53 6.157a.047.047 0 0 0 .015-.035.048.048 0 0 0-.015-.036L15.54 4.1a.047.047 0 0 0-.04-.02.048.048 0 0 0-.036.015L3.682 15.884a.05.05 0 0 0-.015.036z"
      transform="translate(-.75 -.876)"
      fill="#008060"
    />
  </Svg>
);

export default PenSvg;
