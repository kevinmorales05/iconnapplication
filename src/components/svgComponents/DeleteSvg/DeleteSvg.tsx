import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const DeleteSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg
    data-name="Delete, Disabled"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <G data-name="Group">
      <Path d="M0 0h24v24H0z" fill="none" />
      <G data-name="Grupo 4998">
        <Path
          data-name="Path"
          d="M18 19a1 1 0 01-.707-.293l-12-12a1 1 0 010-1.414 1 1 0 011.414 0l12 12A1 1 0 0118 19z"
          fill="#fff"
        />
        <Path
          data-name="Path"
          d="M6 19a1 1 0 01-.707-.293 1 1 0 010-1.414l12-12a1 1 0 011.414 0 1 1 0 010 1.414l-12 12A1 1 0 016 19z"
          fill="#fff"
        />
      </G>
    </G>
  </Svg>
);

export default DeleteSvg;
