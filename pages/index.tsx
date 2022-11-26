import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data } = useSession();

  if (!data?.user) {
    return <div>Not signed up</div>;
  }

  return (
    <div>
      <img src={data.user.image ?? ''} />
      <h1>Hi {data.user.name}</h1>
      <button type='button' onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
