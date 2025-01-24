import { useSelector } from 'react-redux';
import { uiSelectors } from '@store/ui';

export const useRequestFetching = (name: string): boolean => {
  const requests = useSelector(uiSelectors.getRequests);
  return requests[name] === 'pending';
};

export const useRequestFetched = (name: string): boolean => {
  const requests = useSelector(uiSelectors.getRequests);
  return requests[name] === 'fetched';
};

export const useRequestIdle = (name: string): boolean => {
  const requests = useSelector(uiSelectors.getRequests);
  return requests[name] === 'idle';
};
