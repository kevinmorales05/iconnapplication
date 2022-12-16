import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import { moderateScale } from 'utils/scaleMetrics';
import { EvaluateExperencieSvg } from 'components/svgComponents/EvaluateExperencieSvg';

interface Props {
  modulesData: [];
  icons: Map<string, string>;
}

const HelpItemsScreen: React.FC<Props> = ({ modulesData, icons }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const getSpecialModule = (moduleHelp: number) => {
    let flagHelp: boolean = false;
    switch (moduleHelp) {
      case 6:
        flagHelp = true;
        break;
      case 7:
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
      case 6:
        navigate('ContactUs');
        break;
      case 7:
        navigate('EvaluateStack', { barcode: '' });
        break;
      default:
        navigate('HelpQuestions', { moduleId: module.id, moduleName: module.name });
    }
    return flagHelp;
  };

  const getIcon = (module: any, isSpecialModule: boolean) => {
    switch (module.index) {
      case 6:
        return <Image source={icons.get(module.icon)} style={{ width: isSpecialModule ? 40 : 32, height: isSpecialModule ? 40 : 32 }} />;
      case 7:
        return <EvaluateExperencieSvg size={40} />;
      default:
        return <Image source={icons.get(module.icon)} style={{ width: isSpecialModule ? 40 : 32, height: isSpecialModule ? 40 : 32 }} />;
    }
  };

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%', marginTop: moderateScale(10) }} height={Dimensions.get('window').height * 0.75}>
      {modulesData.length > 0 ? (
        modulesData.map((module, idx) => {
          const isSpecialModule = getSpecialModule(module.index);
          return (
            <Container key={module.name + idx} style={{ width: '100%' }}>
              <NavigationMenuItem
                text={module.name}
                disable={false}
                icon={getIcon(module, isSpecialModule)}
                onPressNavigateTo={() => {
                  navigateTo(module);
                }}
                isMainTextBold={true}
                description={module.description}
                mainTextSize={14}
                marginHorizontal={0}
                widthContainer={'100%'}
                marginBottom={moderateScale(15)}
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
    </Container>
  );
};

export default HelpItemsScreen;
