import gqlClient from "../src/clients/gqlClient";
import {
	Grid,
	Container,
	Group,
	MediaQuery,
	Stack,
	Button,
	Col,
	Textarea,
	Space,
} from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { Post, PostProps } from "../components/Post/Post";
import { useRouter } from "next/router";
import {
	useCreatePostMutation,
	CreatePostMutation,
	CreatePostInput,
} from "../src/generated/generates";

export default function HomePage() {
	const ref = useRef<HTMLTextAreaElement>(null);
	const router = useRouter();
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState<PostProps[]>([]);

	// render user post on client
	// send post to backend post document
	// decide to fast reload page every minute???
	// post state fetches like the 20 most recent posts for now
	// TODO: later we can use categories for the post to determine which posts are displayed to the user
	// TODO: how do we protect our api?

	// TURN INTO CUSTOM HOOK?
	useEffect(() => {
		if (status === "unauthenticated") {
			void router.push("/login");
		}
	}, [status]);

	// add get post query

	const { mutate } = useCreatePostMutation<CreatePostMutation, Error>(
		gqlClient, // client
		{
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	// if im using graphql, i need to have a reason to use it
	//! https://stackoverflow.com/questions/54636363/how-to-generate-the-same-graphql-query-with-different-fields

	const handleSubmit = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const newPost: PostProps = {
				avatar: session?.user.image!,
				username: session?.user.name!,
				body: ref.current?.value!,
			};
			const newPostInput: CreatePostInput = {
				author: session?.user.id!,
				avatarImage: session?.user.image,
				body: ref.current?.value!,
				likes: 10,
			};
			// so new posts are at the top
			setPosts([newPost, ...posts]);
			mutate({ postInput: newPostInput });
		}
	};

	return (
		<>
			<NavBar />
			<Container size="xl">
				<Textarea
					label="Post Something noob"
					ref={ref}
					onKeyDown={handleSubmit}
				></Textarea>
				<Space h="md" />
				<Grid>
					<Col span={8}>
						<Stack spacing={10}>
							{posts.map((post) => (
								<Post
									avatar={post.avatar}
									username={post.username}
									body={post.body}
								/>
							))}
						</Stack>
					</Col>
					<Col span={4}>
						<MediaQuery
							query="(max-width: 1000px)"
							styles={{ display: "none" }}
						>
							<Stack spacing={10}>
								<div className="bg-zinc-700 rounded-md h-96 cen"></div>
							</Stack>
						</MediaQuery>
					</Col>
				</Grid>
			</Container>
		</>
	);
}
