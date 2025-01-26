import { AuditoryItem, ClassItem } from '@type/studyPlan';
import { User, UserEducation } from '@type/user';

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
  | 'GenerateModal';

export type Modals = {
  addClass: ClassItem;
  addAuditory: AuditoryItem;
  addLessonTime: AuditoryItem;
  addSubject: AuditoryItem;
  addSecondary: UserEducation;
  addUniversity: UserEducation;
  addSchool: UserEducation;
  GenerateModal: AuditoryItem;
};

export type UIState = {
  user: User | null;
  requests: Record<string, RequestState>;
  modals: { [k in ModalTypes]: ModalContent<Modals[k]> };
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
