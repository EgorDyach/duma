// import { StudyPlan as RequestStudyPlan } from "./../../type/common";
// import {
//   AccountItem,
//   AuditoryItem,
//   ClassItem,
//   StudyPlan,
//   SubjectItem,
//   TeacherItem,
// } from "@modules/rootPage/RootPage";
// import { DateRange } from "./getDateRange";

// export const formatData = (
//   teachers: TeacherItem[],
//   classes: ClassItem[],
//   auditories: AuditoryItem[],
//   accounts: AccountItem[],
//   subjects: SubjectItem[],
//   studyPlan: StudyPlan[],
//   period: DateRange
// ): RequestStudyPlan => {
//   return {
//     account: "",
//     classes: classes.map(({ schoolWeek, id, name, account, shift }) => ({
//       days_of_week: schoolWeek,
//       holidays: [],
//       id: id,
//       name: name,
//       profile_id: account?.id || 0,
//       shift: shift,
//     })),
//     plan_study: studyPlan
//       .filter((el) => el.subjectId !== "total")
//       .map((studyItem) => ({
//         class_id: studyItem.classId,
//         depends_on: [],
//         preriod: period,
//         id: studyItem.id,
//         room:
//           subjects.find((subject) => subject.id === studyItem.subjectId)
//             ?.room || "",
//         subject_id: studyItem.subjectId as number,
//         teacher_id:
//           (subjects.find((subject) => subject.id === studyItem.subjectId)
//             ?.teacher &&
//             subjects.find((subject) => subject.id === studyItem.subjectId)
//               ?.teacher?.id) ||
//           0,
//         time_lesson:
//           subjects.find((subject) => subject.id === studyItem.subjectId)
//             ?.time || 0,
//         total_hours:
//           studyPlan.find(
//             (total) =>
//               total.subjectId === "total" && studyItem.classId === total.classId
//           )?.value || 0,
//         type:
//           subjects.find((subject) => subject.id === studyItem.subjectId)
//             ?.type || "practice",
//       })),
//     profiles: accounts.map(({ id, name }) => ({ id, name })),
//     rooms: auditories.map(({ capacity, id, name, accounts }) => ({
//       capacity,
//       id,
//       name,
//       profile_ids: accounts.map(({ id }) => id),
//     })),
//     subjects: subjects.map(({ id, name }) => ({ id, name })),
//     teachers: teachers.map((teacher) => ({
//       class_ids: teacher.subjects
//         .map((subject) => subject.classes.map((el) => el.id))
//         .flat(),
//       holidays: [],
//       hours: teacher.hours,
//       id: teacher.id,
//       name: teacher.name,
//       room: teacher.subjects[0].auditory[0].name,
//       subject_id: teacher.subjects[0].id,
//     })),
//     users: [],
//   };
// };
