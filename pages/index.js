import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-24 px-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container px-3 mx-auto flex flex-col md:flex-row items-center max-w-screen-2xl m-auto xl">
        <div className="flex flex-col w-full md:w-9/12 justify-center items-start text-center md:text-left">
          <p className="tracking-loose w-full text-justify">
            Passion and enthusiasm can take a person to the true limit of his
            character. With knowledge comes responsibility and with
            responsibility comes hardships. The person that can standstill in
            the face of hardships surely achieves success in his life and
            recognition afterward. I believe in hardworking and constant effort
            and due to this spirit of the character, I became what I am today.
            Programming is my passion. I have experience in front-end web
            development. I love about what I do! I want to make my impression as
            a successful developer and for that I try to learn and teach
            anything valuable that can help me to get the better understand of
            what I do!
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Click on todo list button!
          </h1>

          <Link
            href="/todos/list"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Todo List
          </Link>
        </div>

        <div className="w-full md:w-3/5 py-6 text-center">
          <img className=" z-50 float-right" src={"/assets/hero.png"} />
        </div>
      </div>
    </div>
  );
}

// check session expire or not
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
