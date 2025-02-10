import { User, InstitutionsAdmin } from '@type/user';

export const uiStateName = 'ui';

export type RequestState = 'idle' | 'pending' | 'fetched';

export type ModalContent<T> = {
  isOpened: boolean;
  isEditing: boolean;
  value: T | null;
};

export type ModalTypes =
  | 'addGroup'
  | 'addAuditory'
  | 'addLessonTime'
  | 'addSubject'
  | 'addShift'
  | 'addProfile'
  | 'addTeacher'
  | 'addSchool'
  | 'addSecondary'
  | 'addUniversity'
  | 'GenerateModal';

export type Modals = {
  addGroup: Group;
  addAuditory: Room;
  addLessonTime: LessonTime;
  addSubject: Subject;
  addShift: Shift;
  addProfile: Profile;
  addTeacher: Teacher;
  addSecondary: InstitutionsAdmin;
  addUniversity: InstitutionsAdmin;
  addSchool: InstitutionsAdmin;
  GenerateModal: string;
};

export type UIState = {
  user: User | null;
  requests: Record<string, RequestState>;
  modals: { [k in ModalTypes]: ModalContent<Modals[k]> };
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
