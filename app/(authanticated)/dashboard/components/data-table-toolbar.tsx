"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchString: string;
  onSearch: (value: string) => void;
}

export function DataTableToolbar<TData>({ table, searchString, onSearch }: DataTableToolbarProps<TData>) {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? "flex-col" : "items-center justify-between"} space-y-2 md:space-y-0`}>
      <div className="flex flex-1 items-center space-x-2">
        <Input placeholder="Search all columns..." value={searchString} onChange={(event) => onSearch(event.target.value)} className="h-8 w-full md:w-[300px]" />
        {searchString && (
          <Button variant="ghost" onClick={() => onSearch("")} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
