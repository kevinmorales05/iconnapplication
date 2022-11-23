import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Container, NavigationMenuItem } from 'components';
import theme from 'components/theme/theme';
import { useToast, useAlert } from 'context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../../../../../navigation/types';
import IconO from 'react-native-vector-icons/FontAwesome5';

interface Props {
  modulesData : [];
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
            <NavigationMenuItem
              text={module.name}
              disable={false}
              icon={<IconO name={icons.get(module.icon)} size={24} color={theme.brandColor.iconn_green_original} />}
              onPressNavigateTo={() => {
                navigate('HelpQuestions', { moduleId: module.id, moduleName: module.name });
              }}
              isMainTextBold={true}
              description={module.description}
              mainTextSize={14}
              color={module.index!=6?theme.brandColor.iconn_background:theme.brandColor.iconn_white}
            />
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
};

export default HelpItemsScreen;
