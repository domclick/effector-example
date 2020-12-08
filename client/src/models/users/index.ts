import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector';

import { IUser, IUserPayload } from 'types';

// Создаем хранилище, в котором будет лежать массив пользователей
// IUser - интерфейс, описывающий пользователя (имя, фамилия и т.п.)
export const $users = createStore<IUser[]>([]);

// Создаем событие, принимающее параметры IUser
export const update = createEvent<IUser>();

// Создаем эффекты для получения и изменения данных о пользователях
export const getUsersFx = createEffect<void, IUserPayload[], Error>();
export const updateUserFx = createEffect<IUserPayload, IUserPayload, Error>();

// Добавляем поле Статус каждому пользователю
const serializeUsers = (state: IUser[]) =>
  state.map((user) => user.onlineStatus = true);

export const $usersWithStatus = $users.map(serializeUsers);

// Создаем хранилище, в котором будет лежать ошибка, если GET-запрос зафейлится
// I вариант
// export const $fetchError = createStore<Error | null>(null);
// $fetchError
//   .on(getUsersFx.fail, (_, { error }) => error)
//   .reset(getUsersFx.done);
// II вариант
export const $fetchError = restore<Error>(getUsersFx.failData, null);

// Создаем другое хранилище, содержащий всю информацию по GET-запросу
export const $usersGetStatus = combine({
  loading: getUsersFx.pending,
  error: $fetchError,
  data: $users,
});
