import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Image, StyleSheet, View, FlatList } from 'react-native';
import { ActionButton, Container, CustomText, Touchable, SafeArea } from 'components';
import theme from 'components/theme/theme';
import { ICONN_INVOICE, ICONN_PETRO_MINIMAL, ICONN_NO_RESULTS, ICONN_SEVEN_MINIMAL } from 'assets/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { invoicingServices } from 'services';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from 'navigation/types';
import InvoicingHelpModal from 'screens/home/InvoicingHelpModal';
import SendInvoiceModal from 'screens/home/SendInvoiceModal';
import EstablishmentModal, { Establishment } from 'screens/home/EstablishmentModal';
import AmmountModal, { Ammount } from 'screens/home/AmmountModal';
import DateModal, { Period } from 'screens/home/DateModal';
import RangeModal from 'screens/home/RangeModal';
import MultipleFilterModal from 'screens/home/MultipleFilterModal';
import { useLoading } from 'context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { InvoiceInterface, useAppSelector, RootState } from 'rtk';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface EstablishmentResult {
  establishment_id: number;
  description: string;
}
interface Result {
  rfc?: string;
  invoice_uuid: string;
  emission_date: string;
  total: string;
  Establishment: EstablishmentResult;
}

interface FilterChipProps {
  name: string;
  label: string;
  onPress: () => void;
  onReset: () => void;
  highlight: boolean;
}

const FilterChip = ({ highlight = false, label, onPress, onReset }: FilterChipProps) => {
  return (
    <View
      style={[
        { backgroundColor: '#D1D1D3', borderRadius: 12, padding: 9, marginLeft: 10, flexDirection: 'row', justifyContent: 'center' },
        highlight && { backgroundColor: theme.fontColor.light_green }
      ]}
    >
      <Touchable onPress={onPress}>
        <CustomText textColor={highlight ? 'white' : 'black'} alignSelf="center" text={label} />
      </Touchable>
      {highlight && (
        <Touchable onPress={onReset}>
          <View style={{ marginLeft: 5 }}>
            <Entypo name="cross" size={20} color={theme.brandColor.iconn_white} />
          </View>
        </Touchable>
      )}
    </View>
  );
};

const DateSeparator = ({ date }: { date: string }) => {
  return (
    <View style={{ marginTop: 10, marginLeft: 15 }}>
      <CustomText text={date} textColor={theme.fontColor.grey} fontBold />
    </View>
  );
};

export const InvoiceItem = ({ helpPointer = false, hiddenPointer, invoice }: { helpPointer?: boolean; hiddenPointer?: boolean; invoice: Result }) => {
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
        <Image source={invoice?.Establishment?.establishment_id === 1 ? ICONN_PETRO_MINIMAL : ICONN_SEVEN_MINIMAL} />
      </View>
      <View>
        <CustomText text={invoice.rfc ?? 'RAPA880105P33'} fontBold />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CustomText text="Total: " />
        <CustomText text={invoice.total} textColor={theme.fontColor.light_green} fontBold />
      </View>
      {helpPointer && (
        <View style={{ position: 'absolute', right: 20, top: 60 }}>
          <FontAwesome5 name="hand-point-up" size={60} />
        </View>
      )}
    </View>
  );
};

const testUserId = 'bV2anO5OnIgOy7tE0gtZlyVPqHF2';

