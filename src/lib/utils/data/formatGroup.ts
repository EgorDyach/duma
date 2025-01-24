import { ClassItem } from '@type/studyPlan';
import { Group } from '@type/studyPlanServer';

export const formatGroups = (classes: ClassItem[]): Group[] => {
  return classes.map(({ id, name, shift, account, count }) => ({
    id,
    name,
    holidays: [],
    shift,
    count,
    profile: account || undefined,
    profileID: account?.id || 0,
  }));
};
