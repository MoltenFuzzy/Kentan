import {
	ActionIcon,
	Avatar,
	Button,
	Divider,
	Group,
	Menu,
	Stack,
	Text,
	Textarea,
} from "@mantine/core";
import { IconDots, IconFlame, IconMessage } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStore from "stores/user";

export interface Comment {}

export interface CommentSectionProps {
	id: string;
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likesCount: number;
	isLikedByThisUser: boolean;
	commentsCount: number;
	comments: any[];
}

export const CommentSection = ({
	id: postId,
	body,
	username,
	avatarImage,
	likesCount,
	isLikedByThisUser,
	commentsCount,
	comments,
}: CommentSectionProps) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const [likesValue, setLikesValue] = React.useState(likesCount);
	const [isLiked, setIsLiked] = React.useState(isLikedByThisUser); //! NOTE: STATE NOT PERSISTED
	const { id: userId } = useUserStore();
	const router = useRouter();

	const handleDelete = () => {
		console.log("delete comment");
		router.replace(router.asPath);
	};

	return (
		<Stack className="rounded-md p-2 post-border-plain bg-bgPost" spacing={7}>
			<Textarea
				placeholder="Reply to this post"
				size="lg"
				minRows={4}
				error={error}
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
			/>
			<div className="flex justify-end">
				<Button
					onClick={() => {}}
					disabled={value.length === 0}
					color="orange"
					radius={5}
					size="sm"
					className="shadow-lg"
				>
					Post
				</Button>
			</div>
			{comments.length === 0 ? (
				<></>
			) : (
				<>
					<Divider></Divider>
					<div className="p-6">
						<Group className="justify-between ">
							<Group>
								<Avatar src={avatarImage} radius="xl" />
								<Text
									onClick={(e) => {
										e.stopPropagation();
										router.push(username);
									}}
									className="hover:underline"
									weight={700}
								>
									{username}
								</Text>
							</Group>
							<Group className="self-start" onClick={(e) => e.stopPropagation()}>
								<Menu shadow="md" width={100} closeOnClickOutside>
									<Menu.Target>
										<ActionIcon>
											<IconDots />
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item color="red" onClick={handleDelete}>
											Delete
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
						</Group>
						<Text size="sm" className="my-3 whitespace-pre-line">
							{body}
						</Text>
						<Group className="mt-1">
							<ActionIcon
								size="lg"
								onClick={(e) => {
									// https://stackoverflow.com/questions/13966734/child-element-click-event-trigger-the-parent-click-event
									e.stopPropagation();
									if (!isLiked) {
										setLikesValue(likesValue + 1);
										setIsLiked(true);
									} else {
										setLikesValue(likesValue - 1);
										setIsLiked(false);
									}
								}}
							>
								<IconFlame size={100} strokeWidth={2} color={"orange"} />
								<Text>{likesValue}</Text>
							</ActionIcon>
							<ActionIcon size="lg">
								<IconMessage size={100} strokeWidth={2} color={"orange"} />
								<Text>{commentsCount}</Text>
							</ActionIcon>
						</Group>
					</div>
				</>
			)}
		</Stack>
	);
};
