"use client";
import { FC } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import { toggleScheme } from "@/utils/getCurrentTheme";
import { useRouter } from "next/navigation";
interface ToggleButtonProps {}

const ToggleButton: FC<ToggleButtonProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const toggleColor = async () => {
    await await toggleScheme();
    router.refresh();
    toggleColorMode();
  };

  return (
    <Button className=" bg-slate-500/30" onClick={toggleColor}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ToggleButton;
