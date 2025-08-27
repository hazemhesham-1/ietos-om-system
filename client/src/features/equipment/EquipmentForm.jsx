import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { closeModal, nextStep, prevStep, setEquipmentData } from "./equipmentSlice";
import { useGetEquipmentQuery } from "./equipmentApi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import Loader from "@/components/Loader";
import CategoryCard from "./CategoryCard";
import EquipmentDetails from "./EquipmentDetails";
import EquipmentSpecs from "./EquipmentSpecs";

const defaultValues = {
    category: "",
    equipment: "",
    location: "",
    actionType: "",
    quantity: 1,
    unit: "No.",
};

const EquipmentForm = () => {
    const dispatch = useDispatch();
    const { data: equipmentFormData, isModalOpen, isEditModal, currentStep } = useSelector((state) => state.equipment);
    const { data: equipmentData, isLoading } = useGetEquipmentQuery();

    const { t, i18n } = useTranslation();
    const methods = useForm({ defaultValues });
    const lang = i18n.language;

    useEffect(() => {
        if(!isEditModal) return;

        methods.reset(equipmentFormData);
    }, [isEditModal]);

    if(isLoading) return <Loader/>;

    const category = methods.watch("category");
    const selectedCategory = equipmentData?.categories.find((item) => item.value === category);
    const filteredItems = equipmentData?.equipment.filter((item) => item.category === selectedCategory?.value);
    const categoryWithEquipment = { category: selectedCategory?.label[lang], items: filteredItems };

    const stepKeys = ["equipmentCategory", "equipmentDetails", "equipmentSpecs"];

    const isLastStep = currentStep === stepKeys.length;

    function onSubmit(data) {
        if(!isLastStep) {
            dispatch(nextStep());
            return;
        }

        dispatch(closeModal());
        if("id" in data) {
            dispatch(setEquipmentData(data));
        }
        else {
            const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            dispatch(setEquipmentData({ ...data, id }));
        }

        methods.reset(defaultValues);
    }

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(open) => !open && dispatch(closeModal())}
        >
            <DialogContent className="p-0 sm:max-w-4xl">
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <DialogHeader className="border-b border-border p-4 md:p-6">
                            <DialogTitle className="text-xl">
                                {t("dialog.titles.equipment")}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 px-4 py-2 max-h-[400px] overflow-auto md:px-6">
                            {(currentStep <= stepKeys.length) && (
                                <DialogDescription>
                                    {t(`dialog.steps.${stepKeys[currentStep-1]}`, { step: currentStep })}
                                </DialogDescription>
                            )}
                            {(currentStep === 1) && (
                                <ul className="grid gap-4 md:grid-cols-2">
                                    {equipmentData?.categories.map((item, i) => (
                                        <CategoryCard
                                            key={item.value}
                                            id={item.value}
                                            label={item.label[lang]}
                                            value={item.value}
                                            description={item.description[lang]}
                                            image={`/equipment/${item.value}.png`}
                                        />
                                    ))}
                                </ul>
                            )}
                            {(currentStep === 2) && <EquipmentDetails equipment={categoryWithEquipment}/>}
                            {isLastStep && <EquipmentSpecs keys={selectedCategory?.fields}/>}
                        </div>
                        <DialogFooter className="flex flex-col p-4 md:p-6 sm:flex-row">
                            {currentStep > 1 && (
                                <Button type="button" onClick={() => dispatch(prevStep())}>
                                    {t("buttons.previous")}
                                </Button>
                            )}
                            <Button type="submit" disabled={!category}>
                                {!isLastStep ? t("buttons.next") : isEditModal ? t("buttons.updateEquipment") : t("buttons.addEquipment")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentForm;