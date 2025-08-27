import { useFormContext } from "react-hook-form";
import CustomFormField from "@/components/CustomFormField";

const CategoryCard = ({ label, value, id, description, image }) => {
    const { watch } = useFormContext();
    const category = watch("category");

    const isChecked = category === value;

    return (
        <li>
            <CustomFormField
                type="radio"
                id={id}
                name="category"
                value={value}
                className="hidden"
            />
            <label
                htmlFor={id}
                className={`border rounded-lg inline-flex items-center justify-between w-full cursor-pointer group overflow-hidden ${isChecked ? "text-primary-500 border-primary-600" : "text-slate-100 border-slate-200 hover:scale-105"} transition`}
            >
                <div className="relative flex flex-col justify-end size-full p-8 pt-32 pb-4">
                    <img
                        src={image}
                        alt={`${label} equipment category image`}
                        className="absolute inset-0 size-full object-cover object-bottom"
                    />
                    <div className="bg-gradient-to-t from-slate-900 via-slate-900/40 absolute inset-0"></div>
                    <span className="text-3xl font-bold z-10">
                        {label}
                    </span>
                    <span className="text-slate-300 text-sm opacity-0 translate-y-full z-10 group-hover:opacity-100 group-hover:translate-y-0 transition">
                        {description}
                    </span>
                </div>
            </label>
        </li>
    );
};

export default CategoryCard;