import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WalletIcon } from "lucide-react";
import CustomFormField from "@/components/CustomFormField";
import DynamicFormField from "@/components/DynamicFormField";
import NavButtons from "@/components/NavButtons";
import MonthlyWorkForm from "../proposals/MonthlyWorkForm";

const ContractDetails = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { type } = useParams();

    return (
        <>
            {type !== "rehab" && (
                <>
                    <MonthlyWorkForm/>
                    <CustomFormField
                        type="number"
                        name="contractDuration"
                        label={t("forms.labels.contractDuration")}
                        placeholder={t("forms.placeholders.contractDuration")}
                        description={t("forms.descriptions.contractDuration")}
                        min={12}
                    />
                </>
            )}
            {type === "rehab" && (
                <DynamicFormField
                    name="paymentTerms"
                    label={t("forms.labels.paymentTerms")}
                    description={t("forms.descriptions.paymentTerms")}
                    placeholder={t("forms.placeholders.paymentTerms")}
                    icon={<WalletIcon/>}
                />
            )}
            <CustomFormField
                type="number"
                name="offerValidity"
                label={t("forms.labels.offerValidity")}
                placeholder={t("forms.placeholders.offerValidity")}
                description={t("forms.descriptions.offerValidity")}
                min={1}
            />
            <NavButtons onBackTo={() => navigate(-1)}/>
        </>
    );
};

export default ContractDetails;