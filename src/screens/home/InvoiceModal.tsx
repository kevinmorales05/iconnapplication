import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { InvoicingProfileInterface, RootState, useAppDispatch, useAppSelector } from 'rtk';
import { invoicingServices } from 'services';
import { setInvoicingProfilesList } from 'rtk/slices/invoicingSlice';
import { logEvent } from 'utils/analytics';
import { useToast } from 'context';

interface InvoiceItemProps {
  invoicingProfile: InvoicingProfileInterface;
}
const InvoiceItem = ({ invoicingProfile }: InvoiceItemProps) => {
  const highlightBorder = {
    borderWidth: 1,
    borderColor: '#2FB97A'
  };
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { invoicingProfileList } = useAppSelector((state: RootState) => state.invoicing);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <TouchableOpacity
      onPress={async () => {
        setLoading(true);
        try {
          const data = await invoicingServices.selectDefault(invoicingProfile.invoicing_profile_id);
          if (data.responseCode === 200) {
            const newList = invoicingProfileList.map((item: InvoicingProfileInterface) => {
              if (item.invoicing_profile_id === invoicingProfile.invoicing_profile_id) {
                return { ...item, default: true };
              }
              return { ...item, default: false } as InvoicingProfileInterface;
            });
            dispatch(setInvoicingProfilesList(newList));
          }
        } catch (error) {
          toast.show({
            message: `Ocurrió un error al asignar el perfil default. ${error}`,
            type: 'error'
          });
        } finally {
          setLoading(false);
        }
        logEvent('invSelectInvoicingProfile', {
          id: user.id,
          description: 'Seleccionar perfil fiscal',
          invoincingProfileId: invoicingProfile.invoicing_profile_id
        });
      }}
    >
      <View style={[invoicingProfile.default ? highlightBorder : {}, { backgroundColor: '#EBF9F3', borderRadius: 10, padding: 16, marginTop: 10 }]}>
        <Container row style={{ justifyContent: 'space-between' }}>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text={invoicingProfile.rfc} typography="h3" fontBold />
          {invoicingProfile.default && !loading && <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ marginRight: 5 }} />}
          {loading && <ActivityIndicator size={'small'} color="gray" />}
        </Container>
        <CustomText textColor={theme.brandColor.iconn_dark_grey} text={`${invoicingProfile.business_name}`} typography="h3" />
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
  const { user } = useAppSelector((state: RootState) => state.auth);
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
                  onPress={() => {
                    onPressOut();
                    logEvent('invCloseInvoincingModal', {
                      id: user.id,
                      description: 'Cerrar modal de datos de facturación'
                    });
                  }}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <Container style={{ height: 200 }}>
              <ScrollView>
                {invoicingProfileList?.map((invoicingProfile: InvoicingProfileInterface, index) => {
                  return <InvoiceItem key={index} invoicingProfile={invoicingProfile} />;
                })}
              </ScrollView>
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
                  const defaultInvoicingProfile = invoicingProfileList.find(item => {
                    return item.default == true;
                  });
                  onManage(defaultInvoicingProfile ?? null);
                  logEvent('invManageInvoicingProfiles', {
                    id: user.id,
                    description: 'Administrar perfiles fiscales'
                  });
                }}
                style={{ marginTop: 8 }}
              >
                Administrar Datos
              </Button>
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
