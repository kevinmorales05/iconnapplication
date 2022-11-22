import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const ProfileSvg: React.FC<SvgProps> = ({ size, color }) => (
  <Svg data-name="User,Profile" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <G data-name="Group">
        <Path d="M9 19A10 10 0 0 1-1 9 10 10 0 0 1 9-1 10 10 0 0 1 19 9 10 10 0 0 1 9 19zM9 1a8 8 0 0 0-5.657 13.657A8 8 0 1 0 14.657 3.343 7.948 7.948 0 0 0 9 1z" transform="translate(3 3)" fill="#333"/>
        <Path data-name="Path" d="M2.813 6.626A3.813 3.813 0 0 1 .117.117a3.813 3.813 0 0 1 5.392 5.392 3.788 3.788 0 0 1-2.696 1.117zm0-5.626a1.813 1.813 0 1 0 1.282.531A1.8 1.8 0 0 0 2.813 1z" transform="translate(9.187 7.5)" fill="#333"/>
        <Path data-name="Path" d="M0 3.459a1 1 0 0 1-.688-.275 1 1 0 0 1-.037-1.413 8.853 8.853 0 0 1 12.864 0 1 1 0 0 1-1.45 1.377 6.853 6.853 0 0 0-9.964 0A1 1 0 0 1 0 3.459z" transform="translate(6.293 16.5)" fill="#333"/>
    </G>
    <Path data-name="Path" d="M0 0h24v24H0z" fill="none"/>
  </Svg>

);

export default ProfileSvg;
