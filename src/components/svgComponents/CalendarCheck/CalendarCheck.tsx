import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const CalendarCheck: React.FC<SvgProps> = ({ size }) => (
     <Svg
      width={size}
      height={size}
      viewBox="0 0 24.01 24.01"
    >
      <G data-name="Group">
        <Path
          d="M18.391 8.003h1.061a1.556 1.556 0 011.557 1.557v9.893a1.556 1.556 0 01-1.557 1.556H8.56a1.556 1.556 0 01-1.557-1.557v-1.449"
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth="1.5px"
          fill="none"
        />
        <Path
          data-name="Path"
          d="M4.001 18.007h11.318a2 2 0 001.665-.891l.734-1.1a4 4 0 00.672-2.22V6.001a2 2 0 00-2-2h-10a2 2 0 00-2 2v7.06a4.013 4.013 0 01-.422 1.79l-.86 1.708a1 1 0 00.893 1.448z"
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth="1.5px"
          fill="none"
        />
        <Path
          data-name="Path"
          d="M13.654 9.597l-2.811 2.814-1.689-1.688M8.383 3.001v2M14.386 3.001v2"
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth="1.5px"
          fill="none"
        />
      </G>
      <Path data-name="Path" d="M0 0h24.01v24.01H0z" fill="none" />
    </Svg>
);

export default CalendarCheck;
