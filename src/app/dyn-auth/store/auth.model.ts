import { UserInfo } from 'firebase/app';

export type User = UserInfo;

export interface AuthStateModel {
  initialized: boolean;
  pending: boolean;
  user?: UserInfo;
}

export interface Credentials {
    username: string;
    password: string;
    persistence: 'local' | 'session' | 'none';
}

