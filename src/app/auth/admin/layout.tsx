"use client"
import Navbar from "@/app/components/Navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 space-y-8">
            
                
                {/* Main Content */}
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout; 