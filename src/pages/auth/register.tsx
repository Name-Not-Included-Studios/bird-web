import {
	Box,
	Heading,
	HStack,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";

import { ProfileForm, RegisterForm } from "../../components/register";

const RegisterPage = () => {
	const [step, setStep] = useState(0);

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
					<Heading>Register</Heading>
					<Tabs variant="soft-rounded" index={step} onChange={() => {}}>
						<HStack display={"flex"} justifyContent={"space-between"}>
							<Text>Step {step + 1} of 2</Text>
							<TabList>
								<Tab>Account</Tab>
								<Tab>Profile</Tab>
							</TabList>
						</HStack>
						<TabPanels>
							<TabPanel px={"0"}>
								<RegisterForm setStep={setStep} />
							</TabPanel>
							<TabPanel>
								<ProfileForm />
							</TabPanel>
						</TabPanels>
					</Tabs>
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
	return {
		props: {
			requireAuth: false,
		},
	};
};

export default RegisterPage;
