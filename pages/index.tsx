import { Divider, Stack } from '@chakra-ui/react';

import Chirp from '../components/home/Chirp';
import Compose from '../components/home/Compose';
import { DefaultLayout } from '../components/layout/Layout';

export default function Home() {
	const chirpIds = ["fart", "poopoo", "id", "peepee", "burp", "sneeze"];

	return (
		<DefaultLayout>
			<Stack direction={"column"} padding={10}>
				<Compose />
				{chirpIds.map((id) => (
					<>
						<Chirp chirpId={id} key={id} />
						<Divider />
					</>
				))}
			</Stack>
		</DefaultLayout>
	);
}
