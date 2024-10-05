import { useMemo } from "react";

export const useMemoOnce = <T>(fn: () => T): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<T>(fn, []);
};
