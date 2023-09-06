import { FC } from "react";

interface HomeLoadingProps {}

const HomeLoading: FC<HomeLoadingProps> = ({}) => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center content-center">
      <div className="w-[46px] h-[46px] rounded-full animate-spin border border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default HomeLoading;
