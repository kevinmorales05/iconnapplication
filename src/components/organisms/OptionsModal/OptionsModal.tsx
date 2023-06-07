import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionModalButton from '../OptionModalButton';
import { moderateScale } from 'utils/scaleMetrics';
import { LisetSearchType, OptionsKey } from 'common/demoServicesPay';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface OptionsModalDataInterface {
  visible: boolean;
  onPressOut: () => void;
  options: LisetSearchType[];
  onPressOption?: (key: OptionsKey) => void;
}

const OptionsModal: React.FC<OptionsModalDataInterface> = ({ visible, onPressOut, options, onPressOption}) => {
  const { containerStyle } = styles;
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  
  const onPressGo = (item: LisetSearchType) => {
    if(onPressOption){
      return onPressOption(item.key);
    }
    if(item.navigateTo){
      onPressOut();
      navigate(item.navigateTo);
    }
  }

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: 64,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row>
              <Container width={'95%'} center>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Selecciona una opción" typography="h3" fontBold />
              </Container>
              <Container width={'5%'} center crossAlignment="end">
                <ActionButton
                  style={{ marginRight: 6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
          </Container>
          <Container style={{marginTop: moderateScale(5)}}>
            {
              options.length ?
                options.map((item) => (
                  <TouchableOpacity onPress={()=> onPressGo(item)}>
                    <OptionModalButton image={item.image} text={item.value}/>
                  </TouchableOpacity>
                ))
              :
                null
            }
          </Container>
        </TouchableOpacity>
      </Container>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.brandColor.iconn_light_grey,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16
  }
});

export type { OptionsModalDataInterface };
export { OptionsModal };
