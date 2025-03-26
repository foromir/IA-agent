"use server";

import { auth } from "./authConfig";

export const checkIsAuthenticated = async () => {
    const session = await auth();
    console.log("Session:", session);
    return !!session;
}
