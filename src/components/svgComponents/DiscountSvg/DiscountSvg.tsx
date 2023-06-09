import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { moderateScale } from 'utils/scaleMetrics';

const DiscountSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg data-name="Sale, Discount, Promotion" xmlns="http://www.w3.org/2000/svg" width={moderateScale(size)} height={moderateScale(size)} viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M0 0h24v24H0z" fill="none"/>
        <Path data-name="Path" d="M0 6.75a.748.748 0 0 1-.53-.22.75.75 0 0 1 0-1.061l6-6a.75.75 0 0 1 1.061 0A.75.75 0 0 1 6.53.53l-6 6a.748.748 0 0 1-.53.22z" transform="translate(9 9)" fill="#333"/>
        <G data-name="Grupo 5240">
            <Path data-name="Path" d="M13.572-1A2.369 2.369 0 0 1 15.69.3l1.3 2.549a.381.381 0 0 0 .164.165l2.517 1.285a2.41 2.41 0 0 1 1.2 2.9L20 9.884a.38.38 0 0 0 0 .234l.881 2.721a2.368 2.368 0 0 1-1.18 2.85l-2.549 1.3a.381.381 0 0 0-.165.164l-1.3 2.549a2.376 2.376 0 0 1-2.851 1.18L10.117 20a.387.387 0 0 0-.234 0l-2.721.881a2.377 2.377 0 0 1-2.85-1.18l-1.3-2.549a.381.381 0 0 0-.164-.165L.3 15.689a2.367 2.367 0 0 1-1.18-2.851L0 10.116a.38.38 0 0 0 0-.234l-.881-2.72A2.37 2.37 0 0 1 .3 4.311l2.547-1.3a.374.374 0 0 0 .165-.165L4.312.3a2.379 2.379 0 0 1 2.85-1.184L9.884 0a.365.365 0 0 0 .231 0l2.725-.884A2.371 2.371 0 0 1 13.572-1zm0 20a.376.376 0 0 0 .336-.206l1.3-2.548a2.364 2.364 0 0 1 1.036-1.036l2.549-1.3a.376.376 0 0 0 .188-.453l-.881-2.724a2.37 2.37 0 0 1 0-1.464l.87-2.689a.419.419 0 0 0-.208-.5l-2.515-1.289a2.364 2.364 0 0 1-1.037-1.036l-1.3-2.549a.377.377 0 0 0-.453-.188l-2.724.882a2.383 2.383 0 0 1-1.468 0l-2.719-.88a.379.379 0 0 0-.453.187l-1.3 2.549a2.36 2.36 0 0 1-1.039 1.035l-2.546 1.3a.378.378 0 0 0-.188.455l.88 2.721a2.37 2.37 0 0 1 0 1.464l-.881 2.723a.376.376 0 0 0 .187.454l2.548 1.3a2.364 2.364 0 0 1 1.036 1.036l1.3 2.549a.377.377 0 0 0 .453.188l2.725-.881a2.392 2.392 0 0 1 1.464 0l2.723.881a.378.378 0 0 0 .117.019z" transform="translate(2 2)" fill="#333"/>
            <Path data-name="Path" d="M.5 1.75A1.251 1.251 0 0 1-.75.5a1.239 1.239 0 0 1 .362-.881A1.241 1.241 0 0 1 .5-.75a1.25 1.25 0 1 1 0 2.5z" transform="translate(8.75 8.75)" fill="#333"/>
            <Path data-name="Path" d="M.5 1.75A1.251 1.251 0 0 1-.75.5a1.239 1.239 0 0 1 .362-.881A1.241 1.241 0 0 1 .5-.75a1.25 1.25 0 1 1 0 2.5z" transform="translate(14.25 14.25)" fill="#333"/>
        </G>
    </G>
  </Svg>

);

export default DiscountSvg;
