import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  visible: boolean;
  handleCamera: () => void;
  handleGallery: () => void;
  onPressOut: () => void;
}

const InvoiceItem = () => {
  const [selected, setSelected] = useState(false);

  const border = {
    borderWidth: 1,
    borderColor: '#2FB97A'
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(selected => !selected);
      }}
    >
      <View style={[selected ? border : {}, { backgroundColor: '#EBF9F3', borderRadius: 10, padding: 16, marginTop: 10 }]}>
        <Container row style={{ justifyContent: 'space-between' }}>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text="RAPA880105P32" typography="h3" fontBold />
          {selected && <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />}
        </Container>
        <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Alejandra Ramirez Pedroza" typography="h3" />
      </View>
    </TouchableOpacity>
  );
};

const InvoiceModal: React.FC<Props> = ({ visible, handleGallery, handleCamera, onPressOut }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  return (
    <CustomModal visible={visible} onDismiss={onPressOut}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...containerStyle,
            paddingBottom: insets.bottom + 16,
            backgroundColor: theme.brandColor.iconn_white
          }}
        >
          <Container>
            <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Datos fiscales" typography="h3" fontBold />
              </Container>
              <Container>
                <ActionButton
                  style={{ marginTop: -6, shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container>
              <InvoiceItem />
              <InvoiceItem />
              <InvoiceItem />
            </Container>
            <Container>
              <Button marginTop={28} round fontBold fontSize="h4" onPress={handleCamera}>
                + Agregar RFC
              </Button>
              <Button color="iconn_light_grey" fontColor="dark" round fontBold fontSize="h4" onPress={handleGallery} style={{ marginTop: 8 }}>
                Administrar Datos
              </Button>

              <Container row crossCenter style={{ marginTop: 16, marginBottom: 16 }}></Container>
            </Container>
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

export default InvoiceModal;
