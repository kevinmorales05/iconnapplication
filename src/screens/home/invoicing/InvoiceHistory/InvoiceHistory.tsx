import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';
import { ActionButton, Container, CustomText, Touchable, SafeArea } from 'components';
import theme from 'components/theme/theme';
import { ICONN_INVOICE, ICONN_PETRO_MINIMAL } from 'assets/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { invoicingServices } from 'services';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import Entypo from 'react-native-vector-icons/Entypo';
import InvoicingHelpModal from 'screens/home/InvoicingHelpModal';
import SendInvoiceModal from 'screens/home/SendInvoiceModal';
import EstablishmentModal, { Establishment } from 'screens/home/EstablishmentModal';
import AmmountModal, { Ammount } from 'screens/home/AmmountModal';
import DateModal, { Period } from 'screens/home/DateModal';
import RangeModal from 'screens/home/RangeModal';
import MultipleFilterModal from 'screens/home/MultipleFilterModal';
import { useLoading } from 'context';

interface FilterChipProps {
  name: string;
  label: string;
  value?: string;
  onPress?: () => void;
  highlight: boolean;
}

const FilterChip = ({ highlight = false, label, value, onPress = () => {} }: FilterChipProps) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[{ backgroundColor: '#D1D1D3', borderRadius: 12, padding: 9, marginLeft: 10 }, highlight && { backgroundColor: theme.fontColor.light_green }]}
      >
        <CustomText textColor={highlight ? 'white' : 'black'} alignSelf="center" text={label} />
      </View>
    </Touchable>
  );
};

const DateSeparator = ({ date }: { date: string }) => {
  return (
    <View style={{ marginTop: 10, marginLeft: 15 }}>
      <CustomText text={date} textColor={theme.fontColor.grey} fontBold />
    </View>
  );
};

const InvoiceItem = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 18,
        paddingHorizontal: 23,
        marginTop: 10
      }}
    >
      <View>
        <Image source={ICONN_PETRO_MINIMAL} />
      </View>
      <View>
        <CustomText text="RAPA880105P32" fontBold />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CustomText text="Total:" />
        <CustomText text=" $48.50" textColor={theme.fontColor.light_green} fontBold />
      </View>
    </View>
  );
};

const Results = () => {
  return (
    <View>
      <ScrollView>
        <DateSeparator date={'Mayo 16, 2022'} />
        <InvoiceItem />
        <InvoiceItem />
      </ScrollView>
    </View>
  );
};

const Empty = () => {
  return (
    <Container style={styles.empty}>
      <Container center style={styles.content}>
        <Container center>
          <Image source={ICONN_INVOICE} />
        </Container>
        <Container style={styles.title}>
          <CustomText textAlign="center" text="NO TIENES FACTURAS DISPONIBLES" alignSelf="center" typography="h3" fontBold fontSize={12} />
        </Container>
        <Container style={styles.placeholder}>
          <CustomText
            fontSize={12}
            textAlign="center"
            alignSelf="center"
            textColor={theme.brandColor.iconn_grey}
            text="Las facturas que realices con tu cuenta aparecerán aquí."
            typography="h3"
          />
        </Container>
      </Container>
    </Container>
  );
};

enum Filter {
  STORE,
  DATE,
  AMMOUNT,
  MULTIPLE
}

