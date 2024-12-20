import { AccountItem } from "@type/studyPlan";

export const formatAccounts = (accounts: AccountItem[]): Account[] => {
  return accounts.map(({ id, name }) => ({
    id,
    name,
    classes: [],
  }));
};

export type Account = {
  classes: [];
  id: number;
  name: string;
};
