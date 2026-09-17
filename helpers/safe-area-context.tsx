import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomSafeArea({ children }: React.PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      {children}
    </View>
  );
}
