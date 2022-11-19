import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'components/theme/theme';

export default function ConnectionItem() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            style={{ textAlign: 'center' }}
            size={24}
            name="wifi-remove"
            color={theme.fontColor.dark_orange}
          />
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
