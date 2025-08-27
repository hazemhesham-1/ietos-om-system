import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { MapPinIcon, RadioTowerIcon, StopCircleIcon } from "lucide-react";
import { capitalizeText } from "@/lib/utils";
import useGeolocation from "@/hooks/useGeolocation";
import { useGetCurrentUserQuery } from "../employees/employeesApi";
import { useAddVisitMutation, useUpdateVisitMutation } from "./siteVisitApi";
import { endVisit, updateLocation, setSiteName, startVisit } from "./siteVisitSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import SubmitButton from "@/components/SubmitButton";

const SiteVisitTracker = () => {
    const { t } = useTranslation();
    const { data: user } = useGetCurrentUserQuery();
    const [addSiteVisit, { isLoading }] = useAddVisitMutation();
    const [updateSiteVisit, { isLoading: isUpdating }] = useUpdateVisitMutation();

    const dispatch = useDispatch();
    const { visitId, siteName, locationHistory } = useSelector((state) => state.siteVisit);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const { location } = useGeolocation(onUpdateLocation, isBroadcasting);
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();

    const lastUpdate = locationHistory.length > 0 ? format(locationHistory.at(-1).timestamp, "PPpp") : null;

    function onSubmit(data) {
        if(isBroadcasting) {
            if(confirm(t("messages.stopBroadcasting.description"))) {
                setIsBroadcasting(false);
                dispatch(endVisit());
            }
        }
        else if(data.siteName) {
            setIsBroadcasting(true);
            dispatch(setSiteName(data.siteName));
        }
    }

    async function onUpdateLocation() {
        if(!location) return;

        const locationData = {
            employeeId: user.id,
            siteName,
            siteLocation: {
                lat: location.lat,
                long: location.long
            },
        };

        if(!visitId) {
            const { data: visitData } = await addSiteVisit({ ...locationData, status: "on_site" });
            if(visitData) {
                dispatch(startVisit(visitData));
            }
        }
        else {
            const { data: visitData } = await updateSiteVisit({ ...locationData, id: visitId });
            dispatch(updateLocation(visitData.siteLocation));
        }
    }

    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <CardTitle className="text-primary-800 flex items-center gap-2 text-xl">
                    <MapPinIcon className="size-6"/>
                    {t("common.siteVisitTracker")}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="siteName">
                            {t("forms.labels.siteName")}
                        </Label>
                        <Input
                            id="siteName"
                            placeholder={t("forms.placeholders.siteName")}
                            disabled={isBroadcasting}
                            {...register("siteName", { required: true })}
                        />
                    </div>
                    <SubmitButton
                        isSubmitting={isSubmitting || isLoading}
                        className={isBroadcasting ? "bg-red-600 hover:bg-red-700" : undefined}
                    >
                        {isBroadcasting ? (
                            <>
                                <StopCircleIcon className="size-5"/>
                                {t("buttons.stopBroadcast")}
                            </>
                        ) : (
                            <>
                                <RadioTowerIcon className="size-5"/>
                                {t("buttons.startBroadcast")}
                            </>
                        )}
                    </SubmitButton>
                </form>
                {(siteName && isBroadcasting) && (
                    <div className="text-muted-foreground mt-4 text-sm">
                        <p>
                            {t("messages.broadcastingStart", { name: capitalizeText(siteName) })}
                        </p>
                        <p>
                            {isUpdating ? t("common.location.updating") : lastUpdate ? t("common.location.lastUpdated", { time: lastUpdate }) : ""}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SiteVisitTracker;