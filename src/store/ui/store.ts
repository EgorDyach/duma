import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uiStateName } from './types';
import { uiInitialState } from './constants';
import { User } from '@type/user';

const uiSlice = createSlice({
    name: uiStateName,
    initialState: uiInitialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<User | null>) {
            state.user = payload;
        },
        setRequestStarted(state, { payload }: PayloadAction<string>) {
            state.requests[payload] = 'pending';
        },
        setRequestFinished(state, { payload }: PayloadAction<string>) {
            state.requests[payload] = 'fetched';
        },
        resetRequest(state, { payload }: PayloadAction<string>) {
            state.requests[payload] = 'idle';
        },
    },
});

export const { name, reducer, actions } = uiSlice;
