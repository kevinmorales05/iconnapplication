import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { moderateScale } from 'utils/scaleMetrics';

const PlacesSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg data-name="Pin, Location" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M9 7.813A19.183 19.183 0 0 1 2.273 6.72C.163 5.9-1 4.689-1 3.313c0-.794.391-1.949 2.255-2.941a14.257 14.257 0 0 1 4.73-1.363 1 1 0 0 1 1.122.861 1 1 0 0 1-.86 1.121A12.468 12.468 0 0 0 2.2 2.137c-.886.469-1.2.915-1.2 1.176 0 .381.618 1.006 2 1.543a17.166 17.166 0 0 0 6 .957 17.166 17.166 0 0 0 6-.957c1.38-.537 2-1.162 2-1.543 0-.261-.314-.707-1.2-1.176A12.468 12.468 0 0 0 11.753.991a1 1 0 0 1-.861-1.122 1 1 0 0 1 1.122-.861A14.257 14.257 0 0 1 16.745.372C18.609 1.364 19 2.519 19 3.313c0 1.376-1.163 2.587-3.273 3.407A19.182 19.182 0 0 1 9 7.813z" transform="translate(3 14.187)" fill="#333"/>
        <Path data-name="Path" d="M6-1a6.926 6.926 0 0 1 7 6.833c0 2.06-1.091 4.374-3.242 6.876a26 26 0 0 1-3.134 3.072 1 1 0 0 1-1.248 0 26 26 0 0 1-3.134-3.072C.091 10.207-1 7.893-1 5.833A6.926 6.926 0 0 1 6-1zm0 14.683a24.983 24.983 0 0 0 2.263-2.3C10.053 9.291 11 7.373 11 5.833A4.924 4.924 0 0 0 6 1a4.924 4.924 0 0 0-5 4.833c0 1.546.954 3.473 2.758 5.572A24.948 24.948 0 0 0 6 13.683z" transform="translate(6 2)" fill="#333"/>
        <Path data-name="Path" d="M2 5a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 2.121 5.121A2.98 2.98 0 0 1 2 5zm0-4a1 1 0 1 0 .707.293A.993.993 0 0 0 2 1z" transform="translate(10 6)" fill="#333"/>
    </G>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
  </Svg>


);

export default PlacesSvg;
