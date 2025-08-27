import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/Dialog";
import SubmitButton from "./SubmitButton";

const SubmitModal = ({ isOpen, onConfirm, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();

    async function handleConfirm() {
        setIsSubmitting(true);
        await onConfirm?.();
    }

    function onOpenChange() {
        setIsSubmitting(false);
        onClose?.();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2">
                        {t("dialog.titles.submitProposal")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("dialog.descriptions.submitProposal")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onOpenChange}>
                        {t("buttons.cancel")}
                    </Button>
                    <SubmitButton
                        onClick={handleConfirm}
                        isSubmitting={isSubmitting}
                        className="h-9 w-auto px-4 text-sm"
                    >
                        {t("buttons.submit")}
                    </SubmitButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitModal;