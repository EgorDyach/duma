import { AuditoryItem } from '@type/studyPlan';

export const formatAuditories = (auditories: AuditoryItem[]): Room[] => {
  return auditories.map(({ capacity, id, name, accounts }) => ({
    capacity,
    id,
    name,
    profiles: accounts,
  }));
};

type Room = {
  capacity: number;
  id: number;
  name: string;
  profiles: {
    id: number;
    name: string;
  }[];
};
