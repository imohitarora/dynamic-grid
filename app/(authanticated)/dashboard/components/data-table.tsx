"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import Loading from "@/components/loading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  mobileColumns?: string[];
}

async function fetchData(page: number, pageSize: number, searchString: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search: searchString,
  });
  const response = await fetch(`/api/users?${params}`);
  return response.json();
}

export function DataTable<TData, TValue>({ columns, mobileColumns = [] }: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [searchString, setSearchString] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    if (isMobile !== undefined) {
      const newColumnVisibility: VisibilityState = {};
      columns.forEach((column) => {
        const columnId = column.id;
        if (columnId) {
          newColumnVisibility[columnId] = isMobile ? mobileColumns.includes(columnId) : true;
        }
      });
      setColumnVisibility(newColumnVisibility);
    }
  }, [isMobile, columns, mobileColumns]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize, searchString],
    queryFn: () => fetchData(pagination.pageIndex, pagination.pageSize, searchString),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    pageCount: data?.pageCount ?? -1,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  const handleSearch = (value: string) => {
    setSearchString(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on new search
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} searchString={searchString} onSearch={handleSearch} />
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-1 md:px-4 md:py-2">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-1 md:px-4 md:py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      {isLoading && <Loading />}
    </div>
  );
}
