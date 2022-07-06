import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from 'components/theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText, Button, Container } from 'components';

interface Props {
  onPressLogOut: () => void;
  name?: string;
  email?: string;
}

const HomeScreen: React.FC<Props> = ({
	onPressLogOut,
  name,
  email
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >      

      <Container flex crossCenter>
				<Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}>
          <CustomText
            textColor={theme.brandColor.iconn_dark_grey}
            text={`Hola ${name ? name : email }`}
            typography="h4"
            fontBold            
          />
        </Container>
        
        <Button
          round
          onPress={onPressLogOut}
          fontSize="h4"
          fontBold
          style={{ marginTop: 8 }}
          icon={<SimpleLineIcons name="logout" size={24} color="white" />}
        >
          Salir
        </Button>        
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
