import { getCurrentScheme } from "@/utils/getCurrentTheme";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center content-center">
      <div className="w-[46px] h-[46px] rounded-full animate-spin border border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default loading;
