import NavCard from "@/components/NavCard";

const ProposalSelector = () => {
    return (
        <section className="space-y-8">
            <h1 className="text-slate-700 text-2xl font-bold">
                Select the type of the technical proposal
            </h1>
            <div className="grid gap-x-20 gap-y-10 lg:grid-cols-2">
                <NavCard
                    title="O&M Offer"
                    href="/create-proposal/om-offer/client-info"
                    description="Comprehensive maintenance and monitoring services for your treatment system."
                    imageSrc="/om-offer-card.png"
                    imageAlt="Engineer inspecting water treatment facility for operation and maintenance"
                />
                <NavCard
                    title="Rehabilitation"
                    href="/create-proposal/rehab/client-info"
                    description="Upgrade and restore aging infrastructure to extend system lifespan and safety."
                    imageSrc="/rehabilitation-card.png"
                    imageAlt="Technicians restoring old equipment at a water treatment facility"
                />
                <NavCard
                    title="Custom Proposal"
                    href="/create-proposal/others/client-info"
                    description="Design tailored solutions for unique water treatment challenges and non-standard project requirements."
                    imageSrc="/custom-proposal-card.png"
                    imageAlt="Engineers collaborating on a custom water treatment solution"
                />
            </div>
        </section>
    );
};

export default ProposalSelector;