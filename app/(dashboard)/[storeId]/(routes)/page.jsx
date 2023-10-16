import prismadb from "@/lib/prismadb";

export default async function DashboardPage({ children, params }) {
  const { storeId } = params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}
