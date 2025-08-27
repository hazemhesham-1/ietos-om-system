import { useSelector } from "react-redux";
import { BarChart2Icon, FileCheckIcon, MapPinCheckIcon, UserCogIcon } from "lucide-react";
import { useGetCurrentUserQuery } from "@/features/employees/employeesApi";
import { getCurrentLocation } from "@/features/visits/siteVisitSlice";
import SummaryCard from "@/features/dashboard/SummaryCard";
import SiteVisitTracker from "@/features/visits/SiteVisitTracker";
import ProposalGenerator from "@/features/proposals/ProposalGenerator";
import MapView from "@/components/MapView";
import OperationsMap from "@/features/dashboard/OperationsMap";
import OMProposalsTable from "@/features/dashboard/OMProposalsTable";

const dashboardStats = [
    {
        title: "Total Service Revenue",
        description: "Total income from site visits and maintenance services this month.",
        icon: BarChart2Icon,
    },
    {
        title: "Site Visits (Last 30 Days)",
        description: "Total number of technician site visits completed in the past month.",
        icon: MapPinCheckIcon,
    },
    {
        title: "Technicians On Site (Today)",
        description: "Technicians that are currently active on-site today.",
        icon: UserCogIcon,
    },
    {
        title: "Reports Submitted",
        description: "Daily reports submitted by technicians for today’s visits.",
        icon: FileCheckIcon,
    },
];

const Dashboard = () => {
    const { data: user } = useGetCurrentUserQuery();
    const currentLocation = useSelector((state) => getCurrentLocation(state));

    return (
        <>
            {(user?.role < 3000) && (
                <>
                    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary-300/30 *:data-[slot=card]:to-accent-200 grid grid-cols-1 gap-4 w-full *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
                        {dashboardStats.map((stat, i) => (
                            <SummaryCard
                                key={`stat-${i+1}`}
                                content={stat}
                                value={Math.round(Math.random() * 10)}
                            />
                        ))}
                    </div>
                    <OperationsMap/>
                    <OMProposalsTable/>
                </>
            )}
            {(user?.role >= 3000) && (
                <>
                    <section className="grid grid-cols-1 gap-8 w-full md:grid-cols-2 lg:grid-cols-3">
                        <SiteVisitTracker/>
                        <ProposalGenerator/>
                    </section>
                    {currentLocation && <MapView position={currentLocation}/>}
                </>
            )}
        </>
    );
};

export default Dashboard;