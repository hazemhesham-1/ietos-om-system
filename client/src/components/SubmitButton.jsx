import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/Spinner";

const SubmitButton = ({ children, isSubmitting, className, ...props }) => {
    return (
        <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className={cn("h-11 w-full max-w-xl text-base", className)}
            {...props}
        >
            {!isSubmitting ? children : <Spinner/>}
        </Button>
    );
};

export default SubmitButton;