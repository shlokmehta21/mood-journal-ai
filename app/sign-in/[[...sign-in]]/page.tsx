import ToggleButton from "@/components/layout/ToggleButton";
import { SignIn } from "@clerk/nextjs";
import { FC } from "react";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = ({}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center content-center bg-gradient-to-r from-purple-900 to-blue-800 relative">
      <div className=" absolute top-0 right-0 p-3">
        <ToggleButton />
      </div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
