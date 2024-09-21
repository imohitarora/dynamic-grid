"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
      <DataTable columns={columns} mobileColumns={["id", "name", "email", "actions"]} />
    </>
  );
}
