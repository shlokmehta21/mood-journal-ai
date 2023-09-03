import { SignUp } from "@clerk/nextjs";
import { FC } from "react";

interface SignUpProps {}

const SignUpPage: FC<SignUpProps> = ({}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center content-center bg-gradient-to-r from-purple-900 to-blue-800">
      <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
    </div>
  );
};

export default SignUpPage;
