import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';
import { ICONN_NO_CONNECTION_2 } from 'assets/images';

export default function ConnectionItem() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.icon}>
            <Image
            source={ICONN_NO_CONNECTION_2}
            style={styles.image}/>
        </View>
        <Text style={styles.message}>
          No podemos cargar la información, revisa tu conexión e intenta mas
          tarde.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal:16,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal:40
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
  },
  image: {
    alignSelf:'center',
    width:24,
    height:24
  },
  subContainer: {
  }
});