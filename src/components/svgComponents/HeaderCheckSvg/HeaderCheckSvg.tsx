import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const HeaderCheckSvg: React.FC<SvgProps> = ({ size }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24.01 24.01">
        <G data-name="Group">
            <Path d="M11.388 0h1.061a1.556 1.556 0 0 1 1.557 1.557v9.893a1.556 1.556 0 0 1-1.557 1.556H1.557A1.556 1.556 0 0 1 0 11.449V10" transform="translate(7.003 8.003)" stroke="#323232" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M1 14.006h11.318a2 2 0 0 0 1.665-.891l.734-1.1a4 4 0 0 0 .672-2.22V2a2 2 0 0 0-2-2h-10a2 2 0 0 0-2 2v7.06a4.013 4.013 0 0 1-.422 1.79l-.86 1.708A1 1 0 0 0 1 14.006z" transform="translate(3.001 4.001)" stroke="#323232" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M4.5 0 1.689 2.814 0 1.126" transform="translate(9.154 9.597)" stroke="#323232" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M.5 0v2" transform="translate(7.883 3.001)" stroke="#323232" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
            <Path data-name="Path" d="M.5 0v2" transform="translate(13.886 3.001)" stroke="#323232" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth="1.5px" fill="none"/>
        </G>
        <Path data-name="Path" d="M0 0h24.01v24.01H0z" fill="none"/>
    </Svg>
);

export default HeaderCheckSvg;
