import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PlusIcon, WrenchIcon } from "lucide-react";
import { openModal, resetEquipment } from "../equipment/equipmentSlice";
import { Button } from "@/components/ui/Button";
import EquipmentTable from "../equipment/EquipmentTable";

const RehabProposalForm = () => {
    const dispatch = useDispatch();
    const { data: equipmentFormData, isEditModal } = useSelector((state) => state.equipment);
    
    const { setValue, watch } = useFormContext();
    const selectedEquipment = watch("equipment");

    const { t } = useTranslation();

    useEffect(() => {
        if((Object.keys(equipmentFormData).length === 0) || isEditModal) return;

        const isEdited = selectedEquipment.some((equipment) => equipment.id === equipmentFormData.id);
        if(isEdited) {
            const updatedList = selectedEquipment.map((equipment) => equipment.id === equipmentFormData.id ? equipmentFormData : equipment);
            setValue("equipment", updatedList);
        }
        else {
            setValue("equipment", [ ...selectedEquipment, equipmentFormData ]);
        }

        dispatch(resetEquipment());
    }, [equipmentFormData]);

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <WrenchIcon className="size-6"/>
                <h2 className="text-slate-800 text-xl font-extrabold">
                    {t("forms.labels.workScope")}
                </h2>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => dispatch(openModal())}
                >
                    <PlusIcon/>
                </Button>
            </div>
            <p className="text-muted-foreground text-sm">
                {t("forms.descriptions.workScope")}
            </p>
            {selectedEquipment.length > 0 && <EquipmentTable equipment={selectedEquipment}/>}
        </div>
    );
};

export default RehabProposalForm;