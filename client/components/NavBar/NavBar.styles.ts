import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
	header: {
		boxShadow: "0 2px 4px 0 rgba(0,0,0,.3)",
		backgroundColor: theme.colorScheme === "dark" ? "#333333" : theme.colors.gray[0],
	},

	container: {
		height: "100%",
		alignItems: "center",
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr",
		"& > *:last-child": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			whiteSpace: "nowrap",
		},
	},

	center: {
		minWidth: 500, // 1000px
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	search: {
		minWidth: 600,
		[theme.fn.smallerThan("md")]: {
			minWidth: 550,
		},
		[theme.fn.smallerThan("sm")]: {
			minWidth: 400,
		},
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	toggle: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	register: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.lg,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
		},
	},
}));
