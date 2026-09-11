import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LogIn, LucideProps } from 'lucide-react-native';

// 1. Defining standard props if you want to make a reusable wrapper
interface CustomIconProps extends LucideProps {
  containerStyle?: ViewStyle;
}

export const LoginIcon: React.FC<CustomIconProps> = ({
  color = '#007AFF',
  //color = '#c3ba05',
  size = 30,
  strokeWidth = 2,
  containerStyle,
  ...props // Spreads any other LucideProps (like absoluteStroke, etc.)
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LogIn color={color} size={size} strokeWidth={strokeWidth} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
