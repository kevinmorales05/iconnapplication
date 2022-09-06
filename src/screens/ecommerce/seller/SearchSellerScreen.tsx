import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TextInput, StyleSheet } from 'react-native';
import { CustomText, Touchable, Container } from 'components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { ICONN_PIN_LOCATION } from 'assets/images';
import items from 'assets/files/sellers.json';

interface Seller {
  id: number;
  title: string;
}

interface SellerInterface {
  '# Division': number | string;
  Division: string;
  '# Plaza': number | string;
  Plaza: string;
  Mercado: number | string;
  Campo: number | string;
  '# Tienda': number | string;
  Tienda: string | any[];
  'Fecha Apertura': string;
  'Formato Tienda': string;
  Latitud: number | string;
  Longitud: number | string;
  'Google Maps': string;
  'Código postal': number | string;
  Domicilio: string;
  'Estación de servicio': string;
  ATM: string;
  Slurpee: string;
  'Bake in Store': string;
  'Pizza / Turbochef': string;
}

const SearchSellerScreen = () => {
  const [value, onChangeText] = useState('');
  const [current, setCurrent] = useState<Seller | null>(null);
  useEffect(() => {
    const item: SellerInterface | undefined = items.find(item => {
      return item['# Tienda'] === 2241;
    });
  }, [items]);

  const sellers = [
    {
      id: 1,
      title: '7-Eleven Tecnológico'
    },
    {
      id: 2,
      title: '7-Eleven Tecnológico'
    },
    {
      id: 3,
      title: '7-Eleven Tecnológico'
    }
  ] as Seller[];

  const SellerItem = ({ selected, onPress, seller }: { selected: boolean; onPress: () => void; seller: Seller }) => {
    const { title } = seller;

    return (
      <Touchable onPress={onPress}>
        <Container
          flex
          row
          alignment="start"
          style={[
            styles.sellerItem,
            selected && {
              backgroundColor: '#DBE6E3',
              borderColor: theme.brandColor.iconn_green_original
            }
          ]}
        >
          <Container style={styles.wrapper}>
            <Container style={styles.slot}>{selected && <Container style={styles.circle} />}</Container>
          </Container>
          <Container style={{ flexDirection: 'row' }}>
            <Container>
              <Container style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: '82%' }}>
                <Container>
                  <CustomText fontSize={16} text={title} fontBold />
                </Container>
                <Container>
                  <CustomText fontSize={16} text={'220 m'} fontBold />
                </Container>
              </Container>
              <Container style={{ marginVertical: 5 }}>
                <CustomText fontSize={16} text={'64860, Monterrey, N.L.'} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Touchable>
    );
  };

  return (
    <Container style={{ backgroundColor: '#F1F1F1', margin: 10 }}>
      <Container
        style={{
          backgroundColor: 'white',
          height: 40,
          margin: 12,
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          flexDirection: 'row',
          borderColor: '#dadadb',
          alignContent: 'center',
          minHeight: 50
        }}
      >
        <AntDesign name="search1" size={24} color={theme.brandColor.iconn_green_original} />
        <TextInput
          multiline
          onChangeText={text => {
            onChangeText(text.toLowerCase());
          }}
          value={value}
          style={{ marginLeft: 10, width: '90%' }}
        />
      </Container>
      <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
        <Image source={ICONN_PIN_LOCATION} />
        <Container style={{ marginLeft: 10 }}>
          <CustomText text={'Usar mi ubicación actual'} fontSize={16} fontBold underline textColor={theme.brandColor.iconn_green_original} />
        </Container>
      </Container>
      <ScrollView style={{ height: '100%' }}>
        {sellers.map((seller, index) => {
          return (
            <SellerItem
              key={index}
              seller={seller}
              selected={seller.id === current?.id}
              onPress={() => {
                setCurrent(seller);
              }}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  sellerItem: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: theme.brandColor.iconn_med_grey,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.brandColor.iconn_white
  },
  wrapper: { display: 'flex', justifyContent: 'center', width: 65, alignItems: 'center' },
  slot: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.brandColor.iconn_green_original,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: { height: 20, width: 20, backgroundColor: theme.brandColor.iconn_green_original, borderRadius: 20 }
});

export default SearchSellerScreen;
