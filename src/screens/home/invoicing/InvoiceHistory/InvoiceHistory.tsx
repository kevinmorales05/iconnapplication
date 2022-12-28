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
import AmountModal, { Amount } from 'screens/home/AmountModal';
import DateModal, { Period } from 'screens/home/DateModal';
import RangeModal from 'screens/home/RangeModal';
import MultipleFilterModal from 'screens/home/MultipleFilterModal';
import { useLoading } from 'context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useAppSelector, RootState, InvoiceGeneratedResponseInterface } from 'rtk';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { moderateScale, verticalScale } from 'utils/scaleMetrics';

interface EstablishmentResult {
  establishment_id: number;
  description: string;
}

interface InvoicingProfile {
  invoicing_profile_id: number;
  rfc: string;
}
export interface Result {
  rfc?: string;
  invoice_uuid: string;
  emission_date: string;
  total: string;
  Establishment: EstablishmentResult;
  Invoicing_Profile: InvoicingProfile;
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
  console.log("FECHA",date)
  return (
    <View style={{ marginTop: 10, marginLeft: 15 }}>
      <CustomText text={date} textColor={theme.fontColor.grey} fontBold />
    </View>
  );
};

export const InvoiceItem = ({
  helpPointer = false,
  invoice
}: {
  helpPointer?: boolean;
  invoice: Result;
}) => {
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
        <Image style={{ width: moderateScale(38), height: moderateScale(48) }} source={invoice?.Establishment?.establishment_id === 1 ? ICONN_PETRO_MINIMAL : ICONN_SEVEN_MINIMAL} />
      </View>
      <View>
        <CustomText text={invoice?.Invoicing_Profile?.rfc ? invoice?.Invoicing_Profile?.rfc : ''} fontBold />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CustomText text="Total: " />
        <CustomText text={invoice?.total ? invoice?.total.match(/^-?\d+(?:\.\d{0,2})?/)[0] : 0} textColor={theme.fontColor.light_green} fontBold />
      </View>
      {helpPointer && (
        <View style={{ position: 'absolute', right: moderateScale(10), top: verticalScale(40) }}>
          <FontAwesome5 name="hand-point-up" size={moderateScale(40)} />
        </View>
      )}
    </View>
  );
};

const ItemWrapper = ({ children, results, invoice }: { children: React.ReactChild; results?: Result[]; invoice: Result }) => {
  const [separator, setSeparator] = useState(false);

  useEffect(() => {
    if (!results) return;

    const dayCoincidences = results.filter(result => {
      return moment(result.emission_date).isSame(moment(invoice.emission_date), 'day');
    });

    let moments = dayCoincidences.map(d => {
      return moment(d.emission_date);
    });

    const minDate = moment.min(moments);

    setSeparator(minDate.isSame(moment(invoice.emission_date)));
  }, [invoice, results]);
  return (
    <>
      {separator && <DateSeparator date={moment(invoice.emission_date).format('MMMM DD, YYYY')} />}
      {children}
    </>
  );
};

const Results = ({ handleSend, results }: { handleSend: (item: Result) => void; results: Result[] }) => {
  let row: Array<Swipeable | null> = [];
  let prevOpenedRow;
  const { navigate } = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  /**
   *
   */
  const renderItem = ({ item, index }, onPreview, onSend) => {
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
              <Feather name="eye" size={moderateScale(22)} color={theme.brandColor.iconn_white} />
              <CustomText text="Ver" textColor={'white'} fontBold />
            </View>
          </Touchable>
          <Touchable onPress={onSend}>
            <View style={[{ backgroundColor: '#406BA3' }, itemStyle]}>
              <Feather name="send" size={moderateScale(22)} color={theme.brandColor.iconn_white} />
              <CustomText text="Enviar" textColor={'white'} fontBold />
            </View>
          </Touchable>
        </View>
      );
    };

    return (
      <ItemWrapper results={results} invoice={item}>
        <Swipeable
          key={index}
          renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onPreview, onSend)}
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}
          rightOpenValue={-100}
        >
          <InvoiceItem results={results} invoice={item} />
        </Swipeable>
      </ItemWrapper>
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
          style={{ maxHeight: '100%' }}
          data={results}
          renderItem={v =>
            renderItem(
              v,
              () => {
                const { item } = v;

                const invoiceGenerated: InvoiceGeneratedResponseInterface = {
                  uuidInvoice: item.invoice_uuid,
                  emissionDate: item.emission_date,
                  total: item.total,
                  establishment: String(item.Establishment.establishment_id)
                };

                navigate(item.Establishment.establishment_id === 1 ? 'ViewInvoiceGeneratedPetro' : 'ViewInvoiceGeneratedSeven', {
                  invoiceGenerated
                });
              },
              () => {
                const { item, index } = v;
                handleSend(item);
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
  amount?: Amount;
  establishment?: number;
}

enum InvoiceScreenMode {
  EMPTY,
  FILLED
}

const InvoiceScreen: React.FC = () => {
  const [results, setResults] = useState<null | Result[]>(null);
  const [supporting, setSupporting] = useState(false);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [selected, setSelected] = useState<Result | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [amount, setAmount] = useState<Amount | null>(null);
  const [date, setDate] = useState<Period | null>(null);
  const [visible, setVisible] = useState(false);

  // const [query, setQuery] = useState<BodyParams>({ userId: testUserId });
  const [query, setQuery] = useState<BodyParams>();

  useEffect(() => {
    setQuery(current => {
      return { ...current, userId: user.userId } as BodyParams;
    });
  }, [user]);

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
      if (amount) {
        return { ...current, amount: { min: amount.min, max: amount.max } } as BodyParams;
      }

      const updated = { ...current } as BodyParams;

      delete updated.amount;

      return updated;
    });
  }, [amount]);

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

            const sortedArray: Result[] = rows.sort((a: Result, b: Result) => {
              return moment(a.emission_date).diff(b.emission_date);
            });

            setResults(sortedArray);
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

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      setSeconds(current => {
        if (current > 0) {
          return current - 1;
        }
        return current;
      });
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

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
                  highlight={!!amount}
                  label={amount ? (amount.label as string) : 'Monto'}
                  name="date"
                  onPress={() => {
                    setFilter(Filter.AMMOUNT);
                  }}
                  onReset={() => {
                    setAmount(null);
                  }}
                />
                <View style={{ marginHorizontal: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Touchable
                    onPress={() => {
                      setEstablishment(null);
                      setAmount(null);
                      setDate(null);
                    }}
                  >
                    <CustomText text="Limpiar todo" textColor={theme.fontColor.light_green} underline fontBold />
                  </Touchable>
                </View>
              </ScrollView>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
              <Results
                results={results}
                handleSend={(invoice: Result) => {
                  setSelected(invoice);
                }}
              />
            </ScrollView>
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
            visible={!!selected}
            invoice={selected}
            onPressOut={() => {
              setSelected(null);
            }}
            seconds={seconds}
            startCountdown={initial => {
              setSeconds(initial);
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
          <AmountModal
            ammount={amount}
            handleAmount={current => {
              setAmount(current);
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
            ammount={amount}
            handleAmount={current => {
              setAmount(current);
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
              setAmount(null);
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
  container: { flex: 1, backgroundColor: theme.brandColor.iconn_grey_background, height: '100%' },
  empty: { height: '100%', marginTop: 100 },
  content: {},
  title: { marginTop: 20 },
  placeholder: { marginTop: 15, width: 235 },
  filters: { paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }
});
