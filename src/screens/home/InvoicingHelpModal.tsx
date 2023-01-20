import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { ActionButton, Container, CustomModal, CustomText, Touchable } from 'components/atoms';
import theme from 'components/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InvoiceItem } from 'screens/home/invoicing/InvoiceHistory/InvoiceHistory';
import { InvoiceInterface } from 'rtk';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from 'utils/scaleMetrics';

const DATA = [
  {
    rfc: 'RAPA880105P32',
    zipCode: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    taxRegime: 'First Item'
  }
] as InvoiceInterface[];

const Results = ({ handleSend }: { handleSend: () => void }) => {
  const [listData, setListData] = useState(DATA);
  let row: Array<Swipeable | null> = [];
  let prevOpenedRow;

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (row.length > 0) {
      setInterval(async function () {
        if (row[0]) {
          row[0].openRight();
          await timeout(1000);
          row[0].close();
        }
      }, 2000);
    }
  }, [row]);

  /**
   *
   */
  const renderItem = ({ item, index }, onPreview, onSend) => {
    //
    const closeRow = index => {
      console.log('closerow');
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
        >
          <Touchable onPress={onPreview}>
            <View style={[{ backgroundColor: '#808386' }, itemStyle]}>
              <Feather name="eye" size={moderateScale(22)} color={theme.brandColor.iconn_white} />
              <CustomText typography="h6" text="Ver" textColor={'white'} fontBold />
            </View>
          </Touchable>
          <Touchable onPress={onSend}>
            <View style={[{ backgroundColor: '#406BA3' }, itemStyle]}>
              <Feather name="send" size={moderateScale(22)} color={theme.brandColor.iconn_white} />
              <CustomText typography="h6" text="Enviar" textColor={'white'} fontBold />
            </View>
          </Touchable>
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onPreview, onSend)}
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <View>
          <InvoiceItem invoice={item} helpPointer={true} />
        </View>
      </Swipeable>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };

  return (
    <View style={{ backgroundColor: '#F1F1F1', marginVertical: 10 }}>
      <FlatList
        style={{ backgroundColor: '#F1F1F1', marginVertical: 30 }}
        data={listData}
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
        keyExtractor={item => item.rfc}
      />
    </View>
  );
};
interface InvoiceModalProps {
  visible: boolean;
  onPressOut: () => void;
}

const InvoicingHelpModal: React.FC<InvoiceModalProps> = ({ visible, onPressOut }) => {
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
                <CustomText textColor={theme.brandColor.iconn_dark_grey} text="Ayuda de facturación" typography="h3" fontBold />
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
              <CustomText typography="h5" text="Puedes consultar tus facturas hasta 3 meses atrás." />
              <CustomText typography="h5" text="Puedes ver directamente cada factura o enviarla a varias direcciones de correo, deslizando hacia la izquierda en cada factura:" />
              <Results handleSend={() => {}} />
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

export default InvoicingHelpModal;
