import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({ children }) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  //   const store = await prismadb.store.findFirst({
  //     where: {
  //       userId: userId,
  //     },
  //   });

  const store = await prismadb.store.findFirst({
    where: {
      userId: `${userId}`,
    },
  });

  // console.log("root:test", store.id);
  if (store) {
    return redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
