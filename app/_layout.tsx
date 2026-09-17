import { Stack } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import { toastConfig } from '@/utils/toast-config';
//import { useColorScheme } from 'react-native';
//screenOptions={{ headerShown: false } in the <Stack> component means no default header for any screen, we will be having our own header
export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY_COLOR,
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}
