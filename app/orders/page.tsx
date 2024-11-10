import { DataTable } from "@/components/orders/data-table";
import { columns } from "@/components/orders/columns";

export default async function OrdersPage() {
  const orders = []; // This will be replaced with actual data fetching

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}