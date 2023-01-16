import { Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { Chirp, Compose } from '../../components/home';
import { DefaultLayout } from '../../components/layout';

type Props = {};

const ChirpPage = (props: Props) => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<DefaultLayout>
			<Stack direction={"column"} padding={10}>
				<Chirp isPage chirpId={id as string} />
				<Compose isReply />
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

export default ChirpPage;
