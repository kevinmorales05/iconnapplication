import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const TrashSvg: React.FC<SvgProps> = ({ size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20">
    <Path
      d="M8.409 12.853h-5.9a2.708 2.708 0 0 1-2.7-2.5L-1-.1a.833.833 0 0 1 .219-.63A.833.833 0 0 1-.167-1h11.25a.833.833 0 0 1 .611.267.833.833 0 0 1 .219.63l-.8 10.456a2.708 2.708 0 0 1-2.7 2.5zM.733.666l.735 9.559a1.047 1.047 0 0 0 1.039.962h5.9a1.047 1.047 0 0 0 1.039-.962l.737-9.559z"
      transform="translate(4.542 5.48)"
      fill="#d91212"
    />
    <Path
      data-name="Path"
      d="M13.166 1.166H-.167A.833.833 0 0 1-1 .333.833.833 0 0 1-.167-.5h13.333a.833.833 0 1 1 0 1.666z"
      transform="translate(3.5 4.979)"
      fill="#d91212"
    />
    <Path
      data-name="Path"
      d="M.77-1h4.688A1.772 1.772 0 0 1 7.228.77v1.875a.833.833 0 0 1-.833.833H-.167S-1 3.106-1 2.645V.77A1.772 1.772 0 0 1 .77-1zm4.793 2.812V.77a.1.1 0 0 0-.1-.1H.77a.1.1 0 0 0-.1.1v1.042z"
      transform="translate(6.886 2.667)"
      fill="#d91212"
    />
    <Path
      data-name="Path"
      d="M.333 5.353A.833.833 0 0 1-.5 4.52V-.167A.833.833 0 0 1 .333-1a.833.833 0 0 1 .833.833V4.52a.833.833 0 0 1-.833.833z"
      transform="translate(11.307 9.23)"
      fill="#d91212"
    />
    <Path
      data-name="Path"
      d="M.333 5.353A.833.833 0 0 1-.5 4.52V-.167A.833.833 0 0 1 .333-1a.833.833 0 0 1 .833.833V4.52a.833.833 0 0 1-.833.833z"
      transform="translate(8.026 9.23)"
      fill="#d91212"
    />
    <Path fill="none" d="M0 0h20v20H0z" />
  </Svg>
);

export default TrashSvg;
