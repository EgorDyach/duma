import { User } from '@type/user';

export const isAdmin = (user: User): boolean => !('Institution' in user);
