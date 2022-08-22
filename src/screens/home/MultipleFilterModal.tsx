import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { ICONN_CALENDAR_YESTERDAY, ICONN_CALENDAR_WEEK, ICONN_CALENDAR_MONTH, ICONN_CALENDAR_CUSTOM } from 'assets/images';

import { Range } from './RangeModal';
import { EstablishmentFilter, Establishment } from './EstablishmentModal';
import { AmmountFilter, Ammount } from './AmmountModal';

export interface Period {
  id: number;
  type: string | Range;
  label: string | React.ReactNode;
  icon: React.ReactNode;
}

interface DateItemProps {
  period: Period;
  selected: boolean;
  onPress: (period: Period) => void;
}

const DateItem = ({ period, selected, onPress }: DateItemProps) => {
  return (
    <Touchable
      onPress={() => {
        onPress(period);
      }}
    >
      <Container style={{ marginVertical: 10, alignItems: 'center' }} row>
        {period.icon}
        <CustomText text={period.label as string} />
        <View style={{ display: 'flex', alignItems: 'flex-end', flex: 1 }}>
          {selected && <AntDesign style={{ marginHorizontal: 5 }} name="check" size={20} color="#34c28c" />}
        </View>
      </Container>
    </Touchable>
  );
};

interface MultipleFilterModalProps {
  visible: boolean;
  onPressOut: () => void;

  handlePeriod: (period: Period) => void;
  handleRange: () => void;
  period: Period | null;

  handleEstablishment: (establishment: Establishment) => void;
  establishment: Establishment | null;

  handleAmmount: (ammount: Ammount) => void;
  ammount: Ammount | null;
  onClear: () => void;
}

const MultipleFilterModal: React.FC<MultipleFilterModalProps> = ({
  visible,
  onPressOut,
  handlePeriod,
  handleRange,
  period,
  handleEstablishment,
  establishment,
  handleAmmount,
  ammount,
  onClear
}) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  const [current, setCurrent] = useState<Period | null>(null);

  useEffect(() => {
    setCurrent(visible ? period : null);
  }, [visible]);

  const PERIODS = [
    {
      id: 1,
      type: 'yesterday',
      label: 'Ayer',
      icon: <Image style={styles.image} source={ICONN_CALENDAR_YESTERDAY} />
    },
    {
      id: 2,
      type: 'week',
      label: 'Esta semana',
      icon: <Image style={styles.image} source={ICONN_CALENDAR_WEEK} />
    },
    {
      id: 3,
      type: 'month',
      label: 'Este mes',
      icon: <Image style={styles.image} source={ICONN_CALENDAR_MONTH} />
    },
    {
      id: 4,
      type: { dateEnd: 'hola mundo', dateStart: 'hola mundo' },
      label: 'Personalizado',
      icon: <Image style={styles.image} source={ICONN_CALENDAR_CUSTOM} />
    }
  ] as Period[];

  const [periods, setPeriods] = useState<Period[]>(PERIODS);

  //establishment
  const [currentE, setCurrentE] = useState<Establishment | null>(null);

  useEffect(() => {
    setCurrentE(visible ? establishment : null);
  }, [visible]);

  //ammount

  const [currentA, setCurrentA] = useState<Ammount | null>(null);

  useEffect(() => {
    setCurrentA(visible ? ammount : null);
  }, [visible]);

  useEffect(() => {
    if (period) {
      if (typeof period.type !== 'string') {
        setPeriods(items => {
          const currentPeriods: Period[] = items.map(item => {
            if (item.id === 4) {
              return { ...item, label: `Personalizado: ${period.label}` };
            } else {
              return item;
            }
          });
          return currentPeriods;
        });
      } else {
        setPeriods(PERIODS);
      }
    }
  }, [period]);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const hasChanges = [current, currentA, currentE].some(element => {
      return element !== null;
    });

    setHasChanges(hasChanges);
  }, [current, currentA, currentE]);

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
          <Container style={{ height: 500 }}>
            <Container row space="between" style={{ marginBottom: 20, alignItems: 'center' }}>
              <Touchable
                onPress={() => {
                  onClear();
                  setCurrent(null);
                  setCurrentA(null);
                  setCurrentE(null);
                }}
              >
                <CustomText text="Limpiar" textColor={theme.fontColor.light_green} underline fontBold />
              </Touchable>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Filtrar facturas" typography="h2" fontBold />
              </Container>
              <Container>
                <ActionButton
                  style={{ shadowColor: 'none' }}
                  icon={<Ionicons name="close-outline" size={20} color={theme.fontColor.dark_grey} />}
                  size="xxsmall"
                  onPress={onPressOut}
                  color="iconn_med_grey"
                  circle
                />
              </Container>
            </Container>
            <ScrollView>
              <Container>
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Rango de fechas" typography="h3" fontBold />
              </Container>
              <Container>
                {periods.map(period => {
                  return (
                    <DateItem
                      onPress={() => {
                        if (typeof period.type === 'string') {
                          setCurrent(period);
                        } else {
                          handleRange();
                        }
                      }}
                      period={period}
                      selected={period.id === current?.id}
                    />
                  );
                })}
              </Container>

              <EstablishmentFilter
                onCurrent={currentE => {
                  setCurrentE(currentE);
                }}
                current={currentE as Establishment}
              />
              <AmmountFilter
                onCurrent={currentA => {
                  setCurrentA(currentA);
                }}
                current={currentA as Ammount}
              />
            </ScrollView>
            <Button
              disabled={!hasChanges}
              onPress={() => {
                if (current) handlePeriod(current);
                if (currentE) handleEstablishment(currentE);
                if (currentA) handleAmmount(currentA);

                onPressOut();
              }}
              marginTop={28}
              round
              fontBold
              fontSize="h4"
            >
              Aplicar
            </Button>
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
  },
  image: { marginRight: 12, width: 24, height: 24 }
});

export default MultipleFilterModal;
