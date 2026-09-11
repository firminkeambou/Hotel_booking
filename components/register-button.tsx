import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { UserPlus, LucideProps } from 'lucide-react-native'; //
import { useTheme } from 'react-native-paper';
interface RegisterIconProps extends LucideProps {
  containerStyle?: ViewStyle;
}

export const RegisterIcon: React.FC<RegisterIconProps> = ({
  //color = '#c3ba05', // Green is often used for new registration
  color = '#007AFF',
  size = 30,
  strokeWidth = 2,
  containerStyle,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <UserPlus
        color={color}
        size={size}
        strokeWidth={strokeWidth}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
