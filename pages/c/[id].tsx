import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import Chirp from '../../components/home/Chirp';
import Compose from '../../components/home/Compose';
import { DefaultLayout } from '../../components/layout/Layout';

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

export async function getServerSideProps() {
	const showPage = process.env.NODE_ENV !== "development";

	if (showPage) {
		return {
			notFound: true,
		};
	}

	return {
		props: {},
	};
}

export default ChirpPage;
