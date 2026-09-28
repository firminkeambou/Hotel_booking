import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//{ children }: React.PropsWithChildren

export default function CustomSafeArea({
  children,
  style: incomingStyle,
}: ViewProps) {
  const insets = useSafeAreaInsets();
  //paddingBottom: insets.bottom,
  return (
    <View style={[{ paddingTop: insets.top, flex: 1 }, incomingStyle]}>
      {children}
    </View>
  );
}
