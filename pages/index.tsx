import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';

import { Home } from '@/components/pages/home/Home';

export const APP_NAME = 'PhotoApp';

const HomePage = () => {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery(['post'], async () => {
    return await axios.get('/api/post/1');
  });

  if (!session?.user) {
    return <div>Not signed up</div>;
  }

  return (
    <>
      <Home />
      <div>
        {isLoading && <p>loading</p>}
        {JSON.stringify(data)}
        <img src={session.user.image ?? ''} />
        <h1>Hi {session.user.name}</h1>
        <button type='button' onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </>
  );
};
export default HomePage;
