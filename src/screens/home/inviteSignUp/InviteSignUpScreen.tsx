import { Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import { Container } from 'components/atoms';
import { TextContainer, Button } from 'components/molecules';
import { ICONN_FULL_EXPERIENCE } from 'assets/images';
import { moderateScale } from 'utils/scaleMetrics';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
}

const InviteSignUpScreen: React.FC<Props> = ({ onSubmit, goBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + 16
      }}
    >
      <Container center>
        <Image source={ICONN_FULL_EXPERIENCE} style={{ height: moderateScale(328), width: moderateScale(328) }} />
      </Container>
      <TextContainer text={`Vive la experiencia completa en la \naplicación`} typography="h5" textAlign="center"/>
      <Container center>
        <Button onPress={onSubmit} round fontBold length="short" width="xxlarge" marginTop={22}>
          Ingresar a la app
        </Button>
      </Container>
    </ScrollView>
  );
};

export default InviteSignUpScreen;
