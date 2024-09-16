import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { columns } from "./components/columns";
import { userSchema } from "./data/schema";

import { DataTable } from "./components/data-table";

async function getUsers() {
  const data = await fs.readFile(path.join(process.cwd(), "app/(authanticated)/users/data/users.json"));

  const users = JSON.parse(data.toString());

  return z.array(userSchema).parse(users);
}

export default async function Page() {
  const tasks = await getUsers();

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
      <DataTable columns={columns} data={tasks} />
    </>
  );
}
