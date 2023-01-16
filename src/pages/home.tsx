import { Divider, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { Chirp, Compose } from '../components/home';
import { DefaultLayout } from '../components/layout';

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
