import { AuditoryItem } from "@modules/rootPage/RootPage";

export const formatAuditories = (auditories: AuditoryItem[]): Auditorium[] => {
  return auditories.map(({ capacity, id, name, accounts }) => ({
    capacity,
    id,
    name,
    profiles: accounts,
  }));
};

type Auditorium = {
  capacity: number;
  id: number;
  name: string;
  profiles: {
    id: number;
    name: string;
  }[];
};
