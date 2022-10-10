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
import { useSession, signOut, getSession } from "next-auth/react";
import { NavBar } from "../components/NavBar/NavBar";
import { Post, PostProps } from "../components/Post/Post";
import {
	useCreatePostMutation,
	CreatePostMutation,
	CreatePostInput,
	usePostsQuery,
	PostsQuery,
	useUserQuery,
	UserQuery,
} from "../src/generated/generates";
import useAuth from "../util/useAuth";
import { useEffect } from "react";
import useUserStore from "../stores/user";
import { withAuth } from "../util/withAuth";
import { GetServerSideProps, NextPage } from "next";
import { getSdk } from "../src/graphql/sdk";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const sdk = getSdk(gqlClient);
	const posts = (await sdk.Posts()).posts;
	return { props: { posts } };
};

interface PageProps {
	pageProps: {
		posts: PostsQuery["posts"];
	};
}

export const HomePage = ({ pageProps: { posts } }: PageProps) => {
	const { data: session } = useSession();
	// we have the user id from the session, we can use that to fetch the user data and store it in the user store
	const { data: { user } = {} } = useUserQuery<UserQuery>(gqlClient, { userId: session?.user.id! });
	const { mutate: createPost } = useCreatePostMutation<CreatePostMutation, Error>(gqlClient, {});
	const { setName, setEmail, setAvatar, avatar } = useUserStore();

	// useEffect(() => {
	// 	console.log(posts);
	// });

	useEffect(() => {
		setName(user?.name!);
		setEmail(user?.email!);
		setAvatar(user?.avatar!);
	}, [setName, setEmail, setAvatar, user]);

	const handleSubmit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			// use event target value over refs
			const newPostInput: CreatePostInput = {
				author: {
					_id: session?.user.id!,
					name: session?.user.name!,
					avatarImage: session?.user.image,
				},
				body: event.target.value,
				likes: 0,
			};
			// when we create post it does return a post we can use to update the state
			// ^ THIS WILL BE SLOWER SINCE WE HAVE TO WAIT FOR THE MUTATION TO FINISH
			createPost({ postInput: newPostInput });
			posts?.push(newPostInput); // to render client side for user experience - Optimistic Updates
		}
	};

	return (
		<>
			<NavBar />
			<Container size="xl">
				<Textarea label="Post Something noob" onKeyDown={handleSubmit}></Textarea>
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
								<div className="h-96 rounded-md bg-zinc-700"></div>
							</Stack>
						</MediaQuery>
					</Col>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
