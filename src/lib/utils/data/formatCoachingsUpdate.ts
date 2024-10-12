import { StudyPlan, SubjectItem } from "@modules/rootPage/RootPage";
import { Coaching } from "@type/common";

export const formatCoachingsUpdate = (
  subjects: SubjectItem[],
  studyPlan: StudyPlan[]
): Coaching[] => {
  return studyPlan
    .filter((el) => el.subjectId !== "total")
    .map((item) => ({
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
