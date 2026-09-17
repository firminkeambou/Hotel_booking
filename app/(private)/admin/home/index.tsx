import React, { useEffect } from 'react';
import CustomSafeArea from '@/helpers/safe-area-context';
import { View, StyleSheet, Text, NativeEventSubscription } from 'react-native';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { BackHandler, Alert, Platform } from 'react-native';

type Props = {};

const AdminHomeScreen = (props: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    // Check if navigation is focused to prevent unexpected triggers on other screens
    const handleBackPress = (): boolean => {
      if (navigation.isFocused()) {
        Alert.alert('Are you sure you want to exit the app?', '', [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevents the default back action
      }
      return false; // Allows normal back navigation on other screens
    };

    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [navigation]); // Added navigation to dependency array to prevent stale closures
  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            gestureEnabled: false, // Forces iOS native thread to ignore the back-swipe
          }}
        />
        <Text>AdminHomeScreen</Text>
      </View>
    </CustomSafeArea>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
