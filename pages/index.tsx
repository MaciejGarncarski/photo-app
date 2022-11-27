import { signOut, useSession } from 'next-auth/react';
import ReactTooltip from 'react-tooltip';

export const APP_NAME = 'PhotoApp';

export default function Home() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Not signed up</div>;
  }

  return (
    <div>
      <img src={session.user.image ?? ''} />
      <h1>Hi {session.user.name}</h1>
      <button type='button' onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
