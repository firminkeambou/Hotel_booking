import React, { useCallback, useEffect } from 'react';
import CustomSafeArea from '@/helpers/safe-area-context';
import { View, StyleSheet } from 'react-native';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { BackHandler, Alert, NativeEventSubscription } from 'react-native';

//import { IUser } from '@/interfaces';
//import { useLocalSession } from '@/hooks/user-session-hook';
import FlexBox from '@/components/flexbox';
import CustomText from '@/components/custom-text';
import CustomButton from '@/components/custom-button';
import LoadingModal from '@/components/modal-spinner';
import { logoutUser } from '@/services/users';
import Toast from 'react-native-toast-message';
import { useUsersStore } from '@/store/users-store';

type Props = {};

const CustomerHomeScreen = (props: Props) => {
  //const { data, loading, error } = useLocalSession<Partial<IUser>>();
  //const user = useUsersStore((state) => state.user);
  //const isLoggedIn = useUsersStore((state) => state.isLoggedIn);
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useUsersStore();
  const [loggingOut, setLoggingOut] = React.useState<boolean>(false);
  const router = useRouter();

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
  //console.log('useLocalSession Data', data);
  console.log('Zustand store  Data', user, '-----', isLoggedIn);
  const onLogout = async () => {
    setLoggingOut(true);
    const { success, message } = await logoutUser();
    if (success) {
      Toast.show({
        type: 'success',
        text1: message,
      });
      logout();
      router.replace('/(public)/login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error logging out',
        text2: message,
      });
      setLoggingOut(false);
    }
    setLoggingOut(false);
  };

  return (
    <CustomSafeArea>
      <Stack.Screen
        options={{
          gestureEnabled: false, // Forces iOS native thread to ignore the back-swipe
        }}
      />
      <FlexBox
        flex={1}
        gap={15}
        paddingHorizontal={20}
        justifyContent={'center'}
      >
        {!isLoggedIn && (
          <CustomText
            value={'Not authorized or not logged in...'}
            textAlign="center"
          />
        )}
        {/* {error && <CustomText value={`Error: ${error}`} />} */}
        {isLoggedIn && (
          <>
            <CustomText value={`Welcome, ${user?.name}`} textAlign="center" />
            <CustomText value={`Email, ${user?.email}`} textAlign="center" />

            <CustomButton
              disabled={loggingOut}
              onPress={onLogout}
              mode="contained"
            >
              Logout
            </CustomButton>
            <LoadingModal visible={loggingOut} message="Logging out..." />
          </>
        )}
      </FlexBox>
    </CustomSafeArea>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
