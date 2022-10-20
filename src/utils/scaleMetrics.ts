import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const dw = 350;
const dh = 680;
const scale = (size: number) => (width / dw) * size;

export const verticalScale = (size: number) => (height / dh) * size;
export const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;
