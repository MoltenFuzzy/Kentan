import create from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
	selectedUser: string;
	setSelectedUser: (selectedUser: string) => void;
	selectedPost: string;
	setSelectedPost: (selectedPost: string) => void;
}

const useAppStore = create<AppState>()(
	devtools((set) => ({
		selectedUser: "",
		setSelectedUser: (selectedUser) =>
			set((state) => ({
				...state,
				selectedUser,
			})),
		selectedPost: "",
		setSelectedPost: (selectedPost) =>
			set((state) => ({
				...state,
				selectedPost,
			})),
	}))
);

export default useAppStore;
