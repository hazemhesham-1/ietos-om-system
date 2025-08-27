import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon, MoreHorizontal } from "lucide-react";
import { useGetEmployeesQuery } from "../features/employees/employeesApi";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import DataTable from "@/components/DataTable";
import Loader from "@/components/Loader";
import NavButtons from "@/components/NavButtons";
import TableColumnSelector from "@/components/TableColumnSelector";

const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "jobTitle",
        header: () => <div className="text-start">Title</div>,
        cell: ({ row }) => <div className="font-semibold text-start">{row.getValue("jobTitle")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <EyeIcon/>
                        View employee
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];

const EmployeeManagement = () => {
    const { data: employees, isLoading: isFetching } = useGetEmployeesQuery();
    const [sorting, setSorting] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const { t } = useTranslation();

    const table = useReactTable({
        data: employees,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection }
    });

    if(isFetching) return <Loader/>;
    
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                    onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
                    className="bg-slate-100 max-w-sm"
                    placeholder={t("common.placeholders.filterEmails")}
                />
                <TableColumnSelector table={table}/>
            </div>
            <div className="bg-slate-100 border rounded-md">
                <DataTable table={table}/>
            </div>
            <NavButtons
                variant="outline"
                size="sm"
                onBackTo={() => table.previousPage()}
                onNextTo={() => table.nextPage()}
                backDisabled={!table.getCanPreviousPage()}
                nextDisabled={!table.getCanNextPage()}
            />
        </div>
    );
};

export default EmployeeManagement;