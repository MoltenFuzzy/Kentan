import gqlClient from "@gqlSDK/clients/gqlClient";
import { CommentsByPostIdQuery, getSdk, PostByPostIdQuery } from "@gqlSDK/graphql/sdk";
import { Col, Container, Grid, Stack } from "@mantine/core";
import { CommentSection } from "components/CommentSection/CommentSection";
import { NavBar } from "components/NavBar/NavBar";
import { Post } from "components/Post/Post";
import { ProfileCard } from "components/ProfileCard/ProfileCard";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// fetch the post and comments from server
	const { PostByPostId, CommentsByPostId } = getSdk(gqlClient); //! POPULATING COMMENTS AND REFRESHING IS ALWAYS LATE?

	const post = await PostByPostId({
		postId: ctx.params?.postId as string,
		populateComments: false, // dont work right >:(
	})
		.catch((error) => console.error(error)) // not sure if this is needed but whatever
		.then((res) => res?.postByPostId);

	if (!post) return { notFound: true }; // backend will return null if post id not found

	//! directly fetching comments from given post accurately reflects the comments
	const comments = (await CommentsByPostId({ postId: ctx.params?.postId as string }))
		.commentsByPostId;
	return { props: { post, comments } };
};

interface PageProps {
	pageProps: {
		post: PostByPostIdQuery["postByPostId"];
		comments: CommentsByPostIdQuery["commentsByPostId"];
	};
}

const FullPost = ({ pageProps: { post, comments } }: PageProps) => {
	const { data: session } = useSession();

	useEffect(() => {
		// like wtf is up with this, arent these comments supposed to be updated?
		console.log(post?.comments);
		console.log(comments);
	}, [post]);

	return (
		<>
			<NavBar marginBottom={20} />
			<Container size={1400}>
				<Grid columns={18} grow>
					<Col className="max-lg:hidden" span={3}>
						<ProfileCard image={""} avatar={""} name={""} job={""} stats={[]} />
					</Col>
					<Col span={10} className="flex justify-center">
						<Stack className="w-full" spacing={10}>
							<Stack>
								<Post
									// post needs optional chaining because backend schema is nullable
									// it is nulllable because the querying a post by id can return null if it doesn't exist
									id={post?._id!}
									author={post?.author!}
									username={post?.author.name!}
									avatarImage={post?.author.avatarImage!}
									body={post?.body!}
									likesCount={post?.likesCount!}
									isLikedByThisUser={post?.likedByUsers?.includes(session?.user.id!)!}
									commentsCount={post?.comments?.length!}
									isOnClick={false}
								/>
								<CommentSection postId={post?._id!} comments={comments} />
							</Stack>
						</Stack>
					</Col>
					<Col className="max-lg:hidden" span={3}>
						<Stack spacing={10}>
							<div className="h-96 rounded-md bg-bgPost tw-border-solid  border-rose-500"></div>
						</Stack>
					</Col>
				</Grid>
			</Container>
		</>
	);
};

export default FullPost;
