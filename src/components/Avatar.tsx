import { signIn, signOut, useSession } from "next-auth/react";

const Avatar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
      <button
        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 shadow-sm rounded-md border-primary-700 px-4 py-2 bg-tertiary"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
  );
};

export default Avatar;
