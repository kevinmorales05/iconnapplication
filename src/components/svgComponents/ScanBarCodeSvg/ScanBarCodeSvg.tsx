import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ScanBarCodeSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24.01 24.01">
    <Path d="M0 0h24.01v24.01H0z" fill="none" />
    <G data-name="Group 5416">
      <Path data-name="Path" d="M.5 5a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" transform="translate(6.002 8.004)" fill="#747476" />
      <Path data-name="Path" d="M.5 5a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" transform="translate(9.67 8.004)" fill="#747476" />
      <Path data-name="Path" d="M.5 5a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" transform="translate(13.339 8.004)" fill="#747476" />
      <Path
        data-name="Path"
        d="M4 5H3a4.006 4.006 0 0 1-4-4V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1a2 2 0 0 0 2 2h1a1 1 0 1 1 0 2z"
        transform="translate(3.001 17.008)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M4 5a1 1 0 0 1-1-1V3a2 2 0 0 0-2-2H0a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a4.006 4.006 0 0 1 4 4v1a1 1 0 0 1-1 1z"
        transform="translate(17.007 3.002)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M0 5a1 1 0 0 1-1-1V3a4.006 4.006 0 0 1 4-4h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1H3a2 2 0 0 0-2 2v1a1 1 0 0 1-1 1z"
        transform="translate(3.001 3.002)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M1 5H0a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a2 2 0 0 0 2-2V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1a4.006 4.006 0 0 1-4 4z"
        transform="translate(17.007 17.008)"
        fill="#747476"
      />
      <Path data-name="Path" d="M.5 3a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" transform="translate(6.002 15.008)" fill="#747476" />
      <Path data-name="Path" d="M.5 3a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" transform="translate(9.67 15.008)" fill="#747476" />
      <Path
        data-name="Path"
        d="M.5 2.876a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1.876a1 1 0 0 1-1 1z"
        transform="translate(13.339 15.133)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M.5 2.876a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v1.876a1 1 0 0 1-1 1z"
        transform="translate(17.007 15.133)"
        fill="#747476"
      />
      <Path data-name="Path" d="M.5 5a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" transform="translate(17.007 8.004)" fill="#747476" />
      <Path data-name="Path" d="M16.007 1.5H0a1 1 0 0 1-1-1 1 1 0 0 1 1-1h16.007a1 1 0 0 1 0 2z" transform="translate(4.001 11.506)" fill="#747476" />
    </G>
  </Svg>
);

export default ScanBarCodeSvg;
