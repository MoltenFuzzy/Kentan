import {
	FollowUserMutation,
	UnfollowUserMutation,
	useFollowUserMutation,
	useUnfollowUserMutation,
} from "@gqlSDK/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { createStyles, Card, Avatar, Text, Group, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import useAppStore from "stores/app";
import useUserStore from "stores/user";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	card: {
		//! REPLACE THIS WITH TAILWIND COLOR bg-bgPost later
		backgroundColor: theme.colorScheme === "dark" ? "#181515" : theme.white,
	},

	avatar: {
		border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
	},
}));

interface ProfileCardProps {
	userId: string;
	image: string;
	avatar: string;
	name: string;
	job: string;
	stats?: { label: string; value: string }[];
	isFollowingUser?: boolean;
}

export function ProfileCard({
	userId,
	image,
	avatar,
	name,
	job,
	stats,
	isFollowingUser,
}: ProfileCardProps) {
	const { id: currentUserId } = useUserStore((state) => state);
	const { mutate: FollowUser } = useFollowUserMutation<FollowUserMutation, Error>(gqlClient);
	const { mutate: UnfollowUser } = useUnfollowUserMutation<UnfollowUserMutation, Error>(gqlClient);
	const [isFollowing, setIsFollowing] = useState(isFollowingUser);
	const { classes, theme } = useStyles();

	useEffect(() => {
		// update the isFollowing state to the isFollowingUser prop always
		console.log("isFollowingUser", isFollowingUser);
		// if current follow state is not equal to the follow state from the prop
		// component state should always be equal to the prop
		setIsFollowing(isFollowingUser);
	}, [userId, isFollowingUser]); // if new userId is passed in, update the state

	// const stats = [
	// 	{ label: "Posts", value: "1" },
	// 	{ label: "Followers", value: "1" },
	// 	{ label: "Following", value: "1" },
	// ];

	const items = stats?.map((stat) => (
		<div key={stat.label}>
			<Text align="center" size="lg" weight={500}>
				{stat.value}
			</Text>
			<Text align="center" size="sm" color="dimmed">
				{stat.label}
			</Text>
		</div>
	));

	return (
		<Card withBorder p="xl" radius="md" className={`${classes.card} post-border cursor-pointer`}>
			<Card.Section sx={{ backgroundImage: `url(${image})`, height: 100 }} />
			<Avatar src={avatar} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
			<Text align="center" size="lg" weight={500} mt="sm">
				{name}
			</Text>
			<Text align="center" size="sm" color="dimmed">
				{job}
			</Text>
			<Group mt="md" position="center" spacing={30}>
				{items}
			</Group>
			{currentUserId !== userId && (
				<Button
					fullWidth
					radius="md"
					mt="xl"
					size="md"
					color={theme.colorScheme === "dark" ? undefined : "dark"}
					onClick={(e) => {
						// https://stackoverflow.com/questions/13966734/child-element-click-event-trigger-the-parent-click-event
						// e.stopPropagation();
						if (!isFollowing) {
							FollowUser({ userId: userId, followerId: currentUserId });
							setIsFollowing(true);
						} else {
							UnfollowUser({ userId: userId, followerId: currentUserId });
							setIsFollowing(false);
						}
					}}
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</Button>
			)}
		</Card>
	);
}
