import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";

const defaultValues = {
    email: "",
    password: ""
};

const EmployeeLogin = () => {
    const methods = useForm({ defaultValues });
    const [login, { isLoading }] = useLoginMutation();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { t } = useTranslation();

    async function onSubmit(credentials) {
        try {
            setError("");
            const employeeData = await login(credentials).unwrap();
            dispatch(setCredentials({ ...employeeData }));

            navigate("/");
        }
        catch(err) {
            if(!err?.status) {
                setError("No server response. Please try again later.");
            }
            else if((err.status === 400) || (err.status === 401)) {
                setError(err?.data?.message);
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-5">
            <div className="bg-slate-800 flex items-center justify-center relative px-4 py-6 sm:px-0 lg:col-span-3 lg:py-0">
                <img
                    src="/logo-background.png"
                    alt="Water treatment plant overview at IETOS"
                    className="object-cover absolute inset-0 size-full blur-sm"
                />
                <div className="max-w-3xl px-4 z-10">
                    <img
                        src="/logo-light.png"
                        className="h-24 mb-8"
                        alt="IETOS O&M Technologies logo"
                    />
                    <h1 className="text-slate-100 mb-4 text-3xl font-extrabold xl:text-5xl xl:leading-16">
                        {t("messages.loginScreen.overlay.title")}
                    </h1>
                    <p className="text-primary-200">
                        {t("messages.loginScreen.overlay.message")}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center px-4 py-6 sm:px-0 lg:col-span-2 lg:py-0">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="w-full max-w-112 space-y-8 xl:max-w-128"
                    >
                        <div>
                            <h1 className="text-foreground mb-2 text-2xl font-bold">
                                {t("messages.loginScreen.title")}
                            </h1>
                            <p className="text-muted-foreground text-sm font-medium">
                                {t("messages.loginScreen.description")}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <CustomFormField
                                type="email"
                                name="email"
                                label={t("forms.labels.email")}
                                description={t("forms.descriptions.email")}
                                placeholder={t("forms.placeholders.email")}
                            />
                            <CustomFormField
                                type="password"
                                name="password"
                                label={t("forms.labels.password")}
                                description={t("forms.descriptions.password")}
                                placeholder={t("forms.placeholders.password")}
                            />
                        </div>
                        <SubmitButton isSubmitting={isLoading}>
                            {t("buttons.login")}
                        </SubmitButton>
                        {error && <p className="text-destructive text-sm text-center">{error}</p>}
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default EmployeeLogin;