import { UserType } from './enum/user-type.enum';

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  mail?: string;
  phone?: string;
  society?: string;
  is_admin?: boolean;
  isPro?: boolean;
  user_type: UserType;
}
