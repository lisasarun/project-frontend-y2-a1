"use server"

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signInSocial(provider: "google" | "github") {
    const {url} = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/dashboard"
        }
    })

    if(url){
        redirect(url)
    }
}
export const signOut = async() => {
        const result = await auth.api.signOut({headers: await headers()});
        return result;
    };