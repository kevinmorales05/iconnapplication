import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const InvoiceAcoounting: React.FC<SvgProps> = ({ size }) => (
  <Svg
      data-name="Invoice, Accounting"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <G data-name="Group">
        <G data-name="Grupo 36">
          <Path
            d="M17.5 21.75h-11A2.753 2.753 0 013.75 19V5A2.753 2.753 0 016.5 2.25h11A2.753 2.753 0 0120.25 5v14a2.753 2.753 0 01-2.75 2.75zm-11-18A1.251 1.251 0 005.25 5v14a1.251 1.251 0 001.25 1.25h11A1.251 1.251 0 0018.75 19V5a1.251 1.251 0 00-1.25-1.25z"
            fill="#008060"
          />
          <Path
            data-name="Path"
            d="M16 8.25h-2a.75.75 0 01-.75-.75.75.75 0 01.75-.75h2a.75.75 0 010 1.5zM16 11.25h-2a.75.75 0 01-.75-.75.75.75 0 01.75-.75h2a.75.75 0 010 1.5zM16 15.75H8a.75.75 0 01-.75-.75.75.75 0 01.75-.75h8a.75.75 0 010 1.5zM16 18.75H8a.75.75 0 01-.75-.75.75.75 0 01.75-.75h8a.75.75 0 010 1.5zM9.5 7.5a.75.75 0 01-.75-.75V6a.75.75 0 011.5 0v.75a.75.75 0 01-.75.75zM9.5 12.75a.75.75 0 01-.75-.75v-.75a.75.75 0 011.5 0V12a.75.75 0 01-.75.75z"
            fill="#008060"
          />
          <Path
            data-name="Path"
            d="M9.947 12.002h-.822a1.832 1.832 0 01-1.567-.9.75.75 0 111.28-.779.342.342 0 00.287.179h.822a.302.302 0 00.073-.6L8.615 9.55A1.8 1.8 0 019.053 6h.822a1.831 1.831 0 011.565.894.75.75 0 11-1.28.784.341.341 0 00-.285-.178h-.822a.302.302 0 00-.073.6l1.4.352a1.8 1.8 0 01-.438 3.553z"
            fill="#008060"
          />
        </G>
      </G>
      <Path data-name="Path" d="M0 0h24v24H0z" fill="none" />
    </Svg>
);

export default InvoiceAcoounting;
