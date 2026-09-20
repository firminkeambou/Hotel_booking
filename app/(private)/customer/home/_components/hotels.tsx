import React from 'react';

import { View, StyleSheet, Text } from 'react-native';
type Props = {};

const Hotels = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>hotels</Text>
    </View>
  );
};

export default Hotels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
