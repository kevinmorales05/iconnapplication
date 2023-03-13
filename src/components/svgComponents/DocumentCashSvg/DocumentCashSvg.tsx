import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DocumentCashSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path d="M24 0H0v24h24z" fill="none" />
    <Path data-name="Path" d="M3.5 6.5H0a1 1 0 0 1 0-2h3.5a1 1 0 0 0 1-1V0a1 1 0 1 1 2 0v3.5a3 3 0 0 1-3 3z" transform="translate(4 3)" fill="#333" />
    <Path
      data-name="Path"
      d="M11 19H3a4 4 0 0 1-4-4V5.509A3.974 3.974 0 0 1 .172 2.681L2.681.172A3.974 3.974 0 0 1 5.509-1H13a4 4 0 0 1 4 4v3a1 1 0 0 1-2 0V3a2 2 0 0 0-2-2H5.509a1.987 1.987 0 0 0-1.409.586L1.586 4.1A1.987 1.987 0 0 0 1 5.509V15a2 2 0 0 0 2 2h8a1 1 0 0 1 0 2z"
      transform="translate(4 3)"
      fill="#333"
    />
    <Path data-name="Path" d="M2 1.5H0a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" transform="translate(13 14.5)" fill="#333" />
    <Path data-name="Path" d="M1 1.5H0a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z" transform="translate(14 17.5)" fill="#333" />
    <Path data-name="Path" d="M.5 1.9a1 1 0 0 1-1-1V.1a1 1 0 1 1 2 0v.8a1 1 0 0 1-1 1z" transform="translate(19.5 11.904)" fill="#333" />
    <Path
      data-name="Path"
      d="M0 2.624a1.01 1.01 0 0 1-.118-.007 1 1 0 0 1-.876-1.11A2.839 2.839 0 0 1 2.094-.987 1 1 0 0 1 1.906 1a.844.844 0 0 0-.912.737A1 1 0 0 1 0 2.624z"
      transform="translate(18 12.8)"
      fill="#333"
    />
    <Path data-name="Path" d="M.5 1.9a1 1 0 0 1-1-1V.1a1 1 0 1 1 2 0v.8a1 1 0 0 1-1 1z" transform="translate(19.5 19.096)" fill="#333" />
    <Path
      data-name="Path"
      d="M.178 2.624q-.136 0-.272-.013A1 1 0 0 1-1 1.521 1 1 0 0 1 .094.62a.844.844 0 0 0 .912-.737 1 1 0 0 1 1.11-.876 1 1 0 0 1 .877 1.11 2.823 2.823 0 0 1-1.035 1.876 2.821 2.821 0 0 1-1.78.631z"
      transform="translate(20 17.576)"
      fill="#333"
    />
    <Path
      data-name="Path"
      d="M1.949 2.267a1 1 0 0 1-.937-.65A.946.946 0 0 0 .063 1 1 1 0 0 1-1 .066a1 1 0 0 1 .937-1.06A2.935 2.935 0 0 1 2.886.917a1 1 0 0 1-.936 1.351z"
      transform="translate(20 12.804)"
      fill="#333"
    />
    <Path
      data-name="Path"
      d="M1.822 2.267A2.933 2.933 0 0 1-.937.35 1 1 0 0 1-.35-.937 1 1 0 0 1 .937-.35a.946.946 0 0 0 .95.616 1 1 0 1 1 .125 2c-.064-.001-.127.001-.19.001z"
      transform="translate(18.051 17.929)"
      fill="#333"
    />
    <Path
      data-name="Path"
      d="M4 4.153a1 1 0 0 1-1-1 .436.436 0 0 0-.35-.427L.957 2.388A2.442 2.442 0 0 1-1 0a1 1 0 0 1 1-1 1 1 0 0 1 1 1 .436.436 0 0 0 .35.427l1.693.338A2.442 2.442 0 0 1 5 3.153a1 1 0 0 1-1 1z"
      transform="translate(18 14.424)"
      fill="#333"
    />
  </Svg>
);

export default DocumentCashSvg;
