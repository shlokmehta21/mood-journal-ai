"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
// import Spinner from "../Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Spinner } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

interface BottomNavigationProps {}

const BottomNavigation: FC<BottomNavigationProps> = ({}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCreating, setIsCreating] = useState(false);
  const pathname = usePathname();

  const handleOnClick = async () => {
    setIsCreating(true);
    const data = await createNewEntry();
    setIsCreating(false);
    startTransition(() => router.push(`/journal/${data.id}`));
    startTransition(() => router.refresh());
  };

  return (
    <div className=" mb-2 fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-[#000000] dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Tooltip label="Home" placement="top" mb={4}>
            <Link href="/journal">
              <svg
                className={`w-5 h-5 mb-1 ${
                  pathname === "/journal"
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }  group-hover:text-blue-600 dark:group-hover:text-blue-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
            </Link>
          </Tooltip>
          <span className="sr-only">Home</span>
        </button>

        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Tooltip label="Premium" placement="top" mb={4}>
            <Link href="/premium">
              <svg
                className={`w-5 h-5 mb-1 ${
                  pathname === "/premium"
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }  group-hover:text-blue-600 dark:group-hover:text-blue-500`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
              </svg>
            </Link>
          </Tooltip>
          <span className="sr-only">Wallet</span>
        </button>

        {/* Create new */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleOnClick}
            data-tooltip-target="tooltip-new"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            {isCreating ? (
              <Spinner color="white" />
            ) : (
              <Tooltip label="Create New" placement="top" mb={4}>
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </Tooltip>
            )}
            <span className="sr-only">New item</span>
          </button>
        </div>

        <button
          data-tooltip-target="tooltip-history"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <Tooltip label="History" placement="top" mb={4}>
            <Link href="/history">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 mb-1 ${
                  pathname === "/history"
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                } group-hover:text-blue-600 dark:group-hover:text-blue-500 `}
              >
                <rect x="3" y="1" width="6" height="18" />
                <rect x="10" y="5" width="6" height="14" />
                <rect x="17" y="9" width="6" height="10" />
              </svg>
              <span className="sr-only">History</span>
            </Link>
          </Tooltip>
        </button>

        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group "
        >
          <Tooltip label="User Profile" placement="top" mb={2}>
            <div className="mb-1">
              <UserButton afterSignOutUrl="/" />
            </div>
          </Tooltip>

          <span className="sr-only">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
