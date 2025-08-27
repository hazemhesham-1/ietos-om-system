import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DollarSignIcon, DropletsIcon, FileTextIcon, IdCardIcon, SettingsIcon } from "lucide-react";
import { DOCUMENT_CODES } from "@/constants";
import { useGetCurrentUserQuery } from "@/features/employees/employeesApi";
import { useSubmitProposalMutation } from "@/features/proposals/proposalsApi";
import EquipmentForm from "@/features/equipment/EquipmentForm";
import { Form } from "@/components/ui/Form";
import Stepper from "@/components/Stepper";
import SubmitModal from "@/components/SubmitModal";

const navLinks = {
    "om-offer": [
        {
            url: "om-offer/client-info",
            name: "clientInfo",
            icon: <IdCardIcon/>
        },
        {
            url: "om-offer/water-details",
            name: "waterDetails",
            icon: <DropletsIcon/>
        },
        {
            url: "om-offer/work-scope",
            name: "businessScope",
            icon: <SettingsIcon/>
        },
        {
            url: "om-offer/contract-details",
            name: "financialOffer",
            icon: <DollarSignIcon/>
        },
        {
            url: "om-offer/generate-doc",
            name: "generateDocument",
            icon: <FileTextIcon/>
        },
    ],
    "rehab": [
        {
            url: "rehab/client-info",
            name: "clientInfo",
            icon: <IdCardIcon/>
        },
        {
            url: "rehab/water-details",
            name: "waterDetails",
            icon: <DropletsIcon/>
        },
        {
            url: "rehab/work-scope",
            name: "businessScope",
            icon: <SettingsIcon/>
        },
        {
            url: "rehab/contract-details",
            name: "contractDetails",
            icon: <DollarSignIcon/>
        },
        {
            url: "rehab/generate-doc",
            name: "generateDocument",
            icon: <FileTextIcon/>
        },
    ],
    "others": [
        {
            url: "others/client-info",
            name: "clientInfo",
            icon: <IdCardIcon/>
        },
        {
            url: "others/work-scope",
            name: "businessScope",
            icon: <SettingsIcon/>
        },
        {
            url: "others/generate-doc",
            name: "generateDocument",
            icon: <FileTextIcon/>
        },
    ]
};

const defaultValues = {
    language: "en",
    id: "",
    companyName: "",
    projectSubject: "",
    projectLocation: "",
    projectGovernorate: "",
    contactPerson: "",
    jobTitle: "",
    issueDate: "",
    plantType: "",
    flowrate: 0,
    operationScope: [],
    manpower: [],
    operationSchedule: [],
    chemicalManagement: [],
    replacements: [],
    reports: [],
    equipment: [],
    paymentTerms: [
        { value: "50% Down payment." },
        { value: "85% Prorate upon equipment delivery to the site." },
        { value: "100% Upon completion of erection." },
    ],
    workValue: 0,
    currency: "{\"name\":{\"en\":\"Egyptian Pound (EGP)\",\"ar\":\"جنيهاً مصرياً\"},\"_id\":\"6891aa4d71eca18d36e3dbce\",\"value\":\"EGP\"}",
    contractDuration: 12,
    offerValidity: 30,
};

const ProposalForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const { data: user } = useGetCurrentUserQuery();
    const [submitProposal] = useSubmitProposalMutation();
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const { type: proposalType } = useParams();
    const { t, i18n } = useTranslation();

    const [currentStep, setCurrentStep] = useState(0);
    const numSteps = proposalType ? navLinks[proposalType].length : 0;
    const yearSuffix = new Date().getFullYear().toString().slice(-2);
    const documentCode = DOCUMENT_CODES[proposalType];

    const methods = useForm({ defaultValues: { ...defaultValues, id: `I${yearSuffix}${documentCode}` } });

    useEffect(() => {
        const { pathname } = location;
        if(!pathname.includes("/create-proposal")) return;

        const currentPath = pathname.split("/").filter(Boolean)[2];
        const stepIndex = navLinks[proposalType]?.findIndex((step) => step.url === `${proposalType}/${currentPath}`);
        if(stepIndex < 0) return;

        setCurrentStep(stepIndex + 1);
    }, [location]);

    async function onSubmit(data) {
        if(i18n.language !== data.language) {
            i18n.changeLanguage(data.language);
        }

        if(currentStep < numSteps) {
            navigate(`/create-proposal/${navLinks[proposalType][currentStep].url}`);
        }
        else if(currentStep === numSteps) {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/proposals/generate`, { ...data, documentCode }, {
                responseType: "blob",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const blob = response.data;
            
            if(blob instanceof Blob) {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${data.id}.docx`;
                link.click();

                const file = new File([blob], `${data.id}.docx`, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
                methods.setValue("document", file);
                setIsSubmitModalOpen(true);
            }
            else {
                toast.error(t("errors.proposalGeneration"));
            }
        }
    }

    async function handleReviewSubmit() {
        const data = methods.getValues();

        const formData = new FormData();
        for(const key in data) {
            formData.append(key, data[key]);
        }
        formData.append("employeeId", user.id);

        try {
            await submitProposal(formData);
            setIsSubmitModalOpen(false);
            toast.success(t("success.submission"));
        }
        catch(err) {
            toast.error(t("errors.submission"));
        }
    }

    return (
        <>
            <Form {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="w-full lg:flex lg:justify-between lg:gap-20"
                >
                    <Stepper currentStep={currentStep} steps={navLinks[proposalType]}/>
                    <div className="flex-1 flex flex-col gap-8 my-12 px-5 lg:ps-0 lg:pe-16">
                        {proposalType && (currentStep < numSteps) && (
                            <h1 className="text-3xl font-bold">
                                {t(`common.steps.${navLinks[proposalType][currentStep-1]?.name}`)}
                            </h1>
                        )}
                        <Outlet/>
                    </div>
                </form>
            </Form>
            <SubmitModal
                isOpen={isSubmitModalOpen}
                onConfirm={handleReviewSubmit}
                onClose={() => setIsSubmitModalOpen(false)}
            />
            {proposalType === "rehab" && <EquipmentForm/>}
        </>
    );
};

export default ProposalForm;