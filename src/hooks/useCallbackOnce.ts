  import { useCallback } from 'react';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const useCallbackOnce = <T extends (...args: T[]) => T>(
    fn: T,
  ): T => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback<T>(fn, []);
  };
