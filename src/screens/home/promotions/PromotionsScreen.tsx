import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { CustomText, Button, Container, TextContainer } from 'components';
import { CustomModal } from '../../../components/atoms';
import { ActionButton } from '../../../components/atoms';
import Octicons from 'react-native-vector-icons/Octicons';
import { vtexDocsServices } from 'services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootState,useAppSelector } from 'rtk';
import { authServices } from 'services';

interface Props {
  onPressClose: () => void;
  visible: boolean
}

const PromotionsScreen: React.FC<Props> = ({ visible, onPressClose }) => {

  const { containerStyle } = styles;

  return (
      <Container style={styles.containerStyle}>
        <Container>
        <Button>Buscador</Button>
        </Container>
        <Container>
          <Button>Todo</Button>
        </Container>
        <Container>
          <Button>Promociones</Button>
        </Container>
      </Container>

  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
    maxHeight: '80%'
  }
});

export default PromotionsScreen;
