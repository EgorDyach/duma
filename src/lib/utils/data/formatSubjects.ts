import { SubjectItem } from "@type/studyPlan";
import { Subject } from "@type/studyPlanServer";

export const formatSubjects = (subjects: SubjectItem[]): Subject[] => {
  return subjects.map(({ id, name }) => ({
    id,
    name,
  }));
};
