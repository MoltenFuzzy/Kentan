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
import useAppStore from "stores/app";
import { useQueryClient } from "@tanstack/react-query";

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
	const queryClient = useQueryClient();
	const { data: session } = useSession();
	const { selectedPost, selectedUser } = useAppStore((state) => state);
	const { setId, setName, setEmail, setAvatar } = useUserStore((state) => state);
	const [userId, setUserId] = useState(session?.user.id);
	// we have the user id from the session, we can use that to fetch the user data and store it in the user store
	const { data: { user: sessionUser } = {} } = useUserQuery<UserQuery>(gqlClient, {
		userId: userId!,
	});

	useEffect(() => {
		queryClient.invalidateQueries(["User"]);
		setUserId(selectedUser);
		console.log(session?.user.id);
		console.log(sessionUser);
		console.log(sessionUser?.followers?.includes(session?.user.id!)!);
	}, [selectedUser]);

	useEffect(() => {
		setId(session?.user.id!);
		setName(session?.user.name!);
		setEmail(session?.user.email!);
		setAvatar(session?.user.image!);
	}, [setName, setEmail, setAvatar, sessionUser]);

	const post = posts.find((x) => x._id === selectedPost);

	return (
		<>
			<NavBar marginBottom={20} />
			<Container size={1400}>
				<Grid columns={18} grow>
					<Col sm={18} md={3}>
						{/* TODO: STOP PAGE RERENDERS */}
						{/* Find post id in posts array and get user data */}
						<div className="sticky top-3">
							{post && (
								// state persists, but the component rerenders with new data
								<ProfileCard
									userId={post.author._id}
									image={
										"https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
									}
									avatar={post?.author.avatarImage!}
									name={post?.author.name!}
									job={"Jobless"}
									stats={[]}
									isFollowingUser={sessionUser?.followers?.includes(session?.user.id!)!}
								/>
							)}
						</div>
					</Col>
					<Col sm={18} md={10} className="flex justify-center">
						<Stack className="w-full" spacing={10}>
							<PostForm />
							{/* there will be issue when adding infinite scroll because we ssr the posts */}
							{posts.map((post, index) => (
								<Post
									key={index}
									id={post._id}
									author={post.author}
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
						<Stack spacing={10} className="sticky top-3">
							<div className="h-96 rounded-md bg-bgPost tw-border-solid  border-rose-500 text-center ">
								STUFF
							</div>
						</Stack>
					</Col>
				</Grid>
			</Container>
		</>
	);
};

export default HomePage;
