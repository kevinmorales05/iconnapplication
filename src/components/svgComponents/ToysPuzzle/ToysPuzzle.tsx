import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const ToysPuzzle: React.FC<SvgProps> = ({ size }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24.01 24.01"
    >
      <G data-name="Grupo 42">
        <Path
          d="M18.234 12.755a1 1 0 01-.863-1.491.991.991 0 10-1.722 0 1 1 0 01-.872 1.489h-2.772a.75.75 0 01-.75-.752V9.947a2.491 2.491 0 110-4.889V3.001a.75.75 0 111.5 0v2.771a1 1 0 01-1.491.87.991.991 0 100 1.722 1 1 0 011.489.871v2.02h1.31a2.491 2.491 0 114.889 0h2.057a.75.75 0 010 1.5h-2.775z"
          fill="#008060"
        />
        <Path
          data-name="Path"
          d="M12.001 21.759a.75.75 0 01-.746-.754v-2.767a1 1 0 011.491-.87.991.991 0 100-1.722 1 1 0 01-1.489-.871v-2.02h-1.31a2.491 2.491 0 11-4.889 0H3.001a.75.75 0 01-.75-.75.75.75 0 01.75-.75h2.77a1 1 0 01.871 1.491.991.991 0 101.722 0 1 1 0 01.871-1.491h2.766a.75.75 0 01.75.75v2.058a2.491 2.491 0 110 4.889v2.053a.75.75 0 01-.75.754z"
          fill="#008060"
        />
        <Path
          d="M7.035 2.251h9.939a4.789 4.789 0 014.784 4.784v9.939a4.789 4.789 0 01-4.784 4.784H7.035a4.789 4.789 0 01-4.784-4.784V7.035a4.789 4.789 0 014.784-4.784zm9.939 18.007a3.288 3.288 0 003.284-3.284V7.035a3.288 3.288 0 00-3.284-3.284H7.035a3.288 3.288 0 00-3.284 3.284v9.939a3.288 3.288 0 003.284 3.284z"
          fill="#008060"
        />
      </G>
      <Path data-name="Rectangle" d="M0 0h24.01v24.01H0z" fill="none" />
    </Svg>
);

export default ToysPuzzle;
