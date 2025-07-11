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
  institution_id?: number;
  institution?: Institution;
};

export type Institution = {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: null | string;
  name: string;
  institution_type: InstitutionType;
};

export type InstitutionType = 'School' | 'University' | 'Secondary';
