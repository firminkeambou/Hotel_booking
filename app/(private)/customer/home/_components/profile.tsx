import React, { useCallback, useEffect } from 'react';
import CustomSafeArea from '@/helpers/safe-area-context';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
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
import { useUsersStore } from '@/store-zustand/users-store';
import TabTitle from '@/components/tab-title';
import { formatter } from '@/helpers/helpers';

type Props = {};

const Profile = (props: Props) => {
  //const { data, loading, error } = useLocalSession<Partial<IUser>>();
  //const user = useUsersStore((state) => state.user);
  //const isLoggedIn = useUsersStore((state) => state.isLoggedIn);
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useUsersStore();
  const [loggingOut, setLoggingOut] = React.useState<boolean>(false);
  const router = useRouter();

  /*  useEffect(() => {
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
  }, [navigation]); */ // Added navigation to dependency array to prevent stale closures

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
  const renderUserPropertyValue = (label: string, value: string) => {
    return (
      <FlexBox>
        <CustomText value={label} fontSize={14} fontWeight="bold" />
        <CustomText value={value} fontSize={16} />
      </FlexBox>
    );
  };
  return (
    <CustomSafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen
          options={{
            gestureEnabled: false, // Forces iOS native thread to ignore the back-swipe
          }}
        />
        <FlexBox padding={20} gap={35} flex={1}>
          <TabTitle title="Profile" caption="Manage your account" />

          <FlexBox
            padding={20}
            style={{
              borderWidth: 1,
              borderColor: '#a8a8a8',
              borderRadius: 5,
            }}
          >
            <FlexBox alignItems="center" gap={15}>
              <Image
                source={{ uri: user?.profile_picture }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <CustomButton mode="outlined" buttonColor="white">
                <CustomText value="Change Profile Picture" fontWeight="bold" />
              </CustomButton>
            </FlexBox>
            <FlexBox gap={15} paddingVertical={20}>
              {renderUserPropertyValue('Name', user?.name || '')}
              {renderUserPropertyValue('Email', user?.email || '')}
              {renderUserPropertyValue('Role', user?.role || '')}
              {renderUserPropertyValue(
                'Account Created At',
                //new Date(user?.created_at || '').toLocaleDateString(),
                formatter.format(new Date(user?.created_at || '')),
              )}
            </FlexBox>
          </FlexBox>
          <CustomButton onPress={onLogout}>Logout</CustomButton>
        </FlexBox>
      </ScrollView>
    </CustomSafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
