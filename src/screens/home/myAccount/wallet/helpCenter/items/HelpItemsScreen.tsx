import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';

interface Props {
  modulesData: [];
  icons: Map<string, string>;
}

const HelpItemsScreen: React.FC<Props> = ({ modulesData, icons }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const toast = useToast();
  const alert = useAlert();
  const [modules, setModules] = useState([]);

  return (
    <Container style={{ backgroundColor: theme.brandColor.iconn_background, width: '100%' }} height={Dimensions.get('window').height * 0.75}>
      {modulesData.length > 0 ? (
        modulesData.map(module => {
          return (
            <Container style={{ marginLeft: module.index != 6 ? 7 : 0 }}>
              <NavigationMenuItem
                text={module.name}
                disable={false}
                icon={<Image source={icons.get(module.icon)} style={{ width: module.index == 6 ? 40 : 32, height: module.index == 6 ? 40 : 32 }} />}
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
    </Container>
  );
};

export default HelpItemsScreen;
