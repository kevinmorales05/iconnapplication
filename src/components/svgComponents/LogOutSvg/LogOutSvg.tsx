import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const LogOutSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg data-name="Exit, Log out" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Group">
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path data-name="Path" d="M12 1.5H0a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z" transform="translate(3 11.5)" fill="#d91212" />
      <Path
        data-name="Path"
        d="M8.053 19a9.944 9.944 0 0 1-5.334-1.545A10.045 10.045 0 0 1-.9 13.445 1 1 0 0 1-.445 12.1a1 1 0 0 1 1.341.45 8.045 8.045 0 0 0 2.894 3.216A8 8 0 1 0 8.053 1 7.947 7.947 0 0 0 3.79 2.234 8.045 8.045 0 0 0 .9 5.445 1 1 0 0 1-.445 5.9 1 1 0 0 1-.9 4.555 10.045 10.045 0 0 1 2.719.545 10 10 0 1 1 8.053 19z"
        transform="translate(3.947 3)"
        fill="#d91212"
      />
      <Path
        data-name="Path"
        d="M0 7a1 1 0 0 1-.707-.293 1 1 0 0 1 0-1.414L1.586 3-.707.707a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 0 7z"
        transform="translate(12 9)"
        fill="#d91212"
      />
    </G>
  </Svg>
);

export default LogOutSvg;
