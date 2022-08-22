import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'components/molecules';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CalendarPicker from 'react-native-calendar-picker';

import { Period } from './DateModal';
import moment, { Moment } from 'moment';
import { ICONN_CALENDAR_CUSTOM } from 'assets/images';

export interface Range {
  dateStart: null | Moment;
  dateEnd: null | Moment;
}

interface RangeModalProps {
  visible: boolean;
  onPressOut: () => void;
  handlePeriod: (period: Period) => void;
  period: Period | null;
}

const RangeModal: React.FC<RangeModalProps> = ({ visible, onPressOut, period, handlePeriod }) => {
  const { containerStyle } = styles;

  const insets = useSafeAreaInsets();

  const [current, setCurrent] = useState<Period | null>(null);

  const [range, setRange] = useState<Range>({ dateStart: null, dateEnd: null });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(range.dateEnd && range.dateStart ? false : true);
  }, [range]);

  useEffect(() => {
    if (range.dateEnd && range.dateStart) {
      setCurrent({
        id: 4,
        type: range,
        label: `${range.dateStart.format('DD MMM')} - ${range.dateEnd.format('DD MMM YYYY')}`,
        icon: <Image style={styles.image} source={ICONN_CALENDAR_CUSTOM} />
      });
    }
  }, [range]);

  useEffect(() => {
    if (period) {
      const { dateStart, dateEnd } = period.type as Range;

      setRange({
        dateStart: dateStart ?? null,
        dateEnd: dateEnd ?? null
      });
    }
  }, [period]);

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
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Fecha personalizada" typography="h3" fontBold />
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
              <CalendarPicker
                weekdays={['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']}
                months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                disabledDates={date => {
                  const leftLimit = date.isBefore(moment().subtract(2, 'months'));
                  const rightLimit = date.isAfter(moment());

                  return leftLimit || rightLimit;
                }}
                previousTitle="Anterior"
                nextTitle="Siguiente"
                selectedStartDate={range.dateStart?.toDate()}
                selectedEndDate={range.dateEnd?.toDate()}
                selectedDayColor="#33A579"
                selectedDayTextColor="white"
                allowRangeSelection
                onDateChange={(date, type) => {
                  if (type === 'END_DATE') {
                    setRange(currentRange => {
                      return { ...currentRange, dateEnd: date };
                    });
                  }

                  if (type === 'START_DATE') {
                    setRange(currentRange => {
                      return { ...currentRange, dateStart: date };
                    });
                  }
                }}
              />
            </Container>
            <Container>
              <Button
                disabled={disabled}
                onPress={() => {
                  handlePeriod(current as Period);
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

export default RangeModal;
