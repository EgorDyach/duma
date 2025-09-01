import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  uiStateName,
  Modals,
  UIState,
  ModalContent,
  DisplayedTab,
} from './types';
import { uiInitialState } from './constants';
import { User } from '@type/user';

const uiSlice = createSlice({
  name: uiStateName,
  initialState: uiInitialState,
  reducers: {
    setActiveTab(state, { payload }: PayloadAction<DisplayedTab>) {
      state.activeTab = payload as DisplayedTab;
    },
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
    closeModals(state) {
      document.body.classList.remove('scrollBlock');
      Object.keys(state.modals).forEach((key) => {
        state.modals[key as keyof Modals] = {
          isOpened: false,
          isEditing: false,
          value: null,
        };
      });
    },
    openModal<T extends any>(
      state: UIState,
      {
        payload,
      }: PayloadAction<{
        modalName: T;
        isEditing: boolean;
        value: ModalContent<any>;
      }>,
    ) {
      document.body.classList.add('scrollBlock');
      // @ts-ignore
      state.modals[payload.modalName] = {
        isOpened: true,
        isEditing: payload.isEditing,
        value: payload.value as any,
      } as ModalContent<any>;
    },
  },
});

export const { name, reducer, actions } = uiSlice;
