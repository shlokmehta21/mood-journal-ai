import { SignUp } from "@clerk/nextjs";
import { FC } from "react";

interface SignUpProps {}

const SignUpPage: FC<SignUpProps> = ({}) => {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />;
};

export default SignUpPage;
