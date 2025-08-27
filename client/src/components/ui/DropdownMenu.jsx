import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function DropdownMenu(props) {
    return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props}/>;
}

function DropdownMenuPortal(props) {
    return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props}/>;
}

function DropdownMenuTrigger(props) {
    return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}/>;
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    const baseClass = "bg-slate-100 text-slate-800 border rounded-md min-w-32 p-1 overflow-x-hidden overflow-y-auto shadow-md z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)";

    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                className={cn(baseClass, className)}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

function DropdownMenuGroup(props) {
    return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props}/>;
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    const baseClass = "rounded-sm relative flex items-center gap-2 px-2 py-1.5 text-sm cursor-default outline-hidden select-none focus:bg-accent-100 focus:text-accent-800 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[inset]:ps-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(baseClass, className)}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    const baseClass = "rounded-sm relative flex items-center gap-2 ps-8 pe-2 py-1.5 text-sm cursor-default outline-hidden select-none focus:bg-accent-100 focus:text-accent-800 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none";

    return (
        <DropdownMenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            className={cn(baseClass, className)}
            checked={checked}
            {...props}
        >
            <span className="absolute left-2 flex items-center justify-center size-3.5 pointer-events-none">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CheckIcon className="size-4"/>
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup(props) {
    return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props}/>;
}

function DropdownMenuRadioItem({ children, className, ...props}) {
    const baseClass = "rounded-sm relative flex items-center gap-2 ps-8 pe-2 py-1.5 text-sm cursor-default outline-hidden select-none focus:bg-accent-100 focus:text-accent-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

    return (
        <DropdownMenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            className={cn(baseClass, className)}
            {...props}
        >
            <span className="absolute left-2 flex items-center justify-center size-3.5 pointer-events-none">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CircleIcon className="size-2 fill-current"/>
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuLabel({ className, inset, ...props }) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn("px-2 py-1.5 text-sm font-medium data-[inset]:ps-8", className)}
            {...props}
        />
    );
}

function DropdownMenuSeparator({ className, ...props }) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("bg-border -mx-1 my-1 h-px", className)}
            {...props}
        />
    );
}

function DropdownMenuShortcut({ className, ...props }) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn("text-muted-foreground ms-auto text-xs tracking-widest", className)}
            {...props}
        />
    );
}

function DropdownMenuSub(props) {
    return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props}/>;
}

function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    const baseClass = "rounded-sm flex items-center px-2 py-1.5 text-sm cursor-default outline-hidden select-none focus:bg-accent-100 focus:text-accent-800 data-[state=open]:bg-accent-100 data-[state=open]:text-accent-800 data-[inset]:ps-8";

    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(baseClass, className)}
            {...props}
        >
            {children}
            <ChevronRightIcon className="size-4 ms-auto"/>
        </DropdownMenuPrimitive.SubTrigger>
    );
}

function DropdownMenuSubContent({ className, ...props }) {
    const baseClass = "bg-slate-100 text-slate-800 border rounded-md min-w-32 p-1 overflow-hidden shadow-lg z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)";

    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            className={cn(baseClass, className)}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
};