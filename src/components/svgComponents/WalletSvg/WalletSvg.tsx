import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const WalletSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Grupo 5374">
      <Path fill="none" d="M0 0h24v23.956H0z" />
      <Path
        d="M0 4.988a1 1 0 0 1-.833-.444A1 1 0 0 1-.555 3.16L4.941-.5A3 3 0 0 1 9 .2l2.37 3.145a1 1 0 0 1-1.6 1.2L7.405 1.4a1 1 0 0 0-1.355-.237L.554 4.821A1 1 0 0 1 0 4.988z"
        transform="translate(7.93 2.997)"
        fill="#333"
      />
      <Path
        data-name="Path"
        d="M2.5-1H5a2 2 0 0 1 2 2v2.99a2 2 0 0 1-2 2H2.5A3.493 3.493 0 1 1 2.5-1zM5 3.991V1H2.5a1.5 1.5 0 1 0 0 3z"
        transform="translate(16.001 11.481)"
        fill="#333"
      />
      <Path
        data-name="Path"
        d="M6.5 5.487H1a1 1 0 1 1 0-2h5.5A1.5 1.5 0 0 0 8 1.994V0a1 1 0 0 1 1-1 1 1 0 0 1 1 1v2a3.5 3.5 0 0 1-3.5 3.487z"
        transform="translate(12 16.472)"
        fill="#333"
      />
      <Path
        data-name="Path"
        d="M0 4.989a1 1 0 0 1-1-1v-1.5A3.5 3.5 0 0 1 2.5-1h13A3.5 3.5 0 0 1 19 2.493v2a1 1 0 0 1-2 0v-2A1.5 1.5 0 0 0 15.5 1h-13A1.5 1.5 0 0 0 1 2.493v1.5a1 1 0 0 1-1 .996z"
        transform="translate(3 6.989)"
        fill="#333"
      />
      <G>
        <G data-name="Group">
          <Path
            data-name="Rectangle"
            d="M2.654-.75h4.19a3.416 3.416 0 0 1 3.4 3.419v4.209a3.416 3.416 0 0 1-3.4 3.419h-4.19A3.416 3.416 0 0 1-.75 6.878V2.669A3.416 3.416 0 0 1 2.654-.75zm4.19 9.469a1.839 1.839 0 0 0 1.833-1.841V2.669A1.839 1.839 0 0 0 6.844.828h-4.19A1.839 1.839 0 0 0 .821 2.669v4.209a1.839 1.839 0 0 0 1.833 1.841z"
            transform="translate(.79 13.703)"
            fill="#333"
          />
          <Path
            data-name="Rectangle"
            d="M.5-.5h.9a1 1 0 0 1 1 1v.9a1 1 0 0 1-1 1H.5a1 1 0 0 1-1-1V.5a1 1 0 0 1 1-1zm.9 1.9V.5H.5v.9z"
            transform="translate(6.317 15.743)"
            fill="#333"
          />
          <Path
            data-name="Rectangle"
            d="M.5-.5h.9a1 1 0 0 1 1 1v.9a1 1 0 0 1-1 1H.5a1 1 0 0 1-1-1V.5a1 1 0 0 1 1-1zm.9 1.9V.5H.5v.9z"
            transform="translate(2.797 15.743)"
            fill="#333"
          />
          <Path
            data-name="Rectangle"
            d="M.5-.5h.9a1 1 0 0 1 1 1v.9a1 1 0 0 1-1 1H.5a1 1 0 0 1-1-1V.5a1 1 0 0 1 1-1zm.9 1.9V.5H.5v.9z"
            transform="translate(2.797 19.264)"
            fill="#333"
          />
          <Path data-name="Path" d="M.5 1A.5.5 0 0 1 .144.854.5.5 0 1 1 .5 1z" transform="translate(6.768 19.714)" fill="#333" />
          <Path data-name="Path" d="M.5 1A.5.5 0 0 1 .144.854.5.5 0 1 1 .5 1z" transform="translate(7.688 18.793)" fill="#333" />
          <Path data-name="Path" d="M.5 1A.5.5 0 0 1 .144.854.5.5 0 1 1 .5 1z" transform="translate(5.847 18.793)" fill="#333" />
          <Path data-name="Path" d="M.5 1A.5.5 0 0 1 .144.854.5.5 0 1 1 .5 1z" transform="translate(7.688 20.688)" fill="#333" />
          <Path data-name="Path" d="M.5 1A.5.5 0 0 1 .144.854.5.5 0 1 1 .5 1z" transform="translate(5.847 20.688)" fill="#333" />
        </G>
      </G>
    </G>
  </Svg>
);

export default WalletSvg;
