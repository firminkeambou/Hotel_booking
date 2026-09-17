import { useEffect, useState } from 'react';

import { getLoggedInUser } from '@/services/users';
// 1. Define the shape of our state using a TypeScript interface
interface SessionState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
//export function useLocalSession<T>(  url?: string,  options?: RequestInit,): SessionState<Partial<IUser>> useLocalSession<Todo>('https://typicode.com');
export function useLocalSession<T>(): SessionState<T> {
  const [state, setState] = useState<SessionState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Create an AbortController to cancel the request if the component unmounts
    const controller = new AbortController();

    const getUser = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await getLoggedInUser();

        if (!response.message) {
          throw new Error(`HTTP error! Status: ${response.message}`);
        }

        //const json = (await response.json()) as T;

        setState({ data: response.data, loading: false, error: null });
      } catch (err: any) {
        // Ignore the error if the fetch was intentionally aborted
        if ((err as Error).name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      }
    };

    getUser();

    // Cleanup function: Aborts the fetch when URL changes or component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
