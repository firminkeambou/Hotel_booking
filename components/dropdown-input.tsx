import { TextInput } from 'react-native-paper';
import { USER_ROLES } from '@/constants';
import {
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import CustomText from '@/components/custom-text';
import FlexBox from '@/components/flexbox';
import { normaliseUnit } from '@/helpers/helpers';
// 1. Create a reusable wrapper component
interface CustomInputProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label?: string;
  options: dropDownOptions[];
}
interface dropDownOptions {
  label: string;
  value: string;
}
//any other input apart from email and password
export function DropDownInput<T extends FieldValues>({
  name,
  control,
  rules,
  options,
}: CustomInputProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FlexBox gap={5}>
      <CustomText value="Role" fontSize={16} fontWeight="bold" />
      <View style={{ zIndex: 1000, backgroundColor: 'white' }}>
        <Dropdown
          label=""
          placeholder=""
          value={value}
          onSelect={(val: unknown) => onChange(val)}
          options={options}
          // mode="outlined"
          CustomDropdownInput={(props) => (
            <TextInput
              {...props}
              placeholder="select role"
              mode="outlined"
              style={{ height: normaliseUnit(44) }} // Explicit text layout styling
              // Map the internal dropdown value state to the input field text:
              error={!!error} //forcing into a strict boolean
              //error={!!error} //forcing into a strict boolean
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
      {error && <CustomText value={error.message} fontColor="red" />}
    </FlexBox>
  );
}
