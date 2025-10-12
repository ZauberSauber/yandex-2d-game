import { Helmet } from 'react-helmet-async';
import { usePage } from '@hooks';

import { Header } from '@components/Header';
import { selectFriends, selectIsLoadingFriends, selectUser } from '@slices';
import { useSelector } from '@src/store';

import { initFriendsPage } from './initFriendsPage';

export const FriendsPage = () => {
  const friends = useSelector(selectFriends);
  const isLoading = useSelector(selectIsLoadingFriends);
  const user = useSelector(selectUser);

  usePage({ initPage: initFriendsPage });

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Список друзей</title>
        <meta
          name="description"
          content="Страница со списком друзей и с информацией о пользователе"
        />
      </Helmet>
      <Header />
      {user ? (
        <>
          <h3>Информация о пользователе:</h3>{' '}
          <p>
            {user.name} {user.secondName}
          </p>
        </>
      ) : (
        <h3>Пользователь не найден</h3>
      )}
      {isLoading ? (
        'Загрузка списка...'
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.name}>
              {friend.name} {friend.secondName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
