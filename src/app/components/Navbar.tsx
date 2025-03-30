"use client"
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? "bg-purple-100 dark:bg-gray-700" : "";
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <Link 
                            href="/auth/dashboard"
                            className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors ${isActive('/auth/dashboard')}`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href="/auth/admin"
                            className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors ${isActive('/auth/admin')}`}
                        >
                            Admin
                        </Link>
                    </div>
                    <SignOutButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 