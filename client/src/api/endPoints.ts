import { IUserPayload } from 'types';
import { axios } from './axios';

export const getUsers = async (): Promise<IUserPayload[]> => {
  const res = await axios({
    url: '/users',
    method: 'GET',
  });
  return res.data;
}

export const updateUser = async (data: IUserPayload): Promise<IUserPayload> => {
  const res = await axios({
    url: `/users/${data.id}`,
    method: 'PATCH',
  });
  return res.data;
}
