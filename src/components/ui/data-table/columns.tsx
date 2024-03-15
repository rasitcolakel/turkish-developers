"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { TableRow } from "@/types";
import Markdown from "react-markdown";
import { ListLabels } from "@/constants";
import { fixLinks } from "@/lib/mappers";

export const columns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ad Soyad" />
    ),
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    enableSorting: true,
    enableHiding: false,
    sortingFn: (rowA, rowB, columnId) => {
      return (rowA.getValue(columnId) as string).localeCompare(
        rowB.getValue(columnId) as string
      );
    },
    size: 150,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Şirket" />
    ),
    cell: ({ row }) => (
      <Markdown
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noreferrer" />
          ),
        }}
      >
        {fixLinks(row.getValue("company"))}
      </Markdown>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "socialMedia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Social Media/Contact" />
    ),
    cell: ({ row }) => (
      <Markdown
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noreferrer" />
          ),
        }}
      >
        {fixLinks(row.getValue("socialMedia"))}
      </Markdown>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Açıklama" />
    ),
    cell: ({ row }) => {
      return (
        <Markdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noreferrer" />
            ),
          }}
        >
          {fixLinks(row.getValue("description"))}
        </Markdown>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "listName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Liste" />
    ),
    cell: ({ row }) => (
      <Markdown>
        {ListLabels[row.getValue("listName") as keyof typeof ListLabels] ??
          row.getValue("listName")}
      </Markdown>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
