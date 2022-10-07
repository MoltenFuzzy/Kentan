import { useSession } from "next-auth/react";
import React from "react";

export default function ProfilePage() {
	const { data: session } = useSession();
	return <div>{session ? session?.user.email : "No Session Found"}</div>;
}