const Results = ({ handleSend, results }: { handleSend: () => void; results: Result[] }) => {
  let row: Array<Swipeable | null> = [];
  let prevOpenedRow;

  /**
   *
   */
  const renderItem = ({ item, index }, onPreview, onSend) => {
    //
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onPreview, onSend) => {
      const itemStyle = { height: '100%', display: 'flex', justifyContent: 'center', paddingHorizontal: 30, alignItems: 'center' };
      return (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10
          }}
          key={index}
        >
          <Touchable onPress={onPreview}>
            <View style={[{ backgroundColor: '#808386' }, itemStyle]}>
              <Feather name="eye" size={30} color={theme.brandColor.iconn_white} />
              <CustomText text="Ver" textColor={'white'} fontBold />
            </View>
          </Touchable>
          <Touchable onPress={onSend}>
            <View style={[{ backgroundColor: '#406BA3' }, itemStyle]}>
              <Feather name="send" size={30} color={theme.brandColor.iconn_white} />
              <CustomText text="Enviar" textColor={'white'} fontBold />
            </View>
          </Touchable>
        </View>
      );
    };

    return (
      <Swipeable
        key={index}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onPreview, onSend)}
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <InvoiceItem invoice={item} />
      </Swipeable>
    );
  };

  return (
    <View>
      {results.length === 0 ? (
        <Container style={styles.empty}>
          <Container center style={styles.content}>
            <Container center>
              <Image source={ICONN_NO_RESULTS} />
            </Container>
            <Container style={[styles.title, { maxWidth: 196 }]}>
              <CustomText
                textAlign="center"
                text="NO TIENES FACTURAS QUE COINCIDAN CON TU BÚSQUEDA"
                alignSelf="center"
                typography="h3"
                fontBold
                fontSize={12}
              />
            </Container>
            <Container style={styles.placeholder}>
              <CustomText
                fontSize={12}
                textAlign="center"
                alignSelf="center"
                textColor={theme.brandColor.iconn_grey}
                text="Intenta con otros filtros"
                typography="h3"
              />
            </Container>
          </Container>
        </Container>
      ) : (
        <FlatList
          data={results}
          renderItem={v =>
            renderItem(
              v,
              () => {
                console.log('open preview modal', v);
              },
              () => {
                handleSend();
              }
            )
          }
          keyExtractor={(item, index) => {
            return `${item.rfc}_${index}`;
          }}
        />
      )}
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

interface BodyParams {
  userId: string;
  dateStart?: string;
  dateEnd?: string;
  thisMonth?: boolean;
  thisWeek?: boolean;
  yesterday?: boolean;
  ammount?: Ammount;
  establishment?: number;
}

enum InvoiceScreenMode {
  EMPTY,
  FILLED
}

const InvoiceScreen: React.FC = () => {
  const [results, setResults] = useState<null | Result[]>(null);
  const [supporting, setSupporting] = useState(false);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<Filter | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [ammmount, setAmmount] = useState<Ammount | null>(null);
  const [date, setDate] = useState<Period | null>(null);
  const [visible, setVisible] = useState(false);

  const [query, setQuery] = useState<BodyParams>({ userId: testUserId });

  const loader = useLoading();

  useEffect(() => {
    setQuery(current => {
      if (establishment) {
        return { ...current, establishment: establishment.id } as BodyParams;
      }

      const updated = { ...current } as BodyParams;

      delete updated.establishment;

      return updated;
    });
  }, [establishment]);

  useEffect(() => {
    setQuery(current => {
      if (ammmount) {
        return { ...current, ammount: { min: ammmount.min, max: ammmount.max } } as BodyParams;
      }

      const updated = { ...current } as BodyParams;

      delete updated.ammount;

      return updated;
    });
  }, [ammmount]);

  useEffect(() => {
    setQuery(current => {
      let dateFilter = {};

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
        return { ...current, ...dateFilter };
      } else {
        const updated = { ...current } as BodyParams;

        delete updated.yesterday;
        delete updated.dateStart;
        delete updated.dateEnd;
        delete updated.thisMonth;
        delete updated.thisWeek;

        return updated;
      }
    });
  }, [date]);

  useEffect(() => {
    (async () => {
      try {
        loader.show();

        const response = await invoicingServices.getInvoices(1, 10, query);

        if (response?.responseCode === 200) {
          const { data } = response;

          if (data === null) {
            setResults([]);
          } else {
            const { rows } = data;
            setResults(rows);
          }
        }
      } catch (e) {
      } finally {
        loader.hide();
      }
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
        {results === null ? (
          <Empty />
        ) : (
          <>
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
                  onReset={() => {
                    setDate(null);
                  }}
                />
                <FilterChip
                  highlight={!!establishment}
                  label={establishment ? (establishment.name as string) : 'Establecimiento'}
                  name="date"
                  onPress={() => {
                    setFilter(Filter.STORE);
                  }}
                  onReset={() => {
                    setEstablishment(null);
                  }}
                />
                <FilterChip
                  highlight={!!ammmount}
                  label={ammmount ? (ammmount.label as string) : 'Monto'}
                  name="date"
                  onPress={() => {
                    setFilter(Filter.AMMOUNT);
                  }}
                  onReset={() => {
                    setAmmount(null);
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
            <Results
              results={results}
              handleSend={() => {
                setSending(true);
              }}
            />
          </>
        )}

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
