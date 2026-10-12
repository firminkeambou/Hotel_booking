import React, { useCallback, useEffect } from 'react';
import CustomSafeArea from '@/components/safe-area-context';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useRouter, Stack, useNavigation } from 'expo-router';
//import { BackHandler, Alert, NativeEventSubscription } from 'react-native';

//import { IUser } from '@/interfaces';
//import { useLocalSession } from '@/hooks/user-session-hook';
import FlexBox from '@/components/flexbox';
import CustomText from '@/components/custom-text';
import CustomButton from '@/components/custom-button';
import LoadingModal from '@/components/modal-spinner';
import { logoutUser, updateUserProfilePicture } from '@/services/users';
import Toast from 'react-native-toast-message';
import { useUsersStore } from '@/store-zustand/users-store';
import TabTitle from '@/components/tab-title';
import { formatter } from '@/helpers/helpers';
import { ProgressiveImage } from '@/components/image-progressive-loading';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

type Props = {};

const Profile = (props: Props) => {
  //const { data, loading, error } = useLocalSession<Partial<IUser>>();
  //const user = useUsersStore((state) => state.user);
  //const isLoggedIn = useUsersStore((state) => state.isLoggedIn);
  const [image, setImage] = React.useState<string | null>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);

  const { user, isLoggedIn, logout, setUser } = useUsersStore();
  const [loggingOut, setLoggingOut] = React.useState<boolean>(false);

  const router = useRouter();

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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.',
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // 👇 Masque l'erreur TypeScript mais envoie les propriétés au moteur Android sous-jacent
      /* ...({
        options: {
          colors: {
            cropToolbarColor: '#212121',
            cropToolbarActionTextColor: '#ffffff',
            cropToolbarIconColor: '#ffffff',
          },
        },
      } as any), */
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onUploadProfilePicture = async () => {
    try {
      setLoading(true);
      const response: any = await updateUserProfilePicture(user!.id, image!);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Profile picture updated successfully',
        });
        setUser({ ...user, profile_picture: response.data! } as any);
        setImage(null);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error uploading profile picture',
        text2: (error as Error).message,
      });
    }
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
              <ProgressiveImage
                uri={image || user?.profile_picture!}
                width={100}
                height={100}
                borderRadius={50}
              />
              {/* <Image
                source={{ uri: user?.profile_picture }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              /> */}
              {!image && (
                <CustomButton
                  mode="outlined"
                  buttonColor="white"
                  onPress={pickImage}
                >
                  <CustomText
                    value="Change Profile Picture"
                    fontWeight="bold"
                  />
                </CustomButton>
              )}
              {image && (
                <FlexBox flexDirection="row" gap={20}>
                  <Button
                    onPress={onUploadProfilePicture}
                    mode="contained"
                    style={{ borderRadius: 10 }}
                  >
                    Upload
                  </Button>
                  <Button
                    style={{ borderRadius: 10 }}
                    mode="outlined"
                    onPress={() => setImage(null)}
                  >
                    Cancel
                  </Button>
                </FlexBox>
              )}
            </FlexBox>
            <FlexBox gap={15} paddingVertical={20}>
              {renderUserPropertyValue('Name', user?.name || '')}
              {renderUserPropertyValue('Email', user?.email || '')}
              {renderUserPropertyValue('Role', user?.role || '')}
              {renderUserPropertyValue(
                'Account Created At',
                //new Date(user?.created_at || '').toLocaleDateString(),
                user?.created_at
                  ? formatter.format(new Date(user?.created_at || ''))
                  : '',
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
