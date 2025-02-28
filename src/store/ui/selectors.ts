import { User } from '@type/user';
import {
  ModalContent,
  Modals,
  ModalTypes,
  RequestState,
  StoreWithUIState,
  UIState,
  uiStateName,
} from './types';

const getState = (store: StoreWithUIState): UIState => store[uiStateName];

export const getActiveTabs = (s: StoreWithUIState) => getState(s).activeTabs;

export const getUser = (s: StoreWithUIState): User | null => getState(s).user;

export const getRequests = (
  s: StoreWithUIState,
): Record<string, RequestState> => getState(s).requests;

export const getModals = (
  s: StoreWithUIState,
): { [k in ModalTypes]: ModalContent<Modals[k]> } => getState(s).modals;
