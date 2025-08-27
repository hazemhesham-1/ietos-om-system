import { useTranslation } from "react-i18next";
import { useGetEquipmentFieldsQuery } from "./equipmentApi";
import CustomFormField from "@/components/CustomFormField";
import Loader from "@/components/Loader";

const EquipmentSpecs = ({ keys }) => {
    const { data: fields, isLoading } = useGetEquipmentFieldsQuery();

    if(isLoading) return <Loader/>;

    return (
        <div className="space-y-5 mt-6">
            {keys?.map((key) => (
                <EquipmentField
                    key={key}
                    name={key}
                    fields={fields}
                />
            ))}
        </div>
    );
};

const EquipmentField = ({ name, fields }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const field = fields?.find((field) => field.key === name);
    const options = field?.options?.map(({ label, value }) => ({ label: label[lang], value }));

    return (
        <CustomFormField
            type={field?.type}
            name={name}
            label={t(`dialog.labels.${name}`)}
            placeholder={t(`dialog.placeholders.${name}`)}
            options={options ? options : undefined}
        />
    );
};

export default EquipmentSpecs;