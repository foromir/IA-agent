"use client"
import ChatGPTAgent from "@/app/components/ChatGPTAgent";
import useDashboard from "./useDashboard";
import SummaryList from "@/app/components/SummaryList";
import { Button } from "@/app/components/ui/button";
import { Session } from "next-auth";

const Dashboard: React.FC<{ session: Session }> = ({ session }) => {
    const { messages, setMessages, generateSummary, summaries, deleteSummary, isLoading } = useDashboard();

    return (
            <div className="grid md:grid-cols-12 gap-6">
                {/* Sidebar with Quick Stats */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                       
                        <div className="text-md text-purple-600 dark:text-purple-400 mb-6 font-medium">
                           <span className=" font-semibold text-gray-800 dark:text-white mb-4 mr-3">
                                Your activity
                            </span>  
                            {session?.user?.name}
                        </div>
                        
                        <div className="space-y-4">
                        <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Messages</span>
                                    <span className="font-medium text-purple-600">{messages.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Generate summary</span>
                                    <Button className=" bg-blue-500 text-white"onClick={generateSummary}>
                                        {isLoading ? 'loading...' : 'Generate Summary'}
                                    </Button>
                                    <span className="font-medium text-purple-600">{summaries.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? <p>Loading...</p> : <SummaryList summaries={summaries} deleteSummary={deleteSummary} />}
                </div>

                {/* Chat Section */}
                <div className="md:col-span-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            AI-Assistant 
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Ask our assistant about something
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <ChatGPTAgent setMessages={setMessages} messages={messages} />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;