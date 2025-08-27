import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

function Label({ className, ...props }) {
    const baseClass = "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50";
    
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(baseClass, className)}
            {...props}
        />
    );
};

export { Label };