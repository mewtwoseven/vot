import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import VotingWidget from "../components/VotingWidget";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Vote on Articles</title>
        <meta name="description" content="Give your opinion on the top stories of the day" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2b4fe0] to-[#7481e1]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Vote  <span className="text-[hsl(232,75%,41%)]">on</span> Articles
          </h1>
          <div className="flex items-center">
            <VotingWidget />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white font-prose">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: articles } = trpc.article.getArticles.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {articles && <span> - {"test"}</span>}
      </p>
    </div>
  );
};
