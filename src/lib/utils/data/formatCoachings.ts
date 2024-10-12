import { StudyPlan, SubjectItem } from "@modules/rootPage/RootPage";
import { Coaching } from "@type/common";
import { generateIds } from "../generateIds";

export const formatCoachings = (
  subjects: SubjectItem[],
  studyPlan: StudyPlan[]
): Coaching[] => {
  const ids = generateIds(
    studyPlan.filter((el) => el.subjectId !== "total").length,
    new Date().getTime()
  );
  return studyPlan
    .filter((el) => el.subjectId !== "total")
    .map((item, index) => ({
      id: ids[index],
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
