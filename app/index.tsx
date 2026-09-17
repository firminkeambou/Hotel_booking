import { useEffect, useState } from 'react';
//import { Text, View } from 'react-native';
//import { Button, TextInput } from 'react-native-paper';
//import CustomButton from '../components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { useRouter, Href } from 'expo-router';
import { useUsersStore } from '@/store/users-store';

import { getLoggedInUser } from '@/services/users';
import { lookupKey } from '@/helpers/helpers';

export default function Index() {
  const setUser = useUsersStore((state) => state.setUser);
  const router = useRouter();

  const checkSession = async () => {
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
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <FlexBox
      flex={1}
      justifyContent="center"
      gap={20}
      padding={20}
      alignItems="center"
    >
      <CustomText value="Loading..." fontWeight="bold" />
    </FlexBox>
  );
}
