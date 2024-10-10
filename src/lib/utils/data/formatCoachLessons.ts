import {
  StudyPlan,
  SubjectItem,
  TeacherItem,
} from "@modules/rootPage/RootPage";
import { CoachLesson } from "@type/common";
import { formatCoachings } from "./formatCoachings";

export const formatCoachLessons = (
  teachers: TeacherItem[],
  studyPlan: StudyPlan[],
  subjects: SubjectItem[]
): CoachLesson[] => {
  return formatCoachings(subjects, studyPlan)
    .map((coaching) => {
      const res: CoachLesson[] = [];
      teachers.forEach((teacher) =>
        res.push({ teacherID: teacher.id, coachingID: coaching.id })
      );
      return res;
    })
    .flat();
};
