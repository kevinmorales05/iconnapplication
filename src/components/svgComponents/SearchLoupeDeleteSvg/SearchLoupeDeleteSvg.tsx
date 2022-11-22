import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const SearchLoupeDeleteSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G data-name="Group">
      <Path
        d="M13.112-1A14.112 14.112 0 1 1-1 13.112 14.128 14.128 0 0 1 13.112-1zm0 24.89A10.778 10.778 0 1 0 2.333 13.112 10.791 10.791 0 0 0 13.112 23.89z"
        transform="translate(6 6)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M6.083 7.75A1.661 1.661 0 0 1 4.9 7.262L-.512 1.845A1.667 1.667 0 0 1 1.845-.512L7.262 4.9a1.667 1.667 0 0 1-1.179 2.85z"
        transform="translate(27.25 27.25)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M.667 10.16A1.667 1.667 0 0 1-.512 7.315L7.315-.512a1.667 1.667 0 0 1 2.357 2.357L1.845 9.672a1.661 1.661 0 0 1-1.178.488z"
        transform="translate(14.532 14.532)"
        fill="#747476"
      />
      <Path
        data-name="Path"
        d="M8.493 10.16a1.661 1.661 0 0 1-1.179-.488L-.512 1.845A1.667 1.667 0 0 1 1.845-.512l7.827 7.827a1.667 1.667 0 0 1-1.179 2.845z"
        transform="translate(14.532 14.532)"
        fill="#747476"
      />
    </G>
    <Path data-name="Path" d="M0 0h40v40H0z" fill="none" />
  </Svg>
);

export default SearchLoupeDeleteSvg;
