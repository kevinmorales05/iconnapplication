import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SquareSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <G data-name="Group">
        <Path d="M0 0h24v24H0z" fill="none" />
        <G data-name="Grupo 47">
          <Path
            data-name="Path"
            d="M12 13.279a.749.749 0 01-.384-.106l-8-4.764a.75.75 0 01-.366-.644.75.75 0 01.366-.644l8-4.765a.75.75 0 01.768 0l8 4.765a.75.75 0 010 1.289l-8 4.764a.749.749 0 01-.384.105zM5.466 7.765L12 11.656l6.534-3.891L12 3.873z"
            fill="#008060"
          />
          <Path
            data-name="Path"
            d="M12 17.515a.749.749 0 01-.384-.106l-8-4.765a.75.75 0 01-.26-1.028.75.75 0 011.028-.26L12 15.892l7.616-4.536a.75.75 0 011.028.261.75.75 0 01-.26 1.027l-8 4.765a.749.749 0 01-.384.106z"
            fill="#008060"
          />
          <Path
            data-name="Path"
            d="M12 21.75a.749.749 0 01-.384-.106l-8-4.765a.75.75 0 01-.26-1.028.75.75 0 011.028-.26L12 20.127l7.616-4.536a.75.75 0 011.028.261.75.75 0 01-.26 1.027l-8 4.765a.749.749 0 01-.384.106z"
            fill="#008060"
          />
        </G>
      </G>
    </Svg>
);

export default SquareSvg;
