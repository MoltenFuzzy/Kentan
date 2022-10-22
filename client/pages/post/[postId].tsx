import gqlClient from "@gqlSDK/clients/gqlClient";
import { getSdk, PostByPostIdQuery } from "@gqlSDK/graphql/sdk";
import { Col, Container, Grid, Stack } from "@mantine/core";
import { CommentSection } from "components/CommentSection/CommentSection";
import { NavBar } from "components/NavBar/NavBar";
import { Post } from "components/Post/Post";
import { ProfileCard } from "components/ProfileCard/ProfileCard";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import useUserStore from "stores/user";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// fetch the post and comments from server
	const { PostByPostId } = getSdk(gqlClient);
	const post = (await PostByPostId({ postId: ctx.params?.postId as string })).postByPostId;
	return { props: { post } };
};

interface PageProps {
	pageProps: {
		post: PostByPostIdQuery["postByPostId"];
	};
}

const FullPost = ({ pageProps: { post } }: PageProps) => {
	const { data: session } = useSession();
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
									// post needs optional chaining because in the backend schema it is nullable
									// it is nulllable because the querying a post by id can return null if it doesn't exist
									id={post?._id!}
									username={post?.author.name!}
									avatarImage={post?.author.avatarImage!}
									body={post?.body!}
									likesCount={post?.likesCount!}
									isLikedByThisUser={post?.likedByUsers?.includes(session?.user.id!)!}
									commentsCount={post?.commentsCount!}
									isOnClick={false}
								/>
								<CommentSection
									id={""}
									username={""}
									avatarImage={undefined}
									body={""}
									likesCount={0}
									isLikedByThisUser={false}
									commentsCount={0}
									comments={post?.comments!}
								></CommentSection>
							</Stack>
						</Stack>
					</Col>
					<Col className="max-lg:hidden" span={3}>
						{/* <Stack spacing={10}>
							<div className="h-96 rounded-md bg-bgPost tw-border-solid  border-rose-500"></div>
						</Stack> */}
					</Col>
				</Grid>
			</Container>
		</>
	);
};

export default FullPost;
