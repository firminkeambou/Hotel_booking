import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Reusable fetch client with an abort signal timeout
const customFetchWithTimeout = async (
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs: number = 20000, // 10 seconds global default
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal, // listening the signal to stop possibly if the controller aborts
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Network request timed out');
    }
    throw error;
  }
};

export const supabaseConfig = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!, // A TypeScript-specific operator. It tells the compiler, "I guarantee this variable has a value and is not null or undefined.
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    global: {
      // Inject custom fetch into the SDK configuration that handle all connections
      fetch: (input, init) => customFetchWithTimeout(input, init, 7000), // 7-second limit
    },
  },
);
