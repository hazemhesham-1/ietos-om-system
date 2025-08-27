import { useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CheckCircleIcon, EyeIcon, MoreHorizontalIcon, XCircleIcon } from "lucide-react";
import { useGetProposalsQuery, useUpdateProposalMutation } from "../proposals/proposalsApi";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import DataTable from "@/components/DataTable";
import Loader from "@/components/Loader";
import ProposalSideDialog from "../proposals/ProposalSideDialog";

function getStatusColor(status) {
    switch (status) {
        case "approved": return "text-green-600 bg-green-100";
        case "pending": return "text-yellow-700 bg-yellow-100";
        case "rejected": return "text-red-600 bg-red-100";
        case "revise": return "text-blue-600 bg-blue-100";
        default: return "text-gray-600";
    }
}

const columns = [
    {
        accessorKey: "proposalId",
        header: "ID",
        cell: ({ row }) => <div className="capitalize">{row.getValue("proposalId")}</div>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "treatmentType",
        header: "Treatment Type",
        cell: ({ row }) => <div className="capitalize font-semibold">{row.getValue("treatmentType")}</div>,
    },
    {
        accessorKey: "employee",
        header: "Engineer / Technician",
        cell: ({ row }) => <div className="capitalize">{row.getValue("employee")}</div>,
    },
    {
        accessorKey: "submittedOn",
        header: "Submitted On",
        cell: ({ row }) => <div>{format(row.getValue("submittedOn"), "yyyy-MM-dd hh:mm a")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className={`${getStatusColor(row.getValue("status"))} rounded-md px-2 py-1 text-center text-sm font-medium uppercase`}>
                {row.getValue("status")}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const { t } = useTranslation();
            const [isOpen, setIsOpen] = useState(false);
            const [updateProposal] = useUpdateProposalMutation();
            const proposal = row.original;

            async function handleStatusUpdate(status) {
                if(status === proposal?.status) return;
                
                const proposalId = proposal?._id;
                const response = await updateProposal({ proposalId, status });
                const newStatus = response?.data?.status;
                if(newStatus === status) {
                    toast.success(t(`success.${status}`), { position: "top-center" });
                }
                setIsOpen(false);
            }

            return (
                <>
                    <ProposalSideDialog
                        open={isOpen}
                        setOpen={setIsOpen}
                        proposal={proposal}
                        onStatusChange={(status) => handleStatusUpdate(status)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontalIcon/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                <EyeIcon/>
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate("approved")}>
                                <CheckCircleIcon/>
                                Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate("rejected")}>
                                <XCircleIcon/>
                                Reject
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];

const OMProposalsTable = () => {
    const { data, isLoading: isFetching } = useGetProposalsQuery();
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    if(isFetching) return <Loader/>;

    return (
        <section className="w-full">
            <h1 className="text-slate-800 mb-5 text-2xl font-bold">
                Submitted Technical Proposals
            </h1>
            <div className="bg-slate-100 border border-border rounded-md">
                <DataTable table={table} theadClassName="bg-accent-100 shadow-md"/>
            </div>
        </section>
    );
};

export default OMProposalsTable;