import { Stack } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
} from '@tanstack/react-query'; // mandatory to wrap the app with QueryClientProvider to provide the react-query context, otherwise, react-query won't work

import { toastConfig } from '@/utils/toast-config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1. SPA Safety Net: Keep data fresh for 30 seconds globally.
      staleTime: 1000 * 30,

      // 2. Memory Retention: Keep inactive data in memory for 5 minutes.
      // If a component unmounts, its data stays cached for 5m before garbage collection.
      gcTime: 1000 * 60 * 5,

      // 3. UX Optimization: If a query fails, retry only twice before showing an error.
      // Highly recommended for SPAs to prevent infinite loading loops on weak Wi-Fi.
      retry: 2,

      refetchOnWindowFocus: false,
    },
  },
});
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
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Toast config={toastConfig} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