const InvoiceScreen: React.FC = () => {
  const [results, setResults] = useState<null | []>(null);
  const [supporting, setSupporting] = useState(false);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<Filter | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [ammmount, setAmmount] = useState<Ammount | null>(null);
  const [date, setDate] = useState<Period | null>(null);
  const [visible, setVisible] = useState(false);

  const [query, setQuery] = useState<any>(null);

  const loader = useLoading();

  useEffect(() => {
    let dateFilter = null;

    if (date) {
      if (typeof date?.type === 'string') {
        if (date.label === 'Ayer') {
          dateFilter = {
            yesterday: true
          };
        }
        if (date.label === 'Esta semana') {
          dateFilter = {
            thisWeek: true
          };
        }
        if (date.label === 'Este mes') {
          dateFilter = {
            thisMonth: true
          };
        }
      } else {
        dateFilter = {
          dateStart: date.type.dateStart?.format('DD-MM-YYYY'),
          dateEnd: date.type.dateEnd?.format('DD-MM-YYYY')
        };
      }
    }

    setQuery({
      ...(dateFilter ? dateFilter : {}),
      ...(ammmount ? { amount: { min: ammmount?.min, max: ammmount?.max } } : {}),
      ...(establishment ? { establishment: establishment.id } : {})
    });
  }, [establishment, ammmount, date]);

  useEffect(() => {
    if (!query) return;
    if (Object.keys(query).length === 0) return;

    (async () => {
      if (!query) return;
      loader.show();
      try {
        const data = await invoicingServices.getInvoices(1, 2, { params: query });
      } catch (e) {
      } finally {
        loader.hide();
      }

      // console.log('data', data);
    })();
  }, [query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <ActionButton
            circle
            size="xxxsmall"
            color="iconn_accent_secondary"
            onPress={() => {
              setSupporting(true);
            }}
            icon={<Entypo name="help" size={11} color={theme.fontColor.white} />}
          />
        );
      }
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filters}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Touchable
                onPress={() => {
                  setFilter(Filter.MULTIPLE);
                }}
              >
                <View
                  style={{
                    borderRadius: 7,
                    padding: 5,
                    marginLeft: 10,
                    backgroundColor: theme.fontColor.light_green
                  }}
                >
                  <MaterialCommunityIcons name="tune-vertical-variant" size={16} color={theme.fontColor.white} />
                </View>
              </Touchable>
            </View>

            <FilterChip
              highlight={!!date}
              label={date ? (date.label as string) : 'Fecha'}
              name="date"
              onPress={() => {
                setFilter(Filter.DATE);
              }}
            />
            <FilterChip
              highlight={!!establishment}
              label={establishment ? (establishment.name as string) : 'Establecimiento'}
              name="date"
              onPress={() => {
                setFilter(Filter.STORE);
              }}
            />
            <FilterChip
              highlight={!!ammmount}
              label={ammmount ? (ammmount.label as string) : 'Monto'}
              name="date"
              onPress={() => {
                setFilter(Filter.AMMOUNT);
              }}
            />
            <View style={{ marginHorizontal: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Touchable
                onPress={() => {
                  setEstablishment(null);
                  setAmmount(null);
                  setDate(null);
                }}
              >
                <CustomText text="Limpiar todo" textColor={theme.fontColor.light_green} underline fontBold />
              </Touchable>
            </View>
          </ScrollView>
        </View>
        {results ? <Empty /> : <Results />}
        <SafeArea topSafeArea={false} bottomSafeArea={false} barStyle="dark">
          {/* actions modals */}
          <InvoicingHelpModal
            visible={supporting}
            onPressOut={() => {
              setSupporting(false);
            }}
          />
          <SendInvoiceModal
            visible={sending}
            onPressOut={() => {
              setSending(false);
            }}
          />
          {/* filtering modals */}
          <EstablishmentModal
            handleEstablishment={current => {
              setEstablishment(current);
            }}
            establishment={establishment}
            visible={filter === Filter.STORE}
            onPressOut={() => {
              setFilter(null);
            }}
          />
          <AmmountModal
            ammount={ammmount}
            handleAmmount={current => {
              setAmmount(current);
            }}
            visible={filter === Filter.AMMOUNT}
            onPressOut={() => {
              setFilter(null);
            }}
          />
          <DateModal
            period={date}
            handlePeriod={current => {
              setDate(current);
            }}
            handleRange={() => {
              setVisible(true);
              setFilter(null);
            }}
            visible={filter === Filter.DATE}
            onPressOut={() => {
              setFilter(null);
            }}
          />
          <RangeModal
            period={date}
            handlePeriod={current => {
              setDate(current);
            }}
            visible={visible}
            onPressOut={() => {
              setVisible(false);
            }}
          />
          <MultipleFilterModal
            handleEstablishment={current => {
              setEstablishment(current);
            }}
            establishment={establishment}
            //ammount
            ammount={ammmount}
            handleAmmount={current => {
              setAmmount(current);
            }}
            //period
            period={date}
            handlePeriod={current => {
              setDate(current);
            }}
            handleRange={() => {
              setVisible(true);
              setFilter(null);
            }}
            visible={filter === Filter.MULTIPLE}
            onPressOut={() => {
              setFilter(null);
            }}
            onClear={() => {
              setEstablishment(null);
              setAmmount(null);
              setDate(null);
            }}
          />
        </SafeArea>
      </View>
    </>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  empty: { height: '100%', marginTop: 100 },
  content: {},
  title: { marginTop: 20 },
  placeholder: { marginTop: 15, width: 235 },
  filters: { paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }
});
