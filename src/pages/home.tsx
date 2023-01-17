import { Divider, Stack } from "@chakra-ui/react";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import { Chirp, Compose } from "../components/home";
import { DefaultLayout } from "../components/layout";
import { GetMeDocument } from "../lib/__generated__/graphql";
import { axiosGetMe } from "../lib/graphql-fetcher";
import { queryClient } from "../lib/react-query";

export default function Home() {
	const chirpIds = ["fart", "poopoo", "id", "peepee", "burp", "sneeze"];

	return (
		<DefaultLayout>
			<Stack direction={"column"} padding={10}>
				<Compose />
				{chirpIds.map((id) => (
					<>
						<Chirp chirpId={id} key={id} />
						<Divider key={id} />
					</>
				))}
			</Stack>
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	if (req.cookies.access_token) {
		await queryClient.prefetchQuery({
			queryKey: ["GetMe"],
			queryFn: () =>
				axiosGetMe(GetMeDocument, req.cookies.access_token as string),
		});
		console.log("poopoo");
	} else {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	const isProduction = process.env.NODE_ENV === "production";

	if (isProduction) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			requireAuth: true,
			enableAuth: true,
		},
	};
};
