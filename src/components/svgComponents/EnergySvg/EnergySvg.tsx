import { SvgProps } from 'components/types/Svg';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const EnergySvg: React.FC<SvgProps> = ({ size }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <Path d="M0 24V0h24v24z" fill="none"/>
        <Path d="M6.859-.75A1.588 1.588 0 0 1 8.446.838v4.688h4.121a1.588 1.588 0 0 1 1.311 2.485l-6.02 8.805a1.588 1.588 0 0 1-2.9-.9v-4.684H.838A1.588 1.588 0 0 1-.473 8.747L5.548-.058A1.587 1.587 0 0 1 6.859-.75zm-.312 16.758a.089.089 0 0 0 .073-.038l6.02-8.806a.088.088 0 0 0-.073-.138H7.7a.75.75 0 0 1-.75-.75V.838a.088.088 0 0 0-.065-.084.087.087 0 0 0-.026 0 .089.089 0 0 0-.073.038L.765 9.594a.088.088 0 0 0 .073.138h4.871a.75.75 0 0 1 .75.75v5.438a.088.088 0 0 0 .062.08.086.086 0 0 0 .026.008z" transform="translate(5.297 3.621)" fill="#008060"/>
    </Svg>

);

export default EnergySvg;
