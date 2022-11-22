import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'utils/scaleMetrics';
import { SearchItemInterface } from 'rtk';

interface SearchItemProps {
  name: string;
  onPressItem: (result: SearchItemInterface) => void;
  result: SearchItemInterface;
}

const SearchItem: React.FC<SearchItemProps> = ({ name, onPressItem, result }: SearchItemProps) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem(result);
      }}
    >
      <Container row style={styles.container}>
        <Container flex={0.8} style={{ paddingLeft: moderateScale(5) }}>
          <CustomText fontSize={theme.fontSize.h5} fontWeight={'bold'} text={name.replace(/[^a-zA-Z0-9 ]/g, '')} />
        </Container>
        <Container flex={0.2} style={{ alignItems: 'flex-end' }}>
          <Feather name="arrow-up-left" size={theme.iconSize.small} color={theme.brandColor.iconn_grey} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderBottomColor: theme.brandColor.iconn_med_grey,
    borderBottomWidth: 1,
    alignItems: 'center'
  }
});
