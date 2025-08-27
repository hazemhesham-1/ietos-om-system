import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "lucide-react";

const Stepper = ({ currentStep, steps = [] }) => {
    const { t } = useTranslation();

    if(!currentStep) return null;

    return (
        <nav className="rounded-e-md hidden relative p-10 overflow-hidden shadow-md min-h-screen md:block">
            <img
                src="/water-treatment-bg.png"
                alt="Water Treatment Plant"
                className="absolute inset-0 object-cover size-full"
            />
            <div className="relative w-full mb-32 opacity-90">
                <img
                    src="/logo-light.png"
                    alt="IWOMT Company Logo"
                    className="absolute inset-0 object-cover"
                />
            </div>
            <ol className="border-s-2 border-slate-200 relative">
                {steps.map((step, i) => (
                    <li
                        key={step.url}
                        className={`${currentStep === i+1 ? "text-primary-500" : "text-slate-500"} flex items-center ms-9 mb-16 font-medium`}
                    >
                        <span className={`${currentStep > i+1 ? "bg-green-200 text-green-500" : "bg-slate-100"} rounded-full flex items-center justify-center absolute -start-6 size-12`}>
                            {currentStep <= i+1 ? step.icon : <CheckIcon/>}
                        </span>
                        <NavLink
                            to={`/create-proposal/${step.url}`}
                            className={({ isActive }) => isActive ? "text-primary-400" : currentStep > i+1 ? "text-green-400" : "text-slate-100 hover:text-slate-300"}
                        >
                            {t(`common.steps.${step.name}`)}
                        </NavLink>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Stepper;