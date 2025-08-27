import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const DynamicFormField = ({ label, name, description, placeholder, icon }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <span className="size-6">
                    {icon}
                </span>
                <h2 className="text-slate-800 text-xl font-extrabold">
                    {label}
                </h2>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => append({ value: "" })}
                    className="size-8"
                >
                    <PlusIcon/>
                </Button>
            </div>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
            {fields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2">
                    <Controller
                        control={control}
                        name={`${name}.${idx}.value`}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder={placeholder}
                                {...field}
                            />
                        )}
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(idx)}
                        className="rounded-full size-8"
                    >
                        <XIcon/>
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default DynamicFormField;