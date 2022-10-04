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
	PostsQuery,
} from "../src/generated/generates";
import useAuth from "../util/useAuth";

export default function HomePage() {
	const ref = useRef<HTMLTextAreaElement>(null);
	const { data: session } = useSession();
	const { data: { posts } = {}, refetch } = usePostsQuery<PostsQuery, Error>(gqlClient, {});
	const { mutate: createPost } = useCreatePostMutation<CreatePostMutation, Error>(gqlClient, {});
	const status = useAuth();

	// render user post on client
	// send post to backend post document
	// decide to fast reload page every minute???
	// post state fetches like the 20 most recent posts for now
	// TODO: later we can use categories for the post to determine which posts are displayed to the user
	// TODO: how do we protect our api? api keys, tokens , etc

	useEffect(() => {}, []);

	// if im using graphql, i need to have a reason to use it
	// https://stackoverflow.com/questions/54636363/how-to-generate-the-same-graphql-query-with-different-fields

	const handleSubmit = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			// TODO: USE MORE PARTIALS TYPES
			const newPostInput: CreatePostInput = {
				author: {
					_id: session?.user.id!,
					name: session?.user.name!,
					// !BUG: this is not working sometimes so we should have a default image or store user in context
					avatarImage: session?.user.image,
				},
				body: ref.current?.value!,
				likes: 0,
			};
			// when we create post it does return a post we can use to update the state <-- THIS WILL BE SLOWER SINCE WE HAVE TO WAIT FOR THE MUTATION TO FINISH
			createPost({ postInput: newPostInput });
			//! Probably not the best thing to do? but it is typesafe because we are using different types?
			posts?.push(newPostInput); // to render client side for user experience
		}
	};

	return (
		<>
			<NavBar />
			<Container size="xl">
				<Textarea label="Post Something noob" ref={ref} onKeyDown={handleSubmit}></Textarea>
				<Space h="md" />
				<Grid>
					<Col span={8}>
						<Stack spacing={10}>
							{posts
								?.slice() // slicing to clone array so we can reverse it
								.reverse()
								.map((post, index) => (
									<Post
										key={index}
										avatarImage={post.author.avatarImage}
										username={post.author.name} // ! CHANGE THIS TO USERNAME LATER
										body={post.body}
										likes={post.likes}
									/>
								))}
						</Stack>
					</Col>
					<Col span={4}>
						<MediaQuery query="(max-width: 1000px)" styles={{ display: "none" }}>
							<Stack spacing={10}>
								<div className="cen h-96 rounded-md bg-zinc-700"></div>
							</Stack>
						</MediaQuery>
					</Col>
				</Grid>
			</Container>
		</>
	);
}
