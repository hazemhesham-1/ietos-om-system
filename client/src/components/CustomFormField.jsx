import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";

const CustomFormField = (props) => {
    const {
        type = "text",
        name,
        label,
        description,
        item,
        options = [],
        placeholder,
        ...fieldProps
    } = props;

    const { control } = useFormContext();
    const isCheckbox = type === "checkbox";

    function renderElement(field) {
        if(type === "select") {
            return (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        {options.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }
        else if(type === "checkbox") {
            return (
                <Checkbox
                    checked={field.value?.includes(item?.id)}
                    onCheckedChange={(checked) => field.onChange(checked ? [...field?.value, item.id] : field.value?.filter((value) => value !== item.id))}
                />
            );
        }

        return <Input type={type} placeholder={placeholder} {...field} {...fieldProps}/>;
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={isCheckbox ? "flex items-center gap-2" : ""}>
                    {(label && !isCheckbox) && <FormLabel>{label}</FormLabel>}
                    <FormControl>{renderElement(field)}</FormControl>
                    {(label && isCheckbox) && (
                        <FormLabel className="text-sm font-normal">
                            {label}
                        </FormLabel>
                    )}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;