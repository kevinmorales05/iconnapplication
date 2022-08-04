import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AnnounceItemProps {
  message: string | React.ReactNode;
  icon: React.ReactNode;
}

const AnnounceItem = (props: AnnounceItemProps) => {
  const { message, icon } = props;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.message}>{typeof message === 'string' ? <Text>{message}</Text> : message}</View>
      </View>
    </View>
  );
};

export default AnnounceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10
  },
  content: {
    backgroundColor: '#F3E2CB',
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F39124',
    minHeight: 52,
    width: 52
  },
  message: {
    maxWidth: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
    paddingRight: 10
  }
});
