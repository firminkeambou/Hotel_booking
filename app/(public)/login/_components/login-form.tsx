import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
//import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
////import { Link } from 'expo-router';
import { Dropdown } from 'react-native-paper-dropdown';
import CustomButton from '@/components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { validEmailFormat, validatePasswordStrength } from '@/helpers/helpers';
import { PasswordInput } from '@/components/password-input';
import { EmailInput } from '@/components/email-input';
import { DropDownInput } from '@/components/dropdown-input';
import { RegisterIcon } from '@/components/register-button';
import { useRouter, type Href } from 'expo-router';
import { loginUser } from '@/services/users';
import Toast from 'react-native-toast-message';
import { IUser } from '@/interfaces';
import LoadingModal from '@/components/modal-spinner';
// Import a store from zustand it's like context API, but mor powerful and light
import { useUsersStore } from '@/store/users-store'; //  a store created using zustand
export interface FormValues {
  // Add your other form fields here (e.g., email: string;)

  email: string;
  role?: string;
  password: string;
}
export default function LoginForm() {
  const [connecting, setConnecting] = useState<boolean>(false);
  //const [user, setUser] = useState<Partial<IUser>>({});
  const setUser = useUsersStore((state) => state.setUser);
  //console.log('userFRRR:::::::::::', user);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      //role:''
      password: '',
    },
  });
  const onSubmit = async (data: any) => {
    try {
      setConnecting(true);
      const response = await loginUser(data);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Login successful',
        });
        setUser(response.data);

        const routes = {
          customer: '/(private)/customer/home',
          owner: '/(private)/owner/home',
          admin: '/(private)/admin/home',
        };
        //router.push('/(private)/customer/home');
        const lookupKey = response.data.role.toLowerCase().trim();
        const route = routes[lookupKey as keyof typeof routes]; //response.data.role
        ///console.log('routeeeeee', route);
        if (route) {
          router.push(route as Href);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: (error as Error).message,
      });
    } finally {
      setConnecting(false);
    }
  };

  return (
    <FlexBox gap={20} flex={1} backgroundColor={'white'}>
      <FlexBox gap={20}>
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
        {/*       <DropDownInput
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
 */}
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

        <CustomButton
          disabled={connecting}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
        >
          Login
        </CustomButton>
        <LoadingModal visible={connecting} message="Connecting..." />
      </FlexBox>
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
