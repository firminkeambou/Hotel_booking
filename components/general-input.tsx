import { TextInput } from 'react-native-paper';
import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import { Platform } from 'react-native';

import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { normaliseUnit } from '@/helpers/helpers';
// 1. Create a reusable wrapper component
interface CustomInputProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label?: string;
  placeholder: string;
}
//any other input apart from email and password
export function GeneralInput<T extends FieldValues>({
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
      <CustomText value={placeholder} fontSize={16} fontWeight="bold" />

      <TextInput
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        mode="outlined"
        dense={Platform.OS === 'android'}
        style={{ height: normaliseUnit(44), paddingVertical: 0 }}
        error={!!error} //forcing into a strict boolean
      />
      {error && <CustomText value={error.message} fontColor="red" />}
    </FlexBox>
  );
}
