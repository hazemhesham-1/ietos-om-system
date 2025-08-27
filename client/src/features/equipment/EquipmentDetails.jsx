import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TASK_TYPES } from "@/constants/taskTypes";
import CustomFormField from "@/components/CustomFormField";

const EquipmentDetails = ({ equipment }) => {
    const { category, items } = equipment;
    const { watch } = useFormContext();

    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const taskType = watch("actionType");
    const taskDescription = TASK_TYPES.find((task) => task.value === taskType)?.description[lang];

    const localizedItems = items.map((option) => ({ label: option.label[lang], value: option.value }));
    const localizedTasks = TASK_TYPES.map((option) => ({ label: option.label[lang], value: JSON.stringify(option.label) }));
    
    return (
        <div className="space-y-5 mt-6">
            <CustomFormField
                type="select"
                name="equipment"
                label={t("forms.labels.equipment", { category })}
                placeholder={t("forms.placeholders.equipment", { category })}
                options={localizedItems}
                description={t("forms.descriptions.equipment", { category })}
            />
            <CustomFormField
                name="location"
                label={t("forms.labels.equipmentLocation")}
                placeholder={t("forms.placeholders.equipmentLocation")}
                description={t("forms.descriptions.equipmentLocation")}
            />
            <CustomFormField
                type="select"
                name="actionType"
                label={t("forms.labels.actionType")}
                placeholder={t("forms.placeholders.actionType")}
                options={localizedTasks}
                description={t("forms.descriptions.actionType")}
            />
            {taskDescription && <p className="text-muted-foreground -mt-2 text-sm">{taskDescription}</p>}
        </div>
    );
};

export default EquipmentDetails;