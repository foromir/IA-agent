'use client';

import { useState } from 'react';
import { Summary } from '@/app/types/summary';

interface SummaryListProps {
    summaries: Summary[];
    deleteSummary: (summaryId: string) => void;
}

const SummaryList: React.FC<SummaryListProps> = ({ summaries, deleteSummary }) => {
    const [expandedIndex, setExpandedIndex] = useState<number>(-1);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Conversation Summaries
            </h3>
            <div className="space-y-4">
                {summaries && summaries.map((summary, index) => (
                    <div key={summary._id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div 
                            className="flex justify-between items-center cursor-pointer" 
                            onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                        >
                            <p className="text-gray-600 dark:text-gray-300 truncate">
                                {summary.content}
                            </p>
                            <button
                                    onClick={() => deleteSummary(summary._id)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                                >
                                    <svg 
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                                        fill="none" 
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            <svg 
                                className={`w-5 h-5 transition-transform ${expandedIndex === index ? 'transform rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {expandedIndex === index && (
                            <div className="mt-2 text-gray-600 dark:text-gray-300">
                                <p>{summary.content}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Created: {new Date(summary.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
                {(!summaries || summaries.length === 0) && (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                        No summaries generated yet
                    </p>
                )}
            </div>
        </div>
    );
};

export default SummaryList; 