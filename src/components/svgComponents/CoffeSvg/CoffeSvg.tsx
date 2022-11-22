import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { moderateScale } from 'utils/scaleMetrics';

const CoffeSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M12 4a1 1 0 0 1-.961-.725L10.6 1.726A1 1 0 0 0 9.634 1H2.366a1 1 0 0 0-.961.725l-.444 1.55a1 1 0 0 1-1.236.686 1 1 0 0 1-.686-1.236l.443-1.549A3.012 3.012 0 0 1 2.366-1h7.268a3.012 3.012 0 0 1 2.885 2.177l.443 1.548A1 1 0 0 1 12 4z" transform="translate(6 3)" fill="#333"/>
        <Path data-name="Path" d="M9.639 13H3.195a3 3 0 0 1-2.979-2.649L-.993.117a1 1 0 0 1 .876-1.11 1 1 0 0 1 1.11.876L2.2 10.117a1 1 0 0 0 .995.883h6.444a1 1 0 0 0 .994-.883L11.841-.117a1 1 0 0 1 1.11-.876 1 1 0 0 1 .876 1.11l-1.208 10.234A3 3 0 0 1 9.639 13z" transform="translate(5.583 9)" fill="#333"/>
        <Path data-name="Path" d="M2 5a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 2.121 5.121A2.98 2.98 0 0 1 2 5zm0-4a1 1 0 1 0 .707.293A.993.993 0 0 0 2 1z" transform="translate(10 13)" fill="#333"/>
    </G>
    <Path data-name="Path" d="M1.334-1h13.332a2 2 0 0 1 1.9 1.368l.333 1A2 2 0 0 1 15 4H1A2 2 0 0 1-.9 1.367l.333-1A2 2 0 0 1 1.334-1zM15 2l-.333-1H1.334L1 2h14z" transform="translate(4 6)" fill="#333"/>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
  </Svg>
);

export default CoffeSvg;
