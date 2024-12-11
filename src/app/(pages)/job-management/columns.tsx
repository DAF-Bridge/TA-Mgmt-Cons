"use client";

import { Job } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (onEdit: (job: Job) => void): ColumnDef<Job>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "workplace",
    header: "Workplace",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("workplace")}</div>
    ),
  },
  {
    accessorKey: "work_type",
    header: "Work Type",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("work_type")}</div>
    ),
  },
  {
    accessorKey: "career_stage",
    header: "Career Stage",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("career_stage")}
      </div>
    ),
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("period")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("salary")}
      </div>
    ),
  },
  {
    accessorKey: "UpdatedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Updated At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("UpdatedAt"));
      return (
        <div className="max-w-[180px] truncate">
          {date.toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(job)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
