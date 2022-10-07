import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const { status } = useSession();
	const router = useRouter();

	if (status === "loading") return null;
	// } else if (status === "unauthenticated") {
	// 	router.push("/login");
	// 	return null;
	// }

	return <>{children}</>;
};

export default AuthWrapper;
