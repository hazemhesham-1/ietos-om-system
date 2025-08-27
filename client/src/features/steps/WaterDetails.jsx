import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetTreatmentTypesQuery } from "@/services/dataApi";
import Loader from "@/components/Loader";
import CustomFormField from "@/components/CustomFormField";
import NavButtons from "@/components/NavButtons";

const WaterDetails = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetTreatmentTypesQuery();
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const plantTypes = data?.map((option) => ({ label: option.name[lang], value: JSON.stringify(option) }));
    
    if(isLoading) return <Loader/>;

    return (
        <>
            <CustomFormField
                type="select"
                name="plantType"
                label={t("forms.labels.treatmentType")}
                placeholder={t("forms.placeholders.treatmentType")}
                options={plantTypes}
            />
            <CustomFormField
                type="number"
                name="flowrate"
                label={t("forms.labels.flowRate")}
                placeholder={t("forms.placeholders.flowRate")}
                description={t("forms.descriptions.flowRate")}
                min={80}
            />
            <NavButtons onBackTo={() => navigate(-1)}/>
        </>
    );
};

export default WaterDetails;