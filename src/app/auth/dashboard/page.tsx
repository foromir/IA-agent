import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated";
import Dashboard from "./dashboard";
import { auth } from "@/app/lib/auth/authConfig";

export default async function DashboardPage() {
    const isLoggedIn = await checkIsAuthenticated();

    if (!isLoggedIn) {
        return redirect("/auth/sign-in");
    }

    const session = await auth();


    return (
        <Dashboard session={session}/>
    );
}