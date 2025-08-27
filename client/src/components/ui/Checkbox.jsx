import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }) {
    const baseClass = "border border-slate-500 rounded-[4px] shrink-0 size-6 shadow-xs outline-none transition-shadow peer dark:bg-input/30 data-[state=checked]:bg-primary-500 data-[state=checked]:text-slate-100 data-[state=checked]:border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(baseClass, className)}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current transition-none"
            >
                <CheckIcon className="size-5"/>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
};

export { Checkbox };