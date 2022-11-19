import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const PinMapSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <Path fill="none" d="M0 0h24v24H0z"/>
      <G data-name="Grupo 4994">
          <Path d="M8-1a8.924 8.924 0 0 1 6.336 2.616l.028.028a9.046 9.046 0 0 1 0 12.764l-3.312 3.323a4.309 4.309 0 0 1-6.093.014l-3.324-3.337a9.046 9.046 0 0 1 0-12.763A8.921 8.921 0 0 1 8-1zm0 18a2.293 2.293 0 0 0 1.636-.68L12.949 13a7.046 7.046 0 0 0 0-9.94l-.024-.024A7 7 0 0 0 1 8.027 7 7 0 0 0 3.052 13l3.323 3.334A2.291 2.291 0 0 0 8 17z" transform="translate(4 3)" fill="#333"/>
          <Path data-name="Path" d="M2.964-1a2.007 2.007 0 0 1 1.249.438l2.036 1.629A1.99 1.99 0 0 1 7 2.629V5a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V2.571a1.99 1.99 0 0 1 .751-1.562L1.715-.562A2.007 2.007 0 0 1 2.964-1zM5 5V2.629L2.964 1 1 2.571V5z" transform="translate(9 8)" fill="#333"/>
      </G>
  </Svg>


);

export default PinMapSvg;
