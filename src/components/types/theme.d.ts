
type sizes = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
type textColors = 'dark' | 'dark_grey' | 'white' | 'paragraph' | 'link' | 'medgrey' | 'grey';
export type brandColors = 'iconn_orange_original' | 'iconn_green_original' | 'iconn_red_original' | 'iconn_accent_principal' | 
'iconn_accent_secondary' | 'iconn_warm_grey' | 'iconn_light_grey' | 'iconn_med_grey' | 'iconn_grey' | 'iconn_dark_grey' |
'iconn_background' | 'iconn_white' | 'iconn_success' | 'iconn_warning' | 'iconn_error' | 'iconn_info';

type knownScale = {
  [k in sizes]: number
}

type unknownScale = {
  [size: string]: number
}

type knownBrandColors = {
  [k in brandColors]: string
}

type knownTextColors = {
  [k in textColors]: string
}

type unknownColors = {
  [color: string]: string
}

type possibleSizes = knownScale & unknownScale;
type possibleSpaces = knownScale & { none: number } & unknownScale;
type possibleTextColors = knownTextColors & unknownColors;
type possibleBrandColors = knownBrandColors & unknownColors;

export interface themeType {
  fontSize: possibleSizes;
  size: possibleSizes;
  actionButtonSize: possibleSizes;
  buttonSize: possibleSizes;
  buttonWidth: possibleSizes;
  iconSize: possibleSizes;
  avatarSize: possibleSizes;
  badgeSize: possibleSizes;
  miniBadgeSize: possibleSizes;
  listItemSpace: possibleSizes;
  space: possibleSpaces;
  layoutSpace: possibleSpaces;
  indicatorSize: possibleSizes;
  fontFamily: {
    heading: string;
    text: string;
  };
  textColor: possibleTextColors;
  brandColor: possibleBrandColors;
}
