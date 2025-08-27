import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import MainLayout from "./pages/MainLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ProposalForm from "./pages/ProposalForm";
import EmployeeLogin from "./pages/EmployeeLogin";
import ClientDetails from "./features/steps/ClientDetails";
import WaterDetails from "./features/steps/WaterDetails";
import OperationDetails from "./features/steps/OperationDetails";
import ContractDetails from "./features/steps/ContractDetails";
import DocumentGenerator from "./features/steps/DocumentGenerator";
import ProposalSelector from "./features/proposals/ProposalSelector";
import ProposalsManagement from "./pages/ProposalsManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    { index: true, element: <Dashboard/> },
                    { path: "/create-proposal", element: <ProposalSelector/> },
                    { path: "/staff-management", element: <EmployeeManagement/> },
                    { path: "/proposals", element: <ProposalsManagement/> },
                ]
            },
            {
                element: <ProposalForm/>,
                children: [
                    { path: "/create-proposal/:type/client-info", element: <ClientDetails/> },
                    { path: "/create-proposal/:type/water-details", element: <WaterDetails/> },
                    { path: "/create-proposal/:type/work-scope", element: <OperationDetails/> },
                    { path: "/create-proposal/:type/contract-details", element: <ContractDetails/> },
                    { path: "/create-proposal/:type/generate-doc", element: <DocumentGenerator/> },
                ],
            },
        ]
    },
    {
        path: "/auth/employee/login",
        element: <EmployeeLogin/>
    },
]);

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const isArabic = i18n.language === "ar";

        document.documentElement.setAttribute("dir", isArabic ? "rtl" : "ltr");
        document.documentElement.setAttribute("lang", isArabic ? "ar" : "en");
        document.body.style.fontFamily = isArabic ? "'Cairo', sans-serif" : "'Poppins', sans-serif";
    }, [i18n.language]);

    return (
        <>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
    );
};

export default App;