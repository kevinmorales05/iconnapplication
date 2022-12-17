import theme from 'components/theme/theme';
import React from 'react';
import { Switch } from 'react-native';
import { Container } from '../Container';

interface CustomSwitchProps {
  isEnabled: boolean;
  onValueChange: (v: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ isEnabled, onValueChange }) => {
  return (
    <Container flex middle>
      <Switch
        trackColor={{ false: theme.brandColor.iconn_warm_grey, true: theme.brandColor.iconn_green_original }}
        thumbColor={isEnabled ? theme.brandColor.iconn_white : theme.brandColor.iconn_white}
        ios_backgroundColor={theme.brandColor.iconn_warm_grey}
        onValueChange={onValueChange}
        value={isEnabled}
      />
    </Container>
  );
};

export default CustomSwitch;
