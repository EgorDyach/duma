import { StudyPlan } from "@type/common";

export const requestStudyPlan = async (data: StudyPlan): Promise<void> => {
  await fetch("http://95.163.241.139:8001/api/v1/college/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
