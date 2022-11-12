import { Container, CustomText, Touchable } from 'components';
import theme from 'components/theme/theme';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabItem } from 'rtk';
import { moderateScale } from 'utils/scaleMetrics';

const CONTAINER_WIDTH = Dimensions.get('window').width;


interface Props {
  data: TabItem;
  isSelected: boolean;
  onPressItem: (item: TabItem) => void;
}

const TabTwoElementsItem: React.FC<Props> = ({ data, isSelected, onPressItem }) => {
  return (
    <Touchable
      opacityEffect={true}
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
          textAlign='center'
        />
      </Container>
    </Touchable>
  );
};

export default TabTwoElementsItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(12),
    marginRight: moderateScale(15),
/*     borderBottomColor: theme.brandColor.iconn_med_grey,
    borderBottomWidth: moderateScale(1), */
    width: CONTAINER_WIDTH/2,
    paddingRight: 10
  },
  containerSelected: {
    paddingBottom: moderateScale(8),
    marginRight: moderateScale(15),
    borderBottomColor: theme.brandColor.iconn_green_original,
    borderBottomWidth: moderateScale(4),
    width: CONTAINER_WIDTH/2,
    paddingRight: 10
  }
});
