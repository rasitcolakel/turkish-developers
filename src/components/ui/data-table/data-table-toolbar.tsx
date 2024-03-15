"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lists } from "@/constants";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const setListFilter = (value: string) => {
    table.getColumn("listName")?.setFilterValue(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between flex-1">
        <Tabs
          className="p-0"
          value={
            (table.getColumn("listName")?.getFilterValue() as string) ?? ""
          }
        >
          <TabsList>
            <TabsTrigger
              value=""
              onClick={() => {
                setListFilter("");
              }}
              className="text-xs lg:text-sm m-0"
            >
              Tümü
            </TabsTrigger>
            {lists.map((list) => (
              <TabsTrigger
                key={list.name}
                value={list.name}
                onClick={() => {
                  setListFilter(list.name);
                }}
                className="text-xs lg:text-sm m-0"
              >
                {list.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filtrele"
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[100px] lg:w-[300px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Sıfırla
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
