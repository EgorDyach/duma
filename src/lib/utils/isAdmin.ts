import { User } from '@type/user';

export const isAdmin = (user: User): boolean => user.level === 0;
