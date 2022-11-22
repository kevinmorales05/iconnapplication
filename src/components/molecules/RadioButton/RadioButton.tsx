import React from 'react';
import { Container } from '../../atoms/Container';
import { CustomText, Touchable } from 'components/atoms';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';
import { moderateScale } from 'utils/scaleMetrics';

interface RadioButtonProps {
  name: string;
  isSelected: boolean;
  onPressItem: (optionIndex: number) => void;
  optionIndex: number;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, isSelected, onPressItem, optionIndex }: RadioButtonProps) => {
  return (
    <Touchable
      onPress={() => {
        onPressItem(optionIndex);
      }}
    >
      <Container style={styles.container}>
        <Container style={isSelected ? styles.containerRadioSelected : styles.containerRadio}>
          {isSelected && <Container style={styles.radioSelected} />}
        </Container>
        <Container style={styles.containerText}>
          <CustomText fontSize={theme.fontSize.h5} text={name} />
        </Container>
      </Container>
    </Touchable>
  );
};

export default RadioButton;

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
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: theme.brandColor.iconn_med_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerRadioSelected: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: theme.brandColor.iconn_green_original,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioSelected: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: theme.brandColor.iconn_green_original
  },
  containerText: {
    marginLeft: moderateScale(8)
  }
});
