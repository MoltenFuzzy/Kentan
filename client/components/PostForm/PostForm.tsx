import { MouseEventHandler, useState } from "react";
import { Stack, Textarea, Button } from "@mantine/core";
import { CreatePostInput } from "../../src/graphql/sdk";
import useUserStore from "../../stores/user";
import {
	CreatePostMutation,
	useCreatePostMutation,
	PostsQuery,
} from "../../src/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { useRouter } from "next/router";

// 	TODO: disable post button if there is no text in the textarea
export const PostForm = ({ posts }: { posts: PostsQuery["posts"] }) => {
	const router = useRouter();
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const { id: userId, name, avatar } = useUserStore();
	const { mutate: createPost } = useCreatePostMutation<CreatePostMutation, Error>(gqlClient, {});

	const handlePost = () => {
		// use event target value over refs
		//* ^only use refs when you dont want a rerender or extract to component
		const newPostInput: CreatePostInput = {
			author: {
				_id: userId,
				name: name,
				avatarImage: avatar,
			},
			body: value,
			likes: 0,
		};
		// dont allow empty posts
		if (newPostInput.body.length === 0) {
			setError("Post cannot be empty");
			return;
		}

		// when we create post it does return a post we can use to update the state
		// ^ THIS WILL BE SLOWER SINCE WE HAVE TO WAIT FOR THE MUTATION TO FINISH
		createPost({ postInput: newPostInput });
		setError(""); // reset error state
		setValue(""); // set value to empty string after posting
		router.replace(router.asPath);
	};

	return (
		<div className="rounded-md bg-bgPost">
			<Stack spacing="xs" className="p-2">
				<Textarea
					placeholder="Your Post"
					size="lg"
					minRows={4}
					error={error}
					value={value}
					onChange={(event) => setValue(event.currentTarget.value)}
				/>
				<div className="flex justify-end">
					<Button
						onClick={handlePost}
						disabled={value.length === 0}
						color="orange"
						radius={5}
						size="sm"
						className="shadow-lg"
					>
						Post
					</Button>
				</div>
			</Stack>
		</div>
	);
};
