import { Divider, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

import { useAppSelector } from "../../app/hooks";
import { Chirp, Compose } from "../../components/home";
import { DefaultLayout } from "../../components/layout";
import { useGetRecentPostsFromUserQuery } from "../../lib/__generated__/graphql";

type Props = {};

const Profile = (props: Props) => {
	const router = useRouter();
	const { user } = useAppSelector((state) => state.auth);

	const { username } = router.query;

	const data = useGetRecentPostsFromUserQuery(
		{
			userId: "im only getting the username from the url, not an id",
			page: 1,
			pageSize: 20,
		},
		{
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	return (
		<DefaultLayout>
			<Stack direction={"column"} padding={10}>
				<Compose />
				{data.data?.getRecentPostsFromUser &&
					data.data.getRecentPostsFromUser.map((post) => (
						<>
							<Chirp chirpId={post!.postId} key={post!.postId} />
							<Divider key={post!.postId + "-div"} />
						</>
					))}
			</Stack>
		</DefaultLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const isProduction = process.env.NODE_ENV === "production";

	if (isProduction) {
		return {
			notFound: true,
		};
	}

	return {
		props: {},
	};
};

export default Profile;
