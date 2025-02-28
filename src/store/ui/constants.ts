import { UIState } from './types';

export const uiInitialState: UIState = {
  user: null,
  requests: {},
  activeTabs:  {
    shifts: true,
    profiles: true,
    teachers: true,
    groups: true,
    subjects: true,
    rooms: true,
    lessonTime: true,
    disciplines: true,
  },
  modals: {
    addGroup: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addRoom: {
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
    addProfile: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addTeacher: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addDiscipline: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
    addCourse: {
      isOpened: false,
      isEditing: false,
      value: null,
    },
  },
};
