import BottomNavigation from "@/components/layout/BottomNavigation";
import ToggleButton from "@/components/layout/ToggleButton";
import { getCurrentScheme } from "@/utils/getCurrentTheme";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const links = [
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashBoardLayout: FC<DashBoardLayoutProps> = async ({ children }) => {
  const color = await getCurrentScheme();

  return (
    <div
      className={`h-screen w-screen overflow-x-hidden ${
        color === "dark" ? "bg-slate-600" : "bg-slate-100"
      }`}
    >
      {/* <aside className=" absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div>Mood</div>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href} className=" px-2 py-6 text-xl">
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </aside> */}

      {/* <div className="ml-[200px] h-full">
        <header className=" h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div> */}

      <div className="h-full relative">
        <div className=" absolute top-0 right-0 p-4">
          <ToggleButton />
        </div>
        {/* <UserButton afterSignOutUrl="/" /> */}
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashBoardLayout;
