import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetCurrenciesQuery, useGetGovernoratesQuery } from "@/services/dataApi";
import { LANGUAGES } from "@/constants/languages";
import Loader from "@/components/Loader";
import CustomFormField from "@/components/CustomFormField";
import NavButtons from "@/components/NavButtons";

const ClientDetails = () => {
    const { t, i18n } = useTranslation();
    const { type: proposalType } = useParams();
    const { data: governorates, isLoading: isGovernoratesLoading } = useGetGovernoratesQuery();
    const { data: currencies, isLoading: isCurrenciesLoading } = useGetCurrenciesQuery();

    const lang = i18n.language;

    const governorateOptions = governorates?.map((governorate) => ({
        label: governorate.name[lang],
        value: JSON.stringify(governorate)
    }));

    const languageOptions = LANGUAGES.map((language) => ({
        label: language.label[lang],
        value: language.value
    }));
    
    if(isGovernoratesLoading || isCurrenciesLoading) return <Loader/>;

    return (
        <>
            <CustomFormField
                name="id"
                label={t("forms.labels.documentCode")}
                placeholder={t("forms.placeholders.documentCode")}
                description={t("forms.descriptions.documentCode")}
            />
            <CustomFormField
                name="projectSubject"
                label={t("forms.labels.projectSubject")}
                placeholder={t("forms.placeholders.projectSubject")}
                description={t("forms.descriptions.projectSubject")}
            />
            <CustomFormField
                name="projectLocation"
                label={t("forms.labels.projectLocation")}
                placeholder={t("forms.placeholders.projectLocation")}
                description={t("forms.descriptions.projectLocation")}
            />
            <CustomFormField
                type="select"
                name="projectGovernorate"
                label={t("forms.labels.projectGovernorate")}
                placeholder={t("forms.placeholders.projectGovernorate")}
                options={governorateOptions}
                description={t("forms.descriptions.projectGovernorate")}
            />
            <CustomFormField
                name="contactPerson"
                label={t("forms.labels.contactPerson")}
                placeholder={t("forms.placeholders.contactPerson")}
                description={t("forms.descriptions.contactPerson")}
            />
            <CustomFormField
                name="jobTitle"
                label={t("forms.labels.jobTitle")}
                placeholder={t("forms.placeholders.jobTitle")}
                description={t("forms.descriptions.jobTitle")}
            />
            <CustomFormField
                type="date"
                name="issueDate"
                label={t("forms.labels.issueDate")}
            />
            <CustomFormField
                type="select"
                name="language"
                label={t("forms.labels.proposalLanguage")}
                placeholder={t("forms.placeholders.proposalLanguage")}
                options={languageOptions}
            />
            {proposalType === "rehab" && (
                <CustomFormField
                    type="select"
                    name="currency"
                    label={t("forms.labels.currency")}
                    placeholder={t("forms.placeholders.currency")}
                    options={currencies}
                />
            )}
            <NavButtons hideBack={true}/>
        </>
    );
};

export default ClientDetails;