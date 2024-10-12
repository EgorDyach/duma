import { ClassItem } from "@modules/rootPage/RootPage";
import { Group } from "@type/common";

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
