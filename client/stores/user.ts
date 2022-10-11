import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
	id: string;
	setId: (id: string) => void;
	name: string;
	setName: (name: string) => void;
	username: string;
	setUsername: (name: string) => void;
	email: string;
	setEmail: (email: string) => void;
	avatar: string;
	setAvatar: (avatar: string) => void;
}

const useUserStore = create<UserState, [["zustand/devtools", UserState]]>(
	devtools((set) => ({
		id: "",
		setId: (id) =>
			set((state) => ({
				...state,
				id,
			})),

		name: "",
		setName: (name) =>
			set((state) => ({
				...state,
				name,
			})),

		username: "",
		setUsername: (name) =>
			set((state) => ({
				...state,
				name,
			})),

		email: "",
		setEmail: (email) =>
			set((state) => ({
				...state,
				email,
			})),

		avatar: "",
		setAvatar: (avatar) =>
			set((state) => ({
				...state,
				avatar,
			})),
	}))
);

export default useUserStore;
