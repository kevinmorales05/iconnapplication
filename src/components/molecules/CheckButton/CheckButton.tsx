import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { moderateScale } from 'utils/scaleMetrics';

interface CheckButtonProps {
  name: string;
  isSelected: boolean;
  optionIndex: number;
  onPressItem: (optionIndex: number) => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({ name, isSelected, optionIndex, onPressItem }: CheckButtonProps) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem(optionIndex);
      }}
    >
      <Container style={styles.container}>
        <Container style={isSelected ? styles.containerRadioSelected : styles.containerRadio}>
          {isSelected && <FontAwesome name="check" size={theme.iconSize.xxsmall} color={theme.brandColor.iconn_white} />}
        </Container>
        <Container style={styles.containerText}>
          <CustomText fontSize={theme.fontSize.h5} text={name} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default CheckButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(9),
    alignItems: 'center'
  },
  containerRadio: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: theme.brandColor.iconn_med_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerRadioSelected: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(4),
    backgroundColor: theme.brandColor.iconn_green_original,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerText: {
    marginLeft: moderateScale(8)
  }
});
