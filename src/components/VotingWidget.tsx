import type { Article } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

interface VotingProps {
  article: Article;
}

const VotingWidget:React.FC = ( { article }:VotingProps ) => {
  const { data: sessionData } = useSession();
  const handleVote:React.FormEventHandler = (e:React.FormEvent):void => {
    console.log(e);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {articles && <span> - {"test"}</span>}
      </p>
    </div>
  );
};

export default VotingWidget;