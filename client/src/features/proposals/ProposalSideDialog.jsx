import { AnimatePresence, motion } from "motion/react";
import { useDownloadDocumentMutation } from "./proposalsApi";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay, DialogClose } from "@/components/ui/Dialog";

const ProposalSideDialog = ({ open, setOpen, proposal, onStatusChange }) => {
    const [downloadProposal] = useDownloadDocumentMutation();
    const {
        title,
        employee,
        submittedOn,
        plantType,
        flowrate,
        site,
        estimatedCost,
        currency,
        contractDuration,
        attachments
    } = proposal;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="z-9999"/>
            <AnimatePresence>
                {open && (
                    <DialogContent className="bg-transparent border-none rounded-none fixed inset-auto top-0 bottom-0 end-0 z-9999 translate-0 p-0">
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="bg-background border-s border-border h-screen p-6 sm:max-w-150"
                        >
                            <div className="flex flex-col h-full">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold">
                                        Proposal: {title}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Submitted by {employee} on {submittedOn}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-1 mt-4 space-y-6 overflow-y-auto">
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Site Location</h4>
                                        <p>{site}</p>
                                    </section>
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Plant Type</h4>
                                        <p>{plantType}</p>
                                    </section>
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Flow Rate</h4>
                                        <p>{flowrate} m³/day</p>
                                    </section>
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Commercial Offer</h4>
                                        <p>{estimatedCost} {currency}</p>
                                    </section>
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Contract Duration</h4>
                                        <p>{contractDuration} months</p>
                                    </section>
                                    <section>
                                        <h4 className="text-muted-foreground mb-1 text-sm font-medium">Attachments</h4>
                                        <ul className="list-disc ml-5 text-sm">
                                            {attachments.map(({ filename }) => (
                                                <li key={filename}>
                                                    <button
                                                        onClick={() => downloadProposal(`technical-proposals/${filename}`)}
                                                        className="bg-transparent text-blue-600 outline-none cursor-pointer hover:underline"
                                                    >
                                                        {filename}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                                <div className="mt-6 flex justify-between gap-2">
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <div className="space-x-2">
                                        <Button
                                            variant="destructive"
                                            onClick={() => onStatusChange("rejected")}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            onClick={() => onStatusChange("approved")}
                                        >
                                            Approve
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    );
};

export default ProposalSideDialog;