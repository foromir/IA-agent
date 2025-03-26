"use client"
import SignOutButton from "@/app/components/SignOutButton";
import ChatGPTAgent from "@/app/components/ChatGPTAgent";
import useDashboard from "./useDashboard";
import { Button } from "@/app/components/ui/button";
import SummaryList from "@/app/components/SummaryList";
import { Session } from "next-auth";
const Dashboard: React.FC<{ session: Session }> = ({ session }) => {
    const { messages, setMessages, generateSummary,  summaries, deleteSummary ,isLoading} = useDashboard();


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                                Welcome, {session?.user?.name}! 👋
                            </p>
                        </div>
                        <SignOutButton />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-12 gap-6">
                    {/* Sidebar with Quick Stats */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                Your activity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Messages</span>
                                    <span className="font-medium text-purple-600">{messages.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Generate summary</span>
                                    <Button variant="outline" onClick={generateSummary}>
                                        {isLoading ? 'loading...' : 'Generate Summary'}
                                    </Button>
                                    <span className="font-medium text-purple-600">{summaries.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Component */}
                        <SummaryList summaries={summaries} deleteSummary={deleteSummary} />
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
            </div>
        </div>
    )
}

export default Dashboard;