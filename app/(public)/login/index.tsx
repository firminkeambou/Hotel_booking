import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import FlexBox from '@/components/flexbox';
import { PRIMARY_COLOR } from '@/constants';
import CustomText from '@/components/custom-text';
import LoginForm from './_components/login-form';
import CustomSafeArea from '@/components/safe-area-context';

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
            <FlexBox gap={5} paddingHorizontal={40} paddingVertical={100}>
              <CustomText
                value="Welcome"
                fontSize={35}
                fontWeight="bold"
                fontColor="#c3ba05"
                textAlign="center"
              />
              <CustomText
                value="Please fill the form to login"
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
              paddingVertical={100}
            >
              <LoginForm />
            </FlexBox>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

export default RegisterScreen;
