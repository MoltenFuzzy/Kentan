import React from "react";
import useUserStore from "../stores/user";

export const username = () => {
	const user = useUserStore();
	return <div>{user.email}</div>;
};

export default username;
