import React from 'react';

import { View, StyleSheet, Text } from 'react-native';
type Props = {};

const Bookings = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>bookings</Text>
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
