import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import CustomButton from '../components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { useRouter } from 'expo-router';
export default function Index() {
  const router = useRouter();
  const checkSession = () => {
    // Check if the user is logged in
    const isLoggedIn = false; // Replace with your actual login check logic
    setTimeout(() => {
      router.replace('/(public)/welcome'); // Navigate to the home screen if logged in
    }, 2000); // Simulate a delay for checking session
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
