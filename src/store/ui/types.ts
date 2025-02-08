import { User, InstitutionsAdmin } from '@type/user';

export const uiStateName = 'ui';

export type RequestState = 'idle' | 'pending' | 'fetched';

export type ModalContent<T> = {
  isOpened: boolean;
  isEditing: boolean;
  value: T | null;
};

export type ModalTypes =
  | 'addClass'
  | 'addAuditory'
  | 'addLessonTime'
  | 'addSubject'
  | 'addSecondary'
  | 'addUniversity'
  | 'addSchool'
  | 'addShift'
  | 'GenerateModal';

export type Modals = {
  addClass: Group;
  addAuditory: Room;
  addLessonTime: LessonTime;
  addSubject: Subject;
  addSecondary: InstitutionsAdmin;
  addUniversity: InstitutionsAdmin;
  addSchool: InstitutionsAdmin;
  GenerateModal: string;
  addShift: Shift;
};

export type UIState = {
  user: User | null;
  requests: Record<string, RequestState>;
  modals: { [k in ModalTypes]: ModalContent<Modals[k]> };
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
