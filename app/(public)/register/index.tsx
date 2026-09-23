import React from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import FlexBox from '@/components/flexbox';
import { PRIMARY_COLOR } from '@/constants';
import CustomText from '@/components/custom-text';
import RegisterForm from './_components/register-form';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSafeArea from '@/components/safe-area-context';
//import { SafeAreaContext } from 'react-native-safe-area-context';

type Props = {};

const RegisterScreen = (props: Props) => {
  return (
    <CustomSafeArea>
      <KeyboardAvoidingView
        keyboardVerticalOffset={30}
        behavior="padding"
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
        >
          <FlexBox backgroundColor={PRIMARY_COLOR} flex={1}>
            <FlexBox gap={5} paddingHorizontal={40} paddingVertical={50}>
              <CustomText
                value="Create Account"
                fontSize={35}
                fontWeight="bold"
                fontColor="#c3ba05"
                textAlign="center"
              />
              <CustomText
                value="Please fill the form to continue"
                fontSize={16}
                fontWeight="600"
                fontColor="#ffffff"
                textAlign="center"
              />
            </FlexBox>
            <FlexBox
              style={{
                borderTopLeftRadius: 50,
              }}
              flex={1}
              backgroundColor="#ffffff"
              paddingHorizontal={30}
              paddingVertical={20}
            >
              <RegisterForm />
            </FlexBox>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
