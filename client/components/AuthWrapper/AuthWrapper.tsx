// gets rid of white flash on page load

import { useSession } from "next-auth/react";
import React from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const { status } = useSession();

	if (status === "loading") {
		return null;
	}

	return <>{children}</>;
};

export default AuthWrapper;
