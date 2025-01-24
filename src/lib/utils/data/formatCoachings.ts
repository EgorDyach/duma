import { SubjectItem, StudyPlan } from '@type/studyPlan';
import { Coaching } from '@type/studyPlanServer';
import { generateIds } from '../generateIds';

export const formatCoachings = (
  subjects: SubjectItem[],
  studyPlan: StudyPlan[],
): Coaching[] => {
  const ids = generateIds(studyPlan.length, new Date().getTime());
  return studyPlan.map((item, index) => ({
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
