import { attach, forward, Store } from 'effector';

import { IUser } from 'types';
import { updateUser, getUsers } from 'api';
import { $users,
  update,
  updateUserFx,
  getUsersFx
} from '.';

updateUserFx.use(updateUser);
getUsersFx.use(getUsers);

// Обычный хендлер на обновление хранилища. Добавляем или изменяем пользователя
const updateStore = (state: IUser[], data: IUser) => {
  const userIndex = state.findIndex((user) => user.id === data.id);

  // Изменяем стейт
  if (userIndex > -1) {
    state.splice(userIndex, 1, data);
  } else {
    state.push(data);
  }

  // Возвращаем измененный стейт
  return [...state];
};

// Изменяем формат данных из хранилища в формат, необходимый для отправки запроса
const serializeDataBeforeFetch = attach<
  IUser,
  Store<IUser[]>,
  typeof updateUserFx
  >({
  effect: updateUserFx,
  source: $users,
  mapParams: (params: IUser, data: IUser[]) => {
    const user = data.find((item) => item.id === params.id)!;
    const userCopy = { ...user };
    delete userCopy?.onlineStatus;
    return userCopy;
  },
});

forward({
  from: update,
  to: serializeDataBeforeFetch,
});

// Подписываемся на событие в хранилище
$users
  .on(update, updateStore)
  .on(getUsersFx.doneData, (_, data) => data);
