import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomSafeArea({ children }: React.PropsWithChildren) {
  const insets = useSafeAreaInsets();
  //paddingBottom: insets.bottom,
  return <View style={{ paddingTop: insets.top, flex: 1 }}>{children}</View>;
}
