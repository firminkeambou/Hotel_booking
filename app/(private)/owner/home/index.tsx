import CustomSafeArea from '@/helpers/safe-area-context';
import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

type Props = {};

const OwnerHomeScreen = (props: Props) => {
  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Text>OwnerHomeScreen</Text>
      </View>
    </CustomSafeArea>
  );
};

export default OwnerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
