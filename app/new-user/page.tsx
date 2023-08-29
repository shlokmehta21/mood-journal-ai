import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { FC } from "react";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  console.log(user);

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect("/journal");
};

interface NewUserPageProps {}

const NewUserPage: FC<NewUserPageProps> = async ({}) => {
  await createNewUser();
  return <div>...Getting user data</div>;
};

export default NewUserPage;
