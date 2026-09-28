import { normaliseUnit } from '@/helpers/helpers';
import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

//import { PropsWithChildren } from 'react';

const CustomButton = ({
  children,
  mode,
  onPress,
  disabled,
  buttonColor = '#012f1f',
  customWidth,
}: ButtonProps & { customWidth?: ViewStyle['width'] }) => {
  //you should use contentStyle , not style
  return (
    <Button
      contentStyle={[
        {
          borderRadius: 10,
          width: !customWidth ? '100%' : customWidth,
          height: normaliseUnit(60),
          justifyContent: 'center',
          alignContent: 'center',
        },
      ]}
      mode={mode || 'contained'}
      onPress={onPress}
      disabled={disabled}
      buttonColor={disabled ? '#84f1cb' : buttonColor} //
    >
      <Text>{children}</Text>
    </Button>
  );
};

export default CustomButton;
