import React from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import { ScrollView } from 'react-native-gesture-handler';
import { ICONN_HELP_TOUR } from 'assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  modulesData: [];
  icons: Map<string, string>;
  onPressTour: () => void;
}

const HelpItemsScreen: React.FC<Props> = ({ modulesData, icons, onPressTour }) => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }} height={Dimensions.get('window').height * 0.75}>
        {modulesData.length > 0 ? (
          modulesData.map(module => {
            return (
              <Container key={module.name} style={{ marginLeft: module.index != 6 ? 16 : 0 }}>
                <NavigationMenuItem
                  paddingVertical={module.index != 6 ? 15.5 : 24}
                  text={module.name}
                  disable={false}
                  icon={
                    <Image
                      source={icons.get(module.icon)}
                      style={{ width: module.index == 6 ? 40 : 32, height: module.index == 6 ? 40 : 32, marginLeft: module.index === 6 ? 16 : 0 }}
                    />
                  }
                  onPressNavigateTo={() => {
                    if (module.index != 6) {
                      navigate('HelpQuestions', { moduleId: module.id, moduleName: module.name });
                    } else {
                      navigate('ContactUs');
                    }
                  }}
                  isMainTextBold={true}
                  description={module.description}
                  mainTextSize={14}
                  color={module.index != 6 ? theme.brandColor.iconn_background : theme.brandColor.iconn_white}
                />
              </Container>
            );
          })
        ) : (
          <></>
        )}
        <Container style={{ marginTop: 8 }}>
          <NavigationMenuItem
            text="Tour Virtual"
            description="Conoce la aplicación y sus beneficios."
            isMainTextBold
            paddingVertical={24}
            icon={<Image source={ICONN_HELP_TOUR} style={{ width: 32, height: 32, marginLeft: 16 }} />}
            onPressNavigateTo={onPressTour}
          />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default HelpItemsScreen;
