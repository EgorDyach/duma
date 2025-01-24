export type User = UserDuma | UserEducation;

export type UserDuma = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    uuid: string;
    email: string;
    password: '<nil>' | string;
    token: string;
};

export type UserEducation = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    uuid: string;
    email: string;
    password: string;
    token: string;
    fullname: string;
    education_id: number;
    Education: Education;
};

export type Education = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    name: string;
    type: EducationType;
};

export type EducationType = 'school' | 'university' | 'secondary';
