import { EffectCallback, useEffect } from 'react';

export const useEffectOnce = (fn: EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
};
