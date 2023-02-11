import React from 'react';
import { Image, ScrollView, Platform } from 'react-native';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import { moderateScale } from 'utils/scaleMetrics';
import { EvaluateExperencieSvg } from 'components/svgComponents/EvaluateExperencieSvg';
import { RootState, useAppSelector } from 'rtk';
import { logEvent } from 'utils/analytics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  modulesData: [];
  icons: Map<string, string>;
  onPressTour: () => void;
}

const HelpItemsScreen: React.FC<Props> = ({ modulesData, icons }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const insets = useSafeAreaInsets();

  modulesData.sort((a, b) => {
    return a.index - b.index;
  });
  /*   for (let i = 0; i < modulesData.length; i++) {
    console.log(modulesData[i]);
  } */

  const getSpecialModule = (moduleHelp: number) => {
    let flagHelp: boolean = false;
    switch (moduleHelp) {
      case 4:
        flagHelp = true;
        break;
      case 5:
        flagHelp = true;
        break;
      case 6:
        flagHelp = true;
        break;
      default:
        flagHelp = false;
    }
    return flagHelp;
  };

  const navigateTo = (module: any) => {
    let flagHelp: boolean = false;
    switch (module.index) {
      case 7:
        navigate('ContactUs');
        break;
      case 8:
        navigate('EvaluateStack', { barcode: '' });
        break;
      case 9:
        navigate('VirtualTour', { step: 1 });
        break;
      default:
        navigate('HelpQuestions', { moduleId: module.modules_cats_id, moduleName: module.name });
    }
    return flagHelp;
  };

  const getIcon = (module: any, isSpecialModule: boolean) => {
    switch (module.index) {
      case 8:
        return <EvaluateExperencieSvg size={40} />;
      default:
        return <Image source={icons.get(module.icon)} style={{ width: isSpecialModule ? 40 : 32, height: isSpecialModule ? 40 : 32 }} />;
    }
  };

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', marginTop: moderateScale(10), height: '100%' }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={Platform.OS === 'android' ? { flexGrow: 1, marginBottom: insets.bottom + 16 } : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {modulesData.length > 0 ? (
          modulesData.map((module, idx) => {
            const isSpecialModule = getSpecialModule(module.modules_cats_id);
            return (
              <Container key={module.description + idx} style={{ width: '100%' }}>
                <NavigationMenuItem
                  text={module.name}
                  disable={false}
                  icon={getIcon(module, isSpecialModule)}
                  onPressNavigateTo={() => {
                    logEvent(`accOpen${module.icon}HelpModule`, { id: user.id, description: `Abrir modulo de ayuda ${module.name}` });
                    navigateTo(module);
                  }}
                  isMainTextBold={true}
                  description={module.description}
                  mainTextSize={14}
                  marginHorizontal={0}
                  widthContainer={'100%'}
                  marginBottom={module.index > 6 ? moderateScale(9) : moderateScale(0)}
                  height={moderateScale(isSpecialModule ? 100 : 60)}
                  paddingLeft={moderateScale(16)}
                  color={!isSpecialModule ? theme.brandColor.iconn_background : theme.brandColor.iconn_white}
                />
              </Container>
            );
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </Container>
  );
};

export default HelpItemsScreen;
