import { StudyPlan, SubjectItem } from "@modules/rootPage/RootPage";
import { Coaching, CoachLesson } from "@type/common";

export const formatCoachLessons = (
  studyPlan: StudyPlan[],
  subjects: SubjectItem[],
  coachings: Coaching[]
): CoachLesson[] => {
  return studyPlan
    .filter((el) => el.subjectId !== "total")
    .map((item) => {
      const subject = subjects.find((el) => el.id === item.subjectId);
      if (!subject || !subject.teacher) return null;
      const coach = coachings.find(
        (el) => el.subjectID == subject.id && item.classId === el.groupID
      );
      if (!coach) return;
      return {
        id: coach.id,
        hours: item.value,
        ...(subjects.find((el) => el.id === item.subjectId)?.room?.id
          ? {
              RoomID: subjects.find((el) => el.id === item.subjectId)?.room?.id,
            }
          : { RoomID: 666 }),
        groupID: item.classId,
        teacherID: subject.teacher.map((el) => el.id)[0],
        subjectID: item.subjectId as number,
      };
    })
    .flat()
    .filter((el) => !!el)
    .map((coaching) => ({
      teacherID: coaching.teacherID,
      coachingID: coaching.id,
    }));
};
