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
	usePostsQuery,
} from "../src/generated/generates";
import { PostsQuery } from "../src/graphql/sdk";

export default function HomePage() {
	const ref = useRef<HTMLTextAreaElement>(null);
	const router = useRouter();
	const { data: session, status } = useSession();
	const { data: postPayload } = usePostsQuery<PostsQuery, Error>(gqlClient, {});
	const [posts, setPosts] = useState<PostProps[]>([]);

	// render user post on client
	// send post to backend post document
	// decide to fast reload page every minute???
	// post state fetches like the 20 most recent posts for now
	// TODO: later we can use categories for the post to determine which posts are displayed to the user
	// TODO: how do we protect our api? api keys, tokens , etc

	// TURN INTO CUSTOM HOOK?
	useEffect(() => {
		if (status === "unauthenticated") {
			void router.push("/login");
		}
	}, [status]);

	useEffect(() => {
		let posts: PostProps[] = [];
		if (postPayload?.posts) {
			postPayload.posts.forEach((post) => {
				// posts.push({
				// 	username: post.username,
				// 	avatarImage: post.avatarImage,
				// 	body: post.body,
				// 	likes: post.likes,
				// });
			});
		}
		setPosts(posts);
	}, []);

	// add get post query

	const { mutate: createPost } = useCreatePostMutation<
		CreatePostMutation,
		Error
	>(
		gqlClient, // client
		{
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	// if im using graphql, i need to have a reason to use it
	// https://stackoverflow.com/questions/54636363/how-to-generate-the-same-graphql-query-with-different-fields

	const handleSubmit = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			const newPost: PostProps = {
				avatarImage: session?.user.image!,
				username: session?.user.name!,
				body: ref.current?.value!,
				likes: 0,
			};
			const newPostInput: CreatePostInput = {
				authorId: session?.user.id!,
				avatarImage: session?.user.image,
				body: ref.current?.value!,
				likes: 10,
			};
			// so new posts are at the top
			setPosts([newPost, ...posts]);
			createPost({ postInput: newPostInput });
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
							{posts.map((post, index) => (
								<Post
									key={index}
									avatarImage={post.avatarImage}
									username={post.username}
									body={post.body}
									likes={post.likes}
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
