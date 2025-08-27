import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "./ui/Checkbox";
import CustomFormField from "./CustomFormField";

const NestedChecklist = ({ title, name, itemsList, icon }) => {
    const [items, setItems] = useState([]);
    
    const { watch, setValue } = useFormContext();
    const lang = watch("language");
    const itemsField = watch(name);

    const isIncluded = (item, arr) => arr.some((value) => item.startsWith(value));

    function onItemChecked(item, checked) {
        const newItems = checked ? [...items, item.value] : items.filter((value) => value !== item.value);
        setItems(newItems);
        setValue(name, itemsField.filter((item) => isIncluded(item, newItems)));
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="text-slate-800 flex items-center gap-2">
                <span className="size-6">
                    {icon}
                </span>
                <h2 className="text-xl font-extrabold">
                    {title}
                </h2>
            </div>
            {itemsList?.map((item) => (
                <div key={item.value}>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={items.includes(item.value)}
                            onCheckedChange={(checked) => onItemChecked(item, checked)}
                        />
                        <p>{item.label[lang]}</p>
                    </div>
                    {items.includes(item.value) && (
                        <div className="space-y-2 mt-2 mb-5">
                            {item?.list.map((subItem) => (
                                <CustomFormField
                                    key={subItem._id}
                                    type="checkbox"
                                    name={name}
                                    item={{ ...subItem, id: subItem._id }}
                                    label={subItem.label[lang]}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NestedChecklist;