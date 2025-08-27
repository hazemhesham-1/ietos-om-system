import { useTranslation } from "react-i18next";
import { MoreHorizontalIcon, SquarePenIcon, TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { openEditModal } from "./equipmentSlice";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import { useFormContext } from "react-hook-form";

const EquipmentRowActions = ({ equipment }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { getValues, setValue } = useFormContext();
    
    function handleRemove() {
        if(confirm(t("messages.removeEquipment.description"))) {
            const equipmentList = getValues("equipment");
            const updatedList = equipmentList.filter((item) => item.id !== equipment.id);
            setValue("equipment", updatedList);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontalIcon className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => dispatch(openEditModal(equipment))}>
                    <SquarePenIcon/>
                    {t("buttons.edit")}
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem variant="destructive" onClick={handleRemove}>
                    <TrashIcon/>
                    {t("buttons.remove")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default EquipmentRowActions;