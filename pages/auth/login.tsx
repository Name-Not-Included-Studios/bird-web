import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

import LoginForm from '../../components/login/LoginForm';

type Props = {};

const Login = (props: Props) => {
	return (
		<Box
			height={"100vh"}
			width={"100%"}
			display={"flex"}
			alignItems="center"
			justifyContent={"space-evenly"}
			paddingX={10}
			gap={10}
		>
			<Stack
				width={"50%"}
				height={"75%"}
				padding={10}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Heading size={"4xl"}>Bird Social</Heading>
				<Text fontSize={"3xl"}>What&#39;s the word, bird?</Text>
				<Stack
					justifyContent={"space-evenly"}
					alignItems={"center"}
					flexDir={"column"}
					h={"75%"}
					w={"75%"}
				>
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
			>
				<Image alt="Login image" fill src={"/img/fug.jpg"} />
			</Stack>
		</Box>
	);
};

export default Login;
