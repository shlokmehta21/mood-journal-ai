import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center content-center text-white">
      <div className="w-full max-w-[720px] mx-auto flex flex-col justify-center items-center content-center">
        <h1 className="text-4xl md:text-6xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent transition-transform transform hover:scale-105">
          The best Journal App.
        </h1>
        <p className="text-2xl text-white/60 mb-4 text-center transition-opacity hover:opacity-80">
          This is the best app for tracking your mood throughout your life.
        </p>
        <div>
          <Link href={href}>
            <button className="m-4 p-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 hover:bg-indigo-600 transition-all">
              <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white transition-all hover:bg-gray-200">
                Get started
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
