import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuth(): string | null {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			void router.push("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	return status; // "authenticated" | "unauthenticated" | "loading"
}
