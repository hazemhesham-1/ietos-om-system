import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <main className="bg-[url('/background.png')] bg-cover flex flex-col items-center gap-8 relative min-h-screen w-full px-2 py-8 sm:p-8">
                <Outlet/>
            </main>
        </>
    );
};

export default MainLayout;