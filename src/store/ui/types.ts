import { User } from '@type/user';

export const uiStateName = 'ui';

export type RequestState = 'idle' | 'pending' | 'fetched';

export type UIState = {
    user: User | null;
    requests: Record<string, RequestState>;
};

export type StoreWithUIState = {
    [uiStateName]: UIState;
};
