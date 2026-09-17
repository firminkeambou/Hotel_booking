import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
//import { Text, View } from 'react-native';
//import { Button, TextInput } from 'react-native-paper';
//import CustomButton from '../components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { useRouter, Href } from 'expo-router';
import { useUsersStore } from '@/store-zustand/users-store';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser } from '@/services/users';
import { lookupKey } from '@/helpers/helpers';
import { useCurrentProfile } from '@/hooks/react-query/users-hooks';

export default function Index() {
  const setUser = useUsersStore((state) => state.setUser);
  const { data, isLoading, isError } = useCurrentProfile(); // finalising implementation with react query
  const theme = useTheme();
  const router = useRouter();

  /* const checkSession = async () => {
    try {
      const response = await getLoggedInUser();
      if (response.success) {
        setUser(response.data);
        const routes = {
          customer: '/(private)/customer/home',
          owner: '/(private)/owner/home',
          admin: '/(private)/admin/home',
        };
        //const lookupKey = response.data.role.toLowerCase().trim();
        console.log(
          'true lookupKey(response.data.role)',
          lookupKey(response.data.role),
        );
        const route =
          routes[lookupKey(response.data.role) as keyof typeof routes]; //response.data.role
        if (route) {
          router.push(route as Href);
        }
      } else {
        router.replace('/(public)/login');
      }
    } catch (error) {
      //console.log('fail catch lookupKey(response.data.role)');
      //console.log(error);
      router.replace('/(public)/login');
    }
  }; */

  // cleanest implementation of checkSession  after leveraging react query under the hood as Href
  /*   console.log('from the index file ----profileData', data);
  const checkSession = async () => {
    if (data) {
      setUser(data);
      const routes = {
        customer: '/(private)/customer/home',
        owner: '/(private)/owner/home',
        admin: '/(private)/admin/home',
      };
      //const lookupKey = response.data.role.toLowerCase().trim();
      console.log('true lookupKey(response.data.role)', lookupKey(data?.role));
      const route = routes[lookupKey(data?.role) as keyof typeof routes]; //response.data.role
      if (route) {
        router.push(route as Href);
      }
    } else {
      router.replace('/(public)/login');
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
 */
  useEffect(() => {
    // 1. 🛡️ Guard Rail: Wait until TanStack Query finishes fetching data
    if (isLoading) return;

    // 2. Handle Network or DB Failure State
    if (isError || !data) {
      router.replace('/(public)/login');
      return;
    }

    // 3. Success State: 'data' is now fully loaded and guaranteed to exist
    setUser(data); // If you still need it in global context/state

    const routes = {
      customer: '/(private)/customer/home',
      owner: '/(private)/owner/home',
      admin: '/(private)/admin/home',
    };

    const roleKey = lookupKey(data.role) as keyof typeof routes;
    const targetRoute = routes[roleKey];

    if (targetRoute) {
      router.replace(targetRoute as any); // Use replace to clear auth screens from history
    } else {
      router.replace('/(public)/login'); // Fallback if role is corrupt
    }
  }, [data, isLoading, isError, router]); // 💥 Re-run automatically the millisecond data changes

  return (
    <FlexBox
      flex={1}
      justifyContent="center"
      gap={20}
      padding={20}
      alignItems="center"
    >
      {/* <CustomText value="Authenticating..." fontWeight="bold" /> */}
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </FlexBox>
  );
}
