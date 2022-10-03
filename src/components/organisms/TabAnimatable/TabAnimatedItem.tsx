import { Container, CustomText, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabItem } from 'rtk';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  data: TabItem;
  position?: number;
  isSelected: boolean;
  onPressItem: (item: TabItem) => void;
}

const TabAnimatedItem: React.FC<Props> = ({ data, position, isSelected, onPressItem }) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem(data);
      }}
    >
      <Container style={isSelected ? styles.containerSelected : styles.container}>
        <CustomText
          text={data.name}
          fontSize={theme.fontSize.h5}
          fontWeight={isSelected ? '900' : 'normal'}
          textColor={isSelected ? theme.brandColor.iconn_green_original : theme.brandColor.iconn_accent_secondary}
        />
      </Container>
    </Touchable>
  );
};

export default TabAnimatedItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(12),
    marginRight: moderateScale(15)
  },
  containerSelected: {
    paddingBottom: moderateScale(8),
    marginRight: moderateScale(15),
    borderBottomColor: theme.brandColor.iconn_green_original,
    borderBottomWidth: moderateScale(4)
  }
});
