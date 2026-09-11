import { View } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import { normaliseUnit } from '@/helpers/helpers';
interface CustomTextProps {
  value: string | undefined;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '100';
  fontColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'auto';
}

const CustomText = ({
  value,
  fontSize = 14,
  fontWeight = 'normal',
  fontColor = '#000',
  textAlign = 'left',
}: CustomTextProps) => {
  return (
    <View>
      <Text
        style={{
          fontSize: normaliseUnit(fontSize),
          fontWeight: fontWeight,
          color: fontColor,
          textAlign: textAlign,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default CustomText;
