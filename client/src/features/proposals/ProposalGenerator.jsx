import { Link } from "react-router-dom";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

const ProposalGenerator = () => {
    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <CardTitle className="text-accent-700 flex items-center gap-2 text-xl">
                    <FileTextIcon className="size-6"/>
                    Technical Proposal Generator
                </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
                Create accurate, consistent, and professional water treatment proposals in just a few steps.
            </CardContent>
            <CardFooter>
                <Link
                    to="/create-proposal"
                    className="bg-primary-700 text-slate-100 rounded-lg inline-flex items-center justify-center w-full px-5 py-2.5 font-medium group hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 transition-colors"
                >
                    Get started
                    <ArrowRightIcon className="size-5 ms-2 group-hover:translate-x-2 transition-transform"/>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProposalGenerator;