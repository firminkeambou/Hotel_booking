import { normaliseUnit } from '@/helpers/helpers';
import React from 'react';
import { Text } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
//import { PropsWithChildren } from 'react';

const CustomButton = ({
  children,
  mode,
  onPress,
  disabled,
  buttonColor = '#012f1f',
}: ButtonProps) => {
  return (
    <Button
      style={{
        borderRadius: 10,
        width: '100%',
        height: normaliseUnit(60),
        justifyContent: 'center',
        alignContent: 'center',
      }}
      mode={mode || 'contained'}
      onPress={onPress}
      buttonColor={disabled ? '#84f1cb' : buttonColor} //
      disabled={disabled}
    >
      <Text>{children}</Text>
    </Button>
  );
};

export default CustomButton;
