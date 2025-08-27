import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetCurrenciesQuery } from "@/services/dataApi";
import { isValidJSON } from "@/lib/utils";
import Loader from "@/components/Loader";
import CustomFormField from "@/components/CustomFormField";

const MonthlyWorkForm = () => {
    const { data: currencies, isLoading } = useGetCurrenciesQuery();
    const { watch } = useFormContext();
    const { t } = useTranslation();

    if(isLoading) return <Loader/>;

    const monthlyWorkValue = watch("workValue");
    const currencyValue = watch("currency");
    const currency = isValidJSON(currencyValue) ? JSON.parse(currencyValue) : null;

    const monthlyTaxAmount = monthlyWorkValue * 0.14;
    const annualWorkValue = monthlyWorkValue * 12;
    const annualTaxAmount = annualWorkValue * 0.14;

    return (
        <>
            <CustomFormField
                type="number"
                name="workValue"
                label={t("forms.labels.monthlyWorks")}
                placeholder={t("forms.placeholders.monthlyWorks")}
                description={t("forms.descriptions.monthlyWorks")}
                min={0}
            />
            <CustomFormField
                type="select"
                name="currency"
                label={t("forms.labels.currency")}
                placeholder={t("forms.placeholders.currency")}
                options={currencies}
            />
            {(monthlyWorkValue > 0) && (
                <>
                    <div className="text-primary-700 text-sm font-semibold">
                        <p>
                            {t("forms.labels.monthlyWorks")}: {monthlyWorkValue} {currency?.value}
                        </p>
                        <p>
                            {t("forms.labels.monthlyTaxAmount")}: {monthlyTaxAmount.toFixed(1)} {currency?.value}
                        </p>
                        <p>
                            {t("forms.labels.monthlyWithTax")}: {Math.round(Number(monthlyWorkValue) + Number(monthlyTaxAmount))} {currency?.value}
                        </p>
                    </div>
                    <div className="text-primary-700 text-sm font-semibold">
                        <p>
                            {t("forms.labels.annualWorks")}: {annualWorkValue} {currency?.value}
                        </p>
                        <p>
                            {t("forms.labels.annualTaxAmount")}: {annualTaxAmount.toFixed(1)} {currency?.value}
                        </p>
                        <p>
                            {t("forms.labels.annualWithTax")}: {Math.round(Number(annualWorkValue) + Number(annualTaxAmount))} {currency?.value}
                        </p>
                    </div>
                </>
            )}
        </>
    );
};

export default MonthlyWorkForm;