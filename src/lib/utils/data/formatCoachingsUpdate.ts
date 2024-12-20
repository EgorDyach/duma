import { SubjectItem, StudyPlan } from "@type/studyPlan";
import { Coaching } from "@type/studyPlanServer";

export const formatCoachingsUpdate = (
  subjects: SubjectItem[],
  studyPlan: StudyPlan[]
): Coaching[] => {
  return studyPlan.map((item) => ({
    id: item.id,
    hours: item.value,
    ...(subjects.find((el) => el.id === item.subjectId)?.room?.id
      ? {
          RoomID: subjects.find((el) => el.id === item.subjectId)?.room?.id,
        }
      : { RoomID: 666 }),
    groupID: item.classId,
    subjectID: item.subjectId as number,
  }));
};
