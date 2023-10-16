import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({ children, params }) {
  const { storeId } = params;
  const user = auth();

  // console.log("dashboard:uid", user);
  // console.log("dashboard:storeID", storeId);

  if (!user) {
    return redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: `${user.userId}`,
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
