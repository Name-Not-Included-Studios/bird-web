import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { LoginForm } from '../../components/login';

type Props = {};

const Login = (props: Props) => {
	return (
		<HStack
			height={"100vh"}
			width={"100%"}
			alignItems="center"
			justifyContent={"space-evenly"}
			paddingX={10}
			gap={10}
		>
			<Stack
				width={["100%", "100%", "75%", "50%", "50%"]}
				height={["100%", "100%", "75%", "75%", "75%"]}
				padding={[0, 10, 10, 10, 10]}
				alignItems={"center"}
				justifyContent={"space-evenly"}
			>
				<Box textAlign={"center"}>
					<Heading size={"4xl"}>Bird Social</Heading>
					<Text fontSize={"3xl"}>What&#39;s the word, bird?</Text>
				</Box>
				<Stack alignItems={"center"} flexDir={"column"} gap={6}>
					<Heading>Login</Heading>
					<LoginForm />
				</Stack>
			</Stack>
			<Stack
				width={"50%"}
				height={"75%"}
				position={"relative"}
				borderRadius={"2xl"}
				overflow={"hidden"}
				display={["none", "none", "none", "flex", "flex"]}
			>
				<Image alt="Login image" fill src={"/img/fug.jpg"} />
			</Stack>
		</HStack>
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
		props: {
			requireAuth: false
		},
	};
};

export default Login;
