import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const dw = 350;
const scale = (size: number) => (width / dw) * size;

export const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;
