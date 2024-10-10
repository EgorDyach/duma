import { StudyPlan, SubjectItem } from "@modules/rootPage/RootPage";
import { Coaching } from "@type/common";

export const formatCoachings = (
  subjects: SubjectItem[],
  studyPlan: StudyPlan[]
): Coaching[] => {
  return studyPlan
    .filter((el) => el.subjectId !== "total")
    .map((item) => ({
      id: item.id,
      hours: item.value,
      auditoriumID: subjects.find((el) => el.id === item.subjectId)!.room!.id,
      groupID: item.classId,
      subjectID: item.subjectId as number,
    }));
};