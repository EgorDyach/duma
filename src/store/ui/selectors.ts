import { RequestState, StoreWithUIState, UIState, uiStateName } from './types';
import { User } from '@type/User';
import { BreadcrumbItem } from '@type/common';

const getState = (store: StoreWithUIState): UIState => store[uiStateName];

export const getUser = (s: StoreWithUIState): User | null => getState(s).user;

export const getIsSidebarExpanded = (s: StoreWithUIState): boolean =>
  getState(s).isSidebarExpanded;

export const getBreadcrumbs = (s: StoreWithUIState): BreadcrumbItem[] =>
  getState(s).breadcrumbs;

export const getLayoutTitle = (s: StoreWithUIState): string =>
  getState(s).layoutTitle;

export const getRequests = (
  s: StoreWithUIState,
): Record<string, RequestState> => getState(s).requests;
