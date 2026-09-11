import { TextInput } from 'react-native-paper';
import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import { Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { normaliseUnit } from '@/helpers/helpers';
// 1. Create a reusable wrapper component
interface CustomInputProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export function EmailInput<T extends FieldValues>({
  name,
  control,
  rules,
  placeholder,
}: CustomInputProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, isTouched },
  } = useController({ name, control, rules });

  return (
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
        autoCorrect={false} // Disables spell-check fixes on email addresses
        autoComplete="email" // Android autofill support
        textContentType="username"
        error={!!error} //forcing into a strict boolean
        style={{ height: normaliseUnit(44), paddingVertical: 0 }}
      />
      {error && <CustomText value={error.message} fontColor="red" />}
    </FlexBox>
  );
}
