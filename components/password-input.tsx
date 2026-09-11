import { useState } from 'react';
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
  placeholder: string;
  secureTextEntry?: boolean;
}

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  rules,
  placeholder,
}: CustomInputProps<T>) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, isTouched },
  } = useController({ name, control, rules });

  return (
    <FlexBox gap={5}>
      <CustomText value={placeholder} fontSize={16} fontWeight="bold" />
      <FlexBox gap={5} style={styles.passwordContainer}>
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          mode="outlined"
          dense={Platform.OS === 'android'}
          error={!!error} //forcing into a strict boolean
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          style={{ height: normaliseUnit(44), paddingVertical: 0 }}
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
      {error && <CustomText value={error.message} fontColor="red" />}
    </FlexBox>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    position: 'relative',
  },
  iconContainer: {
    padding: 5,
    zIndex: 1000,
    position: 'absolute',
    top: normaliseUnit(5),
    left: Platform.OS === 'android' ? '85%' : '88%',
  },
});
