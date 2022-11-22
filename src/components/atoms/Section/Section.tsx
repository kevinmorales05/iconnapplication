import React, { ReactChild } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionProps {
  label: string;
  children: ReactChild | ReactChild[];
}

const Section = (props: SectionProps) => {
  const { label, children } = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  label: { fontWeight: 'bold', marginTop: 20 }
});
