import React from 'react';
import { Touchable } from 'components/atoms';
import { moderateScale } from 'utils/scaleMetrics';
import { HeartSvg, HeartSvgOutline } from 'components/svgComponents';

interface FavoriteButtonProps {
  isFavorite: boolean;
  sizeIcon: number;
  onPressItem: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onPressItem, sizeIcon }: FavoriteButtonProps) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem();
      }}
    >
      {isFavorite ? <HeartSvg size={sizeIcon} /> : <HeartSvgOutline size={sizeIcon} />}
    </Touchable>
  );
};

export default FavoriteButton;
