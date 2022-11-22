import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';
import { themeType } from '../types/theme';

const isIphone = Platform.OS === 'ios';
const isIphoneWithNotch = isIphone && DeviceInfo.hasNotch();

const theme: themeType = {
  fontSize: {
    h1: 24,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
    buttonDark: 16,
    buttonWhite: 16,
    paragraph: 15,
    link: 14,
    placeholder: 14,
    label: 12,
    description: 12,
    dot: 28
  },
  fontWeight: {
    Bold: '',
    Regular: ''
  },
  size: {
    xxxsmall: 8,
    xxsmall: 10,
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 22
  },
  actionButtonSize: {
    xxxsmall: 18,
    xxsmall: 30,
    xsmall: 40,
    small: 50,
    medium: 60,
    large: 70,
    xlarge: 80,
    xxlarge: 90
  },
  actionButtonHeight: {
    xxxsmall: 18,
    xxsmall: 30,
    xsmall: 35,
    small: 40,
    medium: 45,
    large: 50,
    xlarge: 55,
    xxlarge: 60
  },
  buttonSize: {
    xxxsmall: 6,
    xxsmall: 8,
    xsmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 20
  },
  buttonWidth: {
    xxxsmall: 80,
    xxsmall: 100,
    xsmall: 120,
    small: 140,
    medium: 160,
    large: 180,
    xlarge: 200,
    xxlarge: 220
  },
  iconSize: {
    xxxsmall: 14,
    xxsmall: 16,
    xsmall: 18,
    small: 22,
    medium: 26,
    large: 28,
    xlarge: 32,
    xxlarge: 36
  },
  avatarSize: {
    xxxsmall: 24,
    xxsmall: 44,
    xsmall: 64,
    small: 84,
    medium: 94,
    large: 104,
    xlarge: 114,
    xxlarge: 124
  },
  badgeSize: {
    xxxsmall: 9,
    xxsmall: 10,
    xsmall: 11,
    small: 12,
    medium: 13,
    large: 14,
    xlarge: 16,
    xxlarge: 18
  },
  miniBadgeSize: {
    xxxsmall: 8,
    xxsmall: 10,
    xsmall: 11,
    small: 12,
    medium: 15,
    large: 17,
    xlarge: 19,
    xxlarge: 21
  },
  listItemSpace: {
    xxxsmall: 2.5,
    xxsmall: 5,
    xsmall: 7.5,
    small: 10,
    medium: 12,
    large: 14,
    xlarge: 16,
    xxlarge: 18
  },
  space: {
    none: 0,
    xxxsmall: 1,
    xxsmall: 2.5,
    xsmall: 5,
    small: 7.5,
    medium: 10,
    large: 12.5,
    xlarge: 15,
    xxlarge: 20
  },
  layoutSpace: {
    none: 0,
    xxxsmall: 2.5,
    xxsmall: 5,
    xsmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32
  },
  indicatorSize: {
    xxxsmall: 0.6,
    xxsmall: 0.8,
    xsmall: 0.9,
    small: 1,
    medium: 1.1,
    large: 1.25,
    xlarge: 1.5,
    xxlarge: 1.7
  },
  fontFamily: {
    heading: 'FontAwesome',
    text: 'FontAwesome'
  },
  fontColor: {
    dark: '#000000',
    dark_grey: '#333333',
    white: '#FFFFFF',
    paragraph: '#000000',
    link: '#008060',
    medgrey: '#DADADB',
    grey: '#939598',
    dark_orange: '#f37721',
    light_green: '#008060',
    placeholder: '#747476',
    green: '#5fae8e'
  },
  brandColor: {
    iconn_orange_original: '#f37721',
    iconn_green_original: '#008060',
    iconn_green_original_med: 'rgba(0,128,96,.5)',
    iconn_green_discount: '#ebf5f2',
    iconn_red_original: '#ed2525',
    iconn_accent_principal: '#008060',
    iconn_accent_secondary: '#000000',
    iconn_warm_grey: '#f7f7f5',
    iconn_light_grey: '#edebeb',
    iconn_med_grey: '#dadadb',
    iconn_grey: '#939598',
    iconn_dark_grey: '#333333',
    iconn_background: '#f4f4f4',
    iconn_grey_background: '#f1f1f1',
    iconn_white: '#ffffff',
    iconn_success: '#008060',
    iconn_warning: '#f3d449',
    iconn_error: '#D91212',
    iconn_info: '#4B79AA',
    facebook: '#3b5998',
    google: '#e33629',
    yellow_star: '#f5d736',
    yellow_container: 'rgba(243, 206, 79, 0.18)',
    accent_secondary: '#faa22d'
  },
  paddingHeader: getStatusBarHeight(true) ? getStatusBarHeight(true) + moderateScale(5) : moderateScale(40),
  bottomStickyViewBottomPadding: isIphoneWithNotch ? Math.round(verticalScale(10)) : 0
};

// TODO: we must change some current colors in the code of each component/screen.
// Because in some components/screens we still keep using hardcoded hexadecimals, and that`s wrong.
export default theme;
