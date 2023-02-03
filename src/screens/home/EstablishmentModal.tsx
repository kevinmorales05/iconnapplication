import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { ICONN_CARD_PETRO, ICONN_CARD_SEVEN } from 'assets/images';
import { logEvent } from 'utils/analytics';
import { RootState, useAppSelector } from 'rtk';

interface EstablishmentModalProps {
  visible: boolean;
  onPressOut: () => void;
  establishment: Establishment | null;
  handleEstablishment: (establishment: Establishment) => void;
}

export interface Establishment {
  id: number;
  content: ImageSourcePropType;
  name: string;
}

const STORES = [
  {
    id: 1,
    content: ICONN_CARD_PETRO,
    name: 'Petro Seven'
  },
  {
    id: 2,
    content: ICONN_CARD_SEVEN,
    name: 'Seven Eleven'
  }
] as Establishment[];

interface EstablishmentItemProps {
  selected: boolean;
  establishment: Establishment;
  onPress: (selected: Establishment) => void;
}

const EstablishmentItem = ({ selected, establishment, onPress }: EstablishmentItemProps) => {
  const highlightBorder = {
    borderWidth: 1,
    borderColor: '#2FB97A'
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(establishment);
      }}
      style={[
        selected ? highlightBorder : {},
        { flex: 3, backgroundColor: '#EBF9F3', marginHorizontal: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }
      ]}
    >
      {selected && <Icon name="checkcircle" size={18} color={theme.brandColor.iconn_success} style={{ position: 'absolute', zIndex: 1, top: 5, right: 5 }} />}
      <Image source={establishment.content} />
    </TouchableOpacity>
  );
};

const EstablishmentModal: React.FC<EstablishmentModalProps> = ({ visible, onPressOut, establishment, handleEstablishment }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  const [current, setCurrent] = useState<Establishment | null>(null);
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    setCurrent(visible ? establishment : null);
  }, [visible]);

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
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Establecimiento" typography="h3" fontBold />
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
            <Container row>
              <View style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 100 }}>
                {STORES.map((establishmentItem, index) => {
                  return (
                    <EstablishmentItem
                      onPress={newCurrent => {
                        setCurrent(newCurrent);
                      }}
                      selected={establishmentItem.id === current?.id}
                      establishment={establishmentItem}
                      key={index}
                    />
                  );
                })}
              </View>
            </Container>
            <Container>
              <Button
                disabled={current === null}
                onPress={() => {
                  handleEstablishment(current as Establishment);
                  onPressOut();
                  logEvent('invSelectInvoicingHistoryFilter', {
                    id: user.id,
                    description: 'Filtrar historial de facturas',
                    filterType: 'Establishment'
                  });
                }}
                marginTop={28}
                round
                fontBold
                fontSize="h4"
              >
                Aplicar
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

export default EstablishmentModal;

interface EstablishmentFilterProps {
  onCurrent: (establishment: Establishment) => void;
  current: Establishment;
}

export const EstablishmentFilter = ({ current, onCurrent }: EstablishmentFilterProps) => {
  return (
    <Container>
      <Container row space="between" style={{ marginTop: 16, marginBottom: 16 }}>
        <Container>
          <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Establecimiento" typography="h3" fontBold />
        </Container>
      </Container>
      <Container row>
        <View style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 100 }}>
          {STORES.map((establishmentItem, index) => {
            return (
              <EstablishmentItem
                onPress={newCurrent => {
                  onCurrent(newCurrent);
                }}
                selected={establishmentItem.id === current?.id}
                establishment={establishmentItem}
                key={index}
              />
            );
          })}
        </View>
      </Container>
    </Container>
  );
};
