import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from 'components/theme/theme';
import { ConnectionItem } from 'components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ItemProps {
  type: string;
  address: string;
}
const Item = (props: ItemProps) => {
  const { type, address } = props;
  return (
    <TouchableOpacity style={styles.content}>
      <View style={styles.middle}>
        <Text numberOfLines={1}>{type}</Text>
        <Text numberOfLines={1} style={styles.secondary}>
          {address}
        </Text>
      </View>
      <View style={styles.end}>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const EmptyMessage = () => {
  return (
    <View style={emptyMessageStyles.container}>
      <View>
        <View style={emptyMessageStyles.icon}>
          <MaterialCommunityIcons
            style={{ textAlign: 'center' }}
            size={30}
            name="map-marker-outline"
            color={theme.brandColor.iconn_green_original}
          />
        </View>
        <Text style={emptyMessageStyles.message}>
          No tienes direcciones guardadas.
        </Text>
      </View>
    </View>
  );
};

const emptyMessageStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 24
  },
  icon: {
    marginBottom: 16
  },
  message: {
    width: 248,
    textAlign: 'center',
    fontSize: theme.fontSize.label,
    color: theme.fontColor.grey,
    lineHeight: 18
  }
});

const mockAddresses = [
  {
    type: 'Casa',
    address: 'Senda de Alegría 123, Villa las fuentes'
  },
  {
    type: 'Casa',
    address: 'Senda de Alegría 123, Villa las fuentes'
  }
];

export default function AddressItems() {
  const [items, setItems] = useState(mockAddresses);

  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View>
        {items.length > 0 ? (
          <EmptyMessage />
        ) : (
          <View style={styles.container}>
            {items.map(({ type, address }, index) => {
              return <Item key={index} type={type} address={address} />;
            })}
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);

                if (visible) {
                  setItems(mockAddresses);
                } else {
                  setItems([
                    ...items,
                    {
                      type: 'Casa',
                      address: 'Senda de Alegría 123, Villa las fuentes'
                    },
                    {
                      type: 'Casa',
                      address: 'Senda de Alegría 123, Villa las fuentes'
                    },
                    {
                      type: 'Casa',
                      address: 'Senda de Alegría 123, Villa las fuentes'
                    }
                  ]);
                }
              }}
            >
              <View style={styles.watchMore}>
                <Text style={styles.text}>
                  {visible ? 'VER MENOS' : 'VER TODAS'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  content: {
    paddingBottom: 16,
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.brandColor.iconn_med_grey
  },
  start: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middle: {
    flex: 4,
    justifyContent: 'center'
  },
  end: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  secondary: {
    marginTop: 7,
    fontSize: theme.fontSize.h6,
    color: 'darkgray'
  },
  watchMore: {
    paddingTop: 10,
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  text: {
    fontWeight: '800',
    fontSize: theme.fontSize.h4,
    color: theme.fontColor.link
  }
});
