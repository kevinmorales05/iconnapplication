import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const WaterSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <Path d="M6.574 16.218A7.291 7.291 0 0 1 1.063 13.7a7.413 7.413 0 0 1 0-9.713L4.254.309a3.07 3.07 0 0 1 4.639 0l3.192 3.68a7.413 7.413 0 0 1 0 9.713 7.291 7.291 0 0 1-5.511 2.516zm0-15.468a1.569 1.569 0 0 0-1.186.541L2.2 4.972a5.913 5.913 0 0 0 0 7.748 5.8 5.8 0 0 0 8.756 0 5.913 5.913 0 0 0 0-7.748L7.76 1.291A1.569 1.569 0 0 0 6.574.75z" transform="translate(5.426 4.266)" fill="#008060"/>
        <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
        <Path data-name="Trazado 90" d="M11.792 19.025a.853.853 0 0 1-.276-.046c-2.964-1.012-3.334-4.563-3.349-4.714a.854.854 0 0 1 1.7-.164c0 .026.287 2.608 2.2 3.262a.854.854 0 0 1-.276 1.662z" transform="translate(-.32 -1.97)" fill="#008060"/>
    </Svg>
);

export default WaterSvg;
