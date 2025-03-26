"use client";

import { handleSignOut } from '@/app/lib/auth/signOutServerAction';

export default function SignOutButton() {
    return (
        <button 
            onClick={() => handleSignOut()}
            className="inline-flex items-center px-4 py-2 rounded-lg
                bg-white dark:bg-gray-800
                hover:bg-gray-50 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-200 font-medium text-sm
                transition-all duration-200 ease-in-out
                border border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow
                focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
                dark:focus:ring-gray-700"
        >
            <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
            </svg>
            Logout
        </button>
    );
}