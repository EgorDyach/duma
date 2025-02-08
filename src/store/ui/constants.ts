import { UIState } from './types';

export const uiInitialState: UIState = {
  user: null,
  requests: {},
  modals: {
    addClass: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addAuditory: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addLessonTime: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addSubject: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addSecondary: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addUniversity: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addSchool: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    GenerateModal: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addShift: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
  },
};
