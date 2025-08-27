import { useTranslation } from "react-i18next";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/Button";

const NavButtons = (props) => {
    const {
        size = "lg",
        onBackTo,
        onNextTo,
        hideBack,
        backDisabled,
        nextDisabled,
        ...rest
    } = props;

    const { t } = useTranslation();

    return (
        <div className={`grid gap-2 max-w-xl mx-auto mt-5 ${!hideBack ? "grid-cols-2" : ""}`}>
            {!hideBack && (
                <Button
                    type="button"
                    size={size}
                    onClick={onBackTo}
                    disabled={backDisabled}
                    className="flex-row-reverse"
                    {...rest}
                >
                    {t("buttons.back")}
                    <ArrowLeftIcon className="rtl:rotate-180"/>
                </Button>
            )}
            <Button
                size={size}
                onClick={onNextTo}
                disabled={nextDisabled}
                {...rest}
            >
                {t("buttons.next")}
                <ArrowRightIcon className="rtl:rotate-180"/>
            </Button>
        </div>
    );
};

export default NavButtons;