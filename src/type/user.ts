export type User = UserDuma | InstitutionsAdmin;

export type UserDuma = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  uuid: string;
  email: string;
  password: '<nil>' | string;
  token: string;
  level?: number;
};

export type InstitutionsAdmin = {
  id?: number;
  level?: number;
  createdat?: string;
  updatedat?: string;
  deletedat?: null | string;
  uuid?: string;
  email: string;
  password?: string;
  token?: string;
  fullname: string;
  institution_id: number;
  institution?: Institution;
};

export type Institution = {
  id?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null | string;
  name: string;
  institution_type: InstitutionType;
};

export type InstitutionType = 'School' | 'University' | 'Secondary';

// Account payload for institution teacher accounts management API
export type TeacherAccount = {
  email: string;
  fullname: string;
  // Optional in UI; backend may derive it from auth context, but include if available
  institution_id?: number;
  // Optional on update; mandatory on create
  password?: string;
  // Rarely needed from UI, present for parity with backend schema
  id?: number;
  uuid?: string;
  level?: number;
  token?: string;
  group?: number;
  updatedAt?: string;
  account_id?: number;
};
