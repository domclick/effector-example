import { useEffect } from 'react';
import { useStore, useList } from 'effector-react';

import { $users, $usersGetStatus, update, getUsersFx } from 'models/users';

export const UserList = () => {
  const users = useStore($users);

  const mockUser = {
    id: 1111,
    name: 'Peter',
    surname: 'Jonson',
    age: 25,
    gender: 'male',
  };

  const usersItems = users.map((user) => (
    <div key={user.id}>
      <div>Name: {user.name}</div>
      <div>Surname: {user.surname}</div>
      <div>Age: {user.age}</div>
      <div>Gender: {user.gender}</div>
      <br/>
    </div>
  ));

  return (
    <div>
      {usersItems}
      <button onClick={() => update(mockUser)}>
        Add mock user to Effector store
      </button>
    </div>
  );
};

export const UserList2 = () => {
  // Можно преобразовать в массив нод сразу при подключении.
  // Не нужно использовать пропс key, как было с map()
  const users = useList($users, (user) => (
    <div>
      <div>Name: {user.name}</div>
      <div>Surname: {user.surname}</div>
      <div>Age: {user.age}</div>
      <div>Gender: {user.gender}</div>
      <br/>
    </div>
  ));

  const mockUser = {
    id: 2222,
    name: 'Diana',
    surname: 'Gregory',
    age: 22,
    gender: 'female',
  };

  return (
    <div>
      {users}
      <button onClick={() => update(mockUser)}>
        Add mock user to Effector store
      </button>
    </div>
  );
};

export const UserList3 = () => {
  // Подключаем хранилище в компонент
  const { loading, error, data } = useStore($usersGetStatus);

  // Делаем запрос на бек на didMount
  useEffect(() => {
    getUsersFx();
  }, []);

  if (loading) {
    return (
      <div>Загрузка...</div>
    );
  }
  if (error) {
    return (
      <div>
        <span><b>Произошла ошибка: </b></span>
        <span>{error.message}</span>
      </div>
    );
  }

  const usersItems = data.map((user) => (
    <div key={user.id}>
      <div>Name: {user.name}</div>
      <div>Surname: {user.surname}</div>
      <div>Age: {user.age}</div>
      <div>Gender: {user.gender}</div>
      <br/>
    </div>
  ));

  return (
    <div>
      {usersItems}
    </div>
  );
};
