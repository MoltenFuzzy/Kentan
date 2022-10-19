import gqlClient from "../src/clients/gqlClient";
import {
	Grid,
	Container,
	Group,
	MediaQuery,
	Stack,
	Text,
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
import { MouseEventHandler, useEffect, useState } from "react";
import useUserStore from "../stores/user";
import { GetServerSideProps, NextPage } from "next";
import { getSdk } from "../src/graphql/sdk";
import { PostForm } from "../components/PostForm/PostForm";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { Posts } = getSdk(gqlClient);
	const posts = (await Posts({ limit: 10 })).posts;
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
	const { data: { user } = {} } = useUserQuery<UserQuery>(gqlClient, {
		userId: session?.user.id!,
	});
	const { setId, setName, setEmail, setAvatar, avatar } = useUserStore();

	useEffect(() => {
		setId(user?._id!);
		setName(user?.name!);
		setEmail(user?.email!);
		setAvatar(user?.avatar!);
	}, [setName, setEmail, setAvatar, user]);

	return (
		<>
			<NavBar marginBottom={20} />
			<Container size={1400}>
				<Grid columns={18} grow>
					<MediaQuery query="(max-width: 900px)" styles={{ display: "none" }}>
						<Col span={3}></Col>
					</MediaQuery>
					<Col span={10} className="flex justify-center">
						<Stack className="w-full" spacing={10}>
							<PostForm posts={posts} />
							{/* there will be issue when adding infinite scroll because we ssr the posts */}
							{posts.map((post, index) => (
								<Post
									key={index}
									id={post._id}
									avatarImage={post.author.avatarImage}
									username={post.author.name} // ! CHANGE THIS TO USERNAME LATER
									body={post.body}
									likes={post.likes}
									comments={post.comments}
								/>
							))}
						</Stack>
					</Col>
					<MediaQuery query="(max-width: 900px)" styles={{ display: "none" }}>
						<Col span={3}>
							<Stack spacing={10}>
								<div className="h-96 rounded-md bg-bgPost tw-border-solid  border-rose-500"></div>
							</Stack>
						</Col>
					</MediaQuery>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
