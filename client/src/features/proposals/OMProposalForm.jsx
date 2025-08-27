import { useTranslation } from "react-i18next";
import { CalendarCheckIcon, FileTextIcon, FlaskConicalIcon, RefreshCcwIcon, UsersIcon, WrenchIcon } from "lucide-react";
import { useGetOperationsQuery } from "./operationsApi";
import Checklist from "@/components/Checklist";
import Loader from "@/components/Loader";
import NestedChecklist from "@/components/NestedChecklist";
import DynamicFormField from "@/components/DynamicFormField";

const OMProposalForm = () => {
    const { data: operations, isLoading } = useGetOperationsQuery();
    const { t } = useTranslation();

    if(isLoading) return <Loader/>;

    const filterItems = (workTypes) => operations?.works.filter((item) => workTypes.includes(item.type));
    const groupItems = (items) => items.map((item) => ({ ...item, list: filterItems(item?.value) }));

    return (
        <div className="space-y-16">
            <Checklist
                name="operationScope"
                title={t("common.operationMaintenanceScope")}
                itemsList={filterItems(["operations"])}
                icon={<WrenchIcon/>}
            />
            <Checklist
                name="manpower"
                title={t("common.manpower")}
                itemsList={filterItems(["manpower"])}
                icon={<UsersIcon/>}
            />
            <NestedChecklist
                name="operationSchedule"
                title={t("common.operationsSchedule")}
                itemsList={groupItems(operations?.schedules)}
                icon={<CalendarCheckIcon/>}
            />
            <Checklist
                name="chemicalManagement"
                title={t("common.chemicalsManagement")}
                itemsList={filterItems(["chemicals"])}
                icon={<FlaskConicalIcon/>}
            />
            <DynamicFormField
                name="reports"
                label={t("common.reports")}
                icon={<FileTextIcon/>}
            />
            <NestedChecklist
                name="replacements"
                title={t("common.replacements")}
                itemsList={groupItems(operations?.replacements)}
                icon={<RefreshCcwIcon/>}
            />
        </div>
    );
};

export default OMProposalForm;