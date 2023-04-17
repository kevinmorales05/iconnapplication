import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeartSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12.858-1A6.088 6.088 0 0 1 17.2.806a6.173 6.173 0 0 1-.328 9.014l-6.566 5.691a2 2 0 0 1-2.618 0l-6.562-5.69A6.173 6.173 0 0 1 .8.806 6.128 6.128 0 0 1 9 .367 6.127 6.127 0 0 1 12.858-1z"
      transform="translate(3 5)"
      fill="#db3a36"
    />
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none" />
  </Svg>
);

export default HeartSvg;
