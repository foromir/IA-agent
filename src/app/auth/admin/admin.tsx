"use client"
import ConfigForm from "@/app/components/ConfigForm";
const AdminPage: React.FC = () => {

    return (
            <div className="grid md:grid-cols-12 gap-6">
                {/* Admin content goes here */}
                <div className="md:col-span-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Admin Panel
                        </h2>
                        <ConfigForm />
                        {/* <PromptConfigGeneral /> */}
                        <div className="h-4"></div>
                        {/* <PromptConfigSummary /> */}
                        {/* Add your admin features here */}
                    </div>
                </div>
            </div>
    );
};

export default AdminPage;