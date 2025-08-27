import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SparklesIcon } from "lucide-react";
import SubmitButton from "@/components/SubmitButton";

const DocumentGenerator = () => {
    const { formState: { isSubmitting } } = useFormContext();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full text-center">
            <h1 className="text-slate-700 text-2xl font-semibold">
                {t("messages.generateDocument.title")}
            </h1>
            <p className="text-slate-500 text-xl">
                {t("messages.generateDocument.description")}
            </p>
            <SubmitButton isSubmitting={isSubmitting}>
                <SparklesIcon className="size-4"/>
                {t("buttons.generateProposal")}
            </SubmitButton>
        </div>
    );
};

export default DocumentGenerator;