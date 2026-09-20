import React from 'react';

import { View, StyleSheet, Text } from 'react-native';
type Props = {};

const Report = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>report</Text>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
