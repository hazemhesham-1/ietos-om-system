import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "rounded-md inline-flex items-center justify-center gap-2 shrink-0 text-sm font-medium outline-none whitespace-nowrap cursor-pointer transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    {
        variants: {
            variant: {
                default: "bg-primary-700 text-slate-100 shadow-xs hover:bg-primary-700/90",
                destructive: "bg-destructive/50 text-white shadow-xs hover:bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "bg-background border shadow-xs hover:bg-accent-100 hover:text-accent-800 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary-600 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "gap-1.5 h-8 px-3 has-[>svg]:px-2.5",
                lg: "h-10 px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button(props) {
    const {
        className,
        variant,
        size,
        asChild = false,
        ...buttonProps
    } = props;

    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...buttonProps}
        />
    );
};

export { Button, buttonVariants };