"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { mobileColumns } from "./components/mobile-columns";
import { DataTable } from "./components/data-table";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data.users);
      });
  }, []);

  useEffect(() => {
    // This effect will run when the screen size changes
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
        <DataTable columns={mobileColumns} data={tasks} />
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-center">Users</h1>
      <DataTable columns={columns} data={tasks} />
    </>
  );
}
