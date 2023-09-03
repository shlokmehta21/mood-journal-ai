"use cl";
import { FC } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ChakraUIProvider } from "@/providers/ChakraUIProvider";

interface ClerkUIProviderProps {}

const ClerkUIProvider: FC<ClerkUIProviderProps> = ({}) => {
  return <div>ClerkUIProvider</div>;
};

export default ClerkUIProvider;
