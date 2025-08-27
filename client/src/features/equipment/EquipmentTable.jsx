import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { capitalizeText, isValidJSON } from "@/lib/utils";
import { useGetEquipmentQuery } from "./equipmentApi";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import Loader from "@/components/Loader";
import EquipmentRowActions from "./EquipmentRowActions";

const EquipmentTable = ({ equipment }) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const currencyValue = watch("currency");
    const currency = isValidJSON(currencyValue) ? JSON.parse(currencyValue) : null;

    const totalPrice = equipment.reduce((acc, { unit, price, quantity }) => unit !== "LS" ? (acc + (Number(price) * quantity)) : (acc + Number(price)), 0);

    return (
        <Table className="border border-border">
            <TableCaption>{t("common.table.equipmentList")}</TableCaption>
            <TableHeader className="bg-primary-200">
                <TableRow>
                    <TableHead className="w-25">#</TableHead>
                    <TableHead>{t("common.table.equipmentName")}</TableHead>
                    <TableHead>{t("dialog.labels.unit")}</TableHead>
                    <TableHead>{t("dialog.labels.quantity")}</TableHead>
                    <TableHead>{t("dialog.labels.price")} ({currency.value})</TableHead>
                    <TableHead>{t("common.totalPrice")} ({currency.value})</TableHead>
                    <TableHead className="text-end">{t("common.table.actions")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {equipment.map((equipment, i) => (
                    <EquipmentRow
                        key={`equipment-${i+1}`}
                        item={equipment}
                        index={i+1}
                    />
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>{t("common.totalPrice")}</TableCell>
                    <TableCell className="text-accent-700 font-semibold text-end">{(totalPrice).toFixed(2)} {currency.value}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={5}>{t("common.totalPriceWithFees", { percent: 14 })}</TableCell>
                    <TableCell className="text-accent-700 font-semibold text-end">{(totalPrice * 1.14).toFixed(2)} {currency.value}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

const EquipmentRow = ({ item, index }) => {
    const { data: equipmentData, isLoading } = useGetEquipmentQuery();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const selectedItem = equipmentData?.equipment.find(({ value }) => value === item.equipment);
    const totalPrice = item.unit !== "LS" ? Number(item.price) * item.quantity : Number(item.price);

    if(isLoading) return <Loader/>;

    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>
                {item.type ? capitalizeText(item.type) : selectedItem?.label[lang]}
                {item.location ? ` (${capitalizeText(item.location)})` : ""}
            </TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{totalPrice}</TableCell>
            <TableCell className="text-end">
                <EquipmentRowActions equipment={item}/>
            </TableCell>
        </TableRow>
    );
};

export default EquipmentTable;