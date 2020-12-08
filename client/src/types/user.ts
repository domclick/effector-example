export interface IUser {
  id: number;
  name: string;
  surname: string;
  age: number;
  gender: string;
  onlineStatus?: boolean;
}

export type IUserPayload = Omit<IUser, 'onlineStatus'>;
