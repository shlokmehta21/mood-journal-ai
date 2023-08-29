import { SignIn } from "@clerk/nextjs";
import { FC } from "react";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = ({}) => {
  return <SignIn />;
};

export default SignInPage;
