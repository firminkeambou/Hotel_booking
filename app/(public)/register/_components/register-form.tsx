import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
//import { TextInput } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
//import { Link } from 'expo-router';
//import { Dropdown } from 'react-native-paper-dropdown';
import CustomButton from '@/components/custom-button';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { USER_ROLES } from '@/constants';
import {
  normaliseUnit,
  validEmailFormat,
  PasswordMatchValidator,
  validatePasswordStrength,
} from '@/helpers/helpers';
import { PasswordInput } from '@/components/password-input';
import { EmailInput } from '@/components/email-input';
import { GeneralInput } from '@/components/general-input';
import { DropDownInput } from '@/components/dropdown-input';
import { LoginIcon } from '@/components/login-button';

export interface FormValues {
  // Add your other form fields here (e.g., email: string;)
  name: string;
  email: string;
  role: string;
  password: string;
  confirmpassword: string;
}
export default function RegisterForm() {
  // const [showPassword, setShowPassword] = useState<Boolean>(false); // only  for password field, so should be move in its own component
  //const [confirmShowPassword, setConfirmShowPassword] =
  //useState<Boolean>(false); // only  for password field, so should be move in its own component
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
      confirmpassword: '',
    },
  });
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <FlexBox gap={20} flex={1} backgroundColor={'white'}>
      {/*       <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'name is required',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FlexBox gap={5}>
            <CustomText value="Name" fontSize={16} fontWeight="bold" />
            <TextInput
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              dense={Platform.OS === 'android'}
              style={{ height: normaliseUnit(44), paddingVertical: 0 }}
              error={!!errors.name}
            />
            {errors.name && (
              <CustomText value={errors.name?.message} fontColor="red" />
            )}
          </FlexBox>
        )}
        name="name"
      /> */}
      <GeneralInput
        name="name"
        placeholder="Name"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'name is required',
          },
        }}
      />
      {/*       <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'email is required',
          },
          validate: {
            // Rule 1: Regular Expression format validation
            validFormat: (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              'Please enter a valid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FlexBox gap={5}>
            <CustomText value="Email" fontSize={16} fontWeight="bold" />
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              dense={Platform.OS === 'android'}
              // Critical Email Handling Props:
              keyboardType="email-address"
              autoCapitalize="none" // Prevents capitalizing the first letter
              autoCorrect={true} // Disables spell-check fixes on email addresses
              autoComplete="email" // Android autofill support
              textContentType="username" // iOS looks for this to pull from iCloud Keychain
              error={!!errors.email} // converting a message into a strict boolean
            />
            {errors.email && (
              <CustomText value={errors.email?.message} fontColor="red" />
            )}
          </FlexBox>
        )}
        name="email"
      /> */}
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
      {/*       <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'role is required',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FlexBox gap={5}>
            <CustomText value="Role" fontSize={16} fontWeight="bold" />
            <View style={{ zIndex: 1000, backgroundColor: 'white' }}>
              <Dropdown
                label=""
                placeholder=""
                value={value}
                onSelect={(val: unknown) => onChange(val)}
                options={USER_ROLES}
                // mode="outlined"
                CustomDropdownInput={(props) => (
                  <TextInput
                    {...props}
                    placeholder="select role"
                    mode="outlined"
                    style={{ height: normaliseUnit(44) }} // Explicit text layout styling
                    // Map the internal dropdown value state to the input field text:
                    error={!!errors.role}
                    value={props.selectedLabel}
                    right={props.rightIcon}
                    left={
                      !!props.selectedLabel ? (
                        <TextInput.Icon
                          icon="refresh"
                          onPress={(val: unknown) => onChange(val)}
                        />
                      ) : null
                    }
                  />
                )}
                //style={{ height: normaliseUnit(44), paddingVertical: 0 }}
              />
            </View>
            {errors.role && (
              <CustomText value={errors.role?.message} fontColor="red" />
            )}
          </FlexBox>
        )}
        name="role"
      /> */}
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
      {/*       <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: ' password is required',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FlexBox gap={5}>
            <CustomText value="Password" fontSize={16} fontWeight="bold" />
            <FlexBox gap={5} style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                dense={Platform.OS === 'android'}
                error={!!errors.name} //forcing into a strict boolean
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconContainer}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </FlexBox>
            {errors.password && (
              <CustomText value={errors.password?.message} fontColor="red" />
            )}
          </FlexBox>
        )}
        name="password"
      /> */}
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
      {/*       <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'confirm password is required',
          },
          //formValues gives you access to the entire form's live data
          validate: {
            passWordMatch: (value, formValues) =>
              value === formValues.password || 'The passwords do not match',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FlexBox gap={5}>
            <CustomText
              value="Confirm Password"
              fontSize={16}
              fontWeight="bold"
            />
            <FlexBox gap={5} style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                dense={Platform.OS === 'android'}
                error={!!errors.name} //forcing into a strict boolean
                secureTextEntry={!confirmShowPassword}
              />
              <TouchableOpacity
                onPress={() => setConfirmShowPassword(!confirmShowPassword)}
                style={styles.iconContainer}
              >
                {confirmShowPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </FlexBox>
            {errors.confirmpassword && (
              <CustomText
                value={errors.confirmpassword?.message}
                fontColor="red"
              />
            )}
          </FlexBox>
        )}
        name="confirmpassword"
      /> */}
      <PasswordInput
        name="confirmpassword"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'confirm password is required',
          },
          //formValues gives you access to the entire form's live data
          validate: {
            /*  passWordMatch: (value, formValues) =>
              value === formValues.password || 'The passwords do not match', */
            passWordMatch: PasswordMatchValidator<FormValues>(),
          },
        }}
        placeholder="confirm password"
      />
      <CustomButton onPress={handleSubmit(onSubmit)} mode="contained">
        Register
      </CustomButton>
      <FlexBox
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={15}
      >
        <CustomText fontWeight="bold" value="Already have an account ?" />
        {/* <Link href="/login">
          <CustomText fontWeight="bold" value=" Login" fontColor="blue" />
        </Link> */}
        <TouchableOpacity
          onPress={() => router.push('/login')}
          //style={styles.iconContainer}
        >
          <LoginIcon />
        </TouchableOpacity>
      </FlexBox>
    </FlexBox>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    zIndex: 1000,
  },
});
