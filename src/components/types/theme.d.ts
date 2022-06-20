import { TypographyTypes } from './typography-type';
import { SizeType } from './size-type';
import { FontColorTypes } from './font-color-type';
import { BrandColorTypes } from './brand-color-type';
import { FontWeightTypes } from './font-weight-type';

type knownFontSizes = {
  [k in TypographyTypes]: number;
};

type knownFontWeights = {
  [k in FontWeightTypes]: string;
};

type knownScale = {
  [k in SizeType]: number;
};

type knownBrandColors = {
  [k in BrandColorTypes]: string;
};

type knownFontColors = {
  [k in FontColorTypes]: string;
};

type unknownScale = {
  [size: string]: number;
};

type unknownColors = {
  [color: string]: string;
};

type possibleFontSizes = knownFontSizes & unknownScale;
type possibleSizes = knownScale & unknownScale;
type possibleSpaces = knownScale & { none: number } & unknownScale;
type possibleFontColors = knownFontColors & unknownColors;
type possibleBrandColors = knownBrandColors & unknownColors;
type possibleFontWeights = knownFontWeights;

export interface themeType {
  fontSize: possibleFontSizes;
  fontWeight: possibleFontWeights;
  size: possibleSizes;
  actionButtonSize: possibleSizes;
  actionButtonHeight: possibleSizes;
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
  fontColor: possibleFontColors;
  brandColor: possibleBrandColors;
}
