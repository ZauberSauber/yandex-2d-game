import { selectUser } from '@slices';

import { useSelector } from './store';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.secondName}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  );
};

export default App;
