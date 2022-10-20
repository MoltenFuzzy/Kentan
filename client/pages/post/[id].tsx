import gqlClient from "@gqlSDK/clients/gqlClient";
import { getSdk } from "@gqlSDK/graphql/sdk";
import { Post } from "components/Post/Post";
import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { Posts } = getSdk(gqlClient);
	const posts = (await Posts({ limit: 10 })).posts;
	return { props: { posts } };
};

const FullPost = () => {
	return (
		<Post id={""} username={""} avatarImage={undefined} body={""} likesCount={0} comments={[]} />
	);
};

export default FullPost;
