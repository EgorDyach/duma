import { SubjectItem } from "@modules/rootPage/RootPage";
import { Subject } from "@type/common";

export const formatSubjects = (subjects: SubjectItem[]): Subject[] => {
  return subjects.map(({ id, name }) => ({
    id,
    name,
  }));
};
