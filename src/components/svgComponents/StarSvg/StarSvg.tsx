import theme from 'components/theme/theme';
import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const StarSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16">
    <G data-name="Group">
      <Path d="M0 0h16v16H0z" fill="none" />
      <Path
        data-name="Unión 3"
        d="M10.6 13.393 7 11.486l-3.6 1.907a.666.666 0 0 1-.97-.7l.689-4.045L.2 5.783a.669.669 0 0 1 .37-1.137l4.03-.594L6.4.372a.669.669 0 0 1 1.2 0l1.8 3.68 4.03.593a.669.669 0 0 1 .37 1.138l-2.918 2.863.69 4.045a.668.668 0 0 1-.658.779.652.652 0 0 1-.314-.077z"
        transform="translate(1 1.265)"
        fill={color ? color : theme.brandColor.iconn_grey}
      />
    </G>
  </Svg>
);

export default StarSvg;
