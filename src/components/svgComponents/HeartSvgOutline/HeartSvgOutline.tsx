import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HeartSvgOutline: React.FC<SvgProps> = ({ size, color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12.858-1A6.088 6.088 0 0 1 17.2.806a6.173 6.173 0 0 1-.328 9.014l-6.566 5.691a2 2 0 0 1-2.618 0l-6.562-5.69A6.173 6.173 0 0 1 .8.806 6.128 6.128 0 0 1 9 .367 6.127 6.127 0 0 1 12.858-1zM9 14l6.564-5.69a4.173 4.173 0 0 0 .221-6.093 4.128 4.128 0 0 0-5.632-.207l-.5.432a1 1 0 0 1-1.31 0l-.5-.431a4.128 4.128 0 0 0-5.632.206 4.173 4.173 0 0 0 .226 6.093z"
      transform="translate(3 5)"
      fill={color ? color : '#bebebe'}
    />
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none" />
  </Svg>
);

export default HeartSvgOutline;
