"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function getUsers() {
  const response = fetch("/api/users")
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return response;
}

export default function Page() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUsers(),
    queryKey: ["users"], //Array according to Documentation
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
      <DataTable columns={columns} data={data.users} />
    </>
  );
}
