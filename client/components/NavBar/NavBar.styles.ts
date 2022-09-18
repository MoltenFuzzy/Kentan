import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
	head: {
		boxShadow: "0 2px 4px 0 rgba(0,0,0,.3)",
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[9]
				: theme.colors.gray[0],
	},

	header: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		height: "100%",
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	search: {
		width: "45%",
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
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.lg,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
		},
	},
}));
