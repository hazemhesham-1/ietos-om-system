import { useNavigate, useParams } from "react-router-dom";
import NavButtons from "@/components/NavButtons";
import OMProposalForm from "@/features/proposals/OMProposalForm";
import RehabProposalForm from "@/features/proposals/RehabProposalForm";

const OperationDetails = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    return (
        <>
            {type === "om-offer" && <OMProposalForm/>}
            {type === "rehab" && <RehabProposalForm/>}
            <NavButtons onBackTo={() => navigate(-1)}/>
        </>
    );
};

export default OperationDetails;