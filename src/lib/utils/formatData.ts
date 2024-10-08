import {
  AccountItem,
  AuditoryItem,
  ClassItem,
  StudyPlan,
  SubjectItem,
  TeacherItem,
} from "@modules/rootPage/RootPage";
import { DateRange } from "./getDateRange";

export const formatData = (
  teachers: TeacherItem[],
  classes: ClassItem[],
  auditories: AuditoryItem[],
  accounts: AccountItem[],
  subjects: SubjectItem[],
  studyPlan: StudyPlan[],
  period: DateRange
) => {
  return {
    account: "",
    classes: classes.map(({ schoolWeek, id, name, account, shift }) => ({
      days_of_week: schoolWeek,
      holidays: [],
      id: id,
      name: name,
      profile_id: account?.id || 0,
      shift: shift,
    })),
    plan_study: studyPlan.map((studyItem) => ({
      class_id: studyItem.classId,
      depends_on: [],
      period,
      // id:
      room:
        subjects.find((subject) => subject.id === studyItem.subjectId)?.room ||
        "",
      subject_id: studyItem.subjectId,
      // teacher_id:
      time_lesson:
        subjects.find((subject) => subject.id === studyItem.subjectId)?.time ||
        0,
      total_hours:
        studyPlan.find(
          (total) =>
            total.subjectId === "total" && studyItem.classId === total.classId
        )?.value || "",
      type:
        subjects.find((subject) => subject.id === studyItem.subjectId)?.type ||
        "",
    })),
    profiles: accounts.map(({ id, name }) => ({ id, name })),
    rooms: auditories.map(({ capacity, id, name, accounts }) => ({
      capacity,
      id,
      name,
      profile_ids: accounts.map(({ id }) => {
        id;
      }),
    })),
    teachers: teachers.map((teacher) => ({
      class_ids: teacher.subjects
        .map((subject) => subject.classes.map((el) => el.id))
        .flat(),
      holidays: [],
      hours: 0,
      id: teacher.id,
      name: teacher.name,
      room: teacher.subjects[0].auditory[0],
      subject_id: teacher.subjects[0].id,
    })),
    users: [],
  };
};
