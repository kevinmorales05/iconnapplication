import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { InvoicingProfileInterface } from 'rtk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';

interface InvoiceItemProps {
  invoicingProfile: InvoicingProfileInterface;
  onSelect: (invoicingProfile: InvoicingProfileInterface | null) => void;
  selected: boolean;
}
const InvoiceItem = ({ invoicingProfile, onSelect, selected }: InvoiceItemProps) => {
  const highlightBorder = {
    borderWidth: 1,
    borderColor: '#2FB97A'
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(invoicingProfile);
      }}
    >
      <View style={[selected ? highlightBorder : {}, { backgroundColor: '#EBF9F3', borderRadius: 10, padding: 16, marginTop: 10 }]}>
        <Container row style={{ justifyContent: 'space-between' }}>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text={invoicingProfile.rfc} typography="h3" fontBold />
          {selected && <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />}
        </Container>
        <CustomText textColor={theme.brandColor.iconn_dark_grey} text={`${invoicingProfile.User.name} ${invoicingProfile.User.lastName}`} typography="h3" />
      </View>
    </TouchableOpacity>
  );
};
interface InvoiceModalProps {
  visible: boolean;
  onAdd: () => void;
  onManage: (invoicingProfile: InvoicingProfileInterface | null) => void;
  onPressOut: () => void;
  invoicingProfileList: InvoicingProfileInterface[];
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ visible, onAdd, onPressOut, onManage, invoicingProfileList }) => {
  const { containerStyle } = styles;
  const [selected, setSelected] = useState<InvoicingProfileInterface | null>(null);

  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

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
              {invoicingProfileList?.map((invoicingProfile: InvoicingProfileInterface) => {
                return (
                  <InvoiceItem
                    onSelect={invoicingProfile => {
                      setSelected(invoicingProfile);
                    }}
                    invoicingProfile={invoicingProfile}
                    selected={invoicingProfile.rfc === selected?.rfc}
                  />
                );
              })}
            </Container>
            <Container>
              <Button marginTop={28} round fontBold fontSize="h4" onPress={onAdd}>
                + Agregar RFC
              </Button>
              <Button
                color="iconn_light_grey"
                fontColor="dark"
                round
                fontBold
                fontSize="h4"
                onPress={() => {
                  onManage(selected);
                }}
                style={{ marginTop: 8 }}
              >
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
