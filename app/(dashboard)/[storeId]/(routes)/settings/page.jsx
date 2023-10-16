import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-form";

export default async function SettingsPage({ params }) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { storeId } = params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: userId,
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
