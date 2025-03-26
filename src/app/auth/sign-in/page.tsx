import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated";
import SignIn from "./signIn";

const SignInPage: React.FC = async () => {
    const isLoggedIn = await checkIsAuthenticated();

    if (isLoggedIn) {
        return redirect("/auth/dashboard");
    }

    return (<SignIn />);
}

export default SignInPage;