import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
//import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
////import { Link } from 'expo-router';
import { Dropdown } from 'react-native-paper-dropdown';
import CustomButton from '@/components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { USER_ROLES } from '@/constants';
import { validEmailFormat, validatePasswordStrength } from '@/helpers/helpers';
import { PasswordInput } from '@/components/password-input';
import { EmailInput } from '@/components/email-input';
import { DropDownInput } from '@/components/dropdown-input';
import { RegisterIcon } from '@/components/register-button';
import { useRouter } from 'expo-router';
export interface FormValues {
  // Add your other form fields here (e.g., email: string;)

  email: string;
  role: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      role: '',
      password: '',
    },
  });
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <FlexBox gap={20} flex={1} backgroundColor={'white'}>
      <EmailInput
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'email is required',
          },
          validate: {
            // Rule 1: Regular Expression format validation
            validEmailFormat /* : (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              'Please enter a valid email address', */,
          },
        }}
      />
      <DropDownInput
        name="role"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'role is required',
          },
        }}
        options={USER_ROLES}
      />

      <PasswordInput
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: ' password is required',
          },
          validate: {
            passWordStrength: validatePasswordStrength<FormValues>(),
          },
        }}
        placeholder="password"
      />

      <CustomButton onPress={handleSubmit(onSubmit)} mode="contained">
        Login
      </CustomButton>
      <FlexBox
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        paddingVertical={20}
        gap={20}
      >
        <CustomText fontWeight="bold" value="Don't have an account ?" />
        {/* <Link href="/register">
          <CustomText fontWeight="bold" value=" Register" fontColor="blue" />
        </Link> */}
        <TouchableOpacity
          onPress={() => router.push('/register')}
          //style={styles.iconContainer}
        >
          <RegisterIcon />
        </TouchableOpacity>
      </FlexBox>
    </FlexBox>
  );
}
