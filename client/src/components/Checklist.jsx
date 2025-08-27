import { useFormContext } from "react-hook-form";
import CustomFormField from "./CustomFormField";

const Checklist = ({ title, name, itemsList, icon }) => {
    const { watch } = useFormContext();
    const lang = watch("language");
    
    return (
        <div className="flex flex-col gap-8">
            <div className="text-slate-800 flex items-center gap-2">
                <span className="size-6">
                    {icon}
                </span>
                <h2 className="text-xl font-extrabold">
                    {title}
                </h2>
            </div>
            {itemsList?.map((item) => (
                <CustomFormField
                    key={item._id}
                    type="checkbox"
                    name={name}
                    item={{ ...item, id: item._id }}
                    label={item.label[lang]}
                />
            ))}
        </div>
    );
};

export default Checklist;