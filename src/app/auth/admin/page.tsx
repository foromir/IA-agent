import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated";
import Admin from "./admin";

export default async function DashboardPage() {
    const isLoggedIn = await checkIsAuthenticated();

    if (!isLoggedIn) {
        return redirect("/auth/sign-in");
    }


    return (
        <Admin />
    );
}