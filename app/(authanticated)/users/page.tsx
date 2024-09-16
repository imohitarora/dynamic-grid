import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { columns } from "./components/columns";
import { taskSchema } from "./data/schema";

import { DataTable } from "./components/data-table";

async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), "app/(authanticated)/users/data/tasks.json"));

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Page() {
  const tasks = await getTasks();

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
      <DataTable columns={columns} data={tasks} />
    </>
  );
}
