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
import { PostsQuery, useUserQuery, UserQuery } from "@gqlSDK/generated/generates";
import { MouseEventHandler, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { PostForm } from "components/PostForm/PostForm";
import { ProfileCard } from "components/ProfileCard/ProfileCard";
import { getSdk } from "@gqlSDK/graphql/sdk";
import useUserStore from "stores/user";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { Posts } = getSdk(gqlClient);
	const posts = (await Posts({ limit: 100 })).posts;
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
	const { setId, setName, setEmail, setAvatar } = useUserStore();

	useEffect(() => {
		console.log(posts);
	}, [posts]);

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
					<Col sm={18} md={3}>
						{/* if profile has been selected, then render else do not render */}
						<ProfileCard image={""} avatar={""} name={""} job={""} stats={[]} />
					</Col>
					<Col sm={18} md={10} className="flex justify-center">
						<Stack className="w-full" spacing={10}>
							<PostForm />
							{/* there will be issue when adding infinite scroll because we ssr the posts */}
							{posts.map((post, index) => (
								<Post
									key={index}
									id={post._id}
									avatarImage={post.author.avatarImage}
									username={post.author.name} // ! CHANGE THIS TO USERNAME LATER
									body={post.body}
									likesCount={post.likesCount}
									// TODO: CHANGE ARRAY TO SET IN GRAPHQL TO REMOVE DUPLICATES & CONSTANT TIME LOOKUP?
									isLikedByThisUser={post.likedByUsers?.includes(session?.user.id!)!}
									commentsCount={post?.comments?.length!}
								/>
							))}
						</Stack>
					</Col>
					<Col sm={18} md={3}>
						<Stack spacing={10}>
							<div className="h-96 rounded-md bg-bgPost tw-border-solid  border-rose-500"></div>
						</Stack>
					</Col>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
