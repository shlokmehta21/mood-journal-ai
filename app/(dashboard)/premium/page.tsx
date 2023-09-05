"use client";
import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";
import { InfoIcon } from "@chakra-ui/icons";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Center className="h-full flex flex-col items-center justify-center">
      <InfoIcon fontSize={24} />
      <Text className=" text-xl mt-3">Premium features coming soon!</Text>
    </Center>
  );
};

export default page;
