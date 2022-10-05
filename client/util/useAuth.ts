import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuth(): string | null {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
		} else if (status === "authenticated") {
			void router.push("/home");
		}
	}, [status]);

	return status; // "authenticated" | "unauthenticated" | "loading"
}
