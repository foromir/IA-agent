import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated"
import { redirect } from "next/navigation";

export default async function Home() {
  const isLoggedIn = await checkIsAuthenticated();

  if (!isLoggedIn) {
    return redirect("/auth/sign-in");
  }
  
  return redirect("/auth/dashboard");
}
