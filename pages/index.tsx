import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    CloseButton,
    FormControl,
    FormErrorMessage,
    Heading,
    Img,
    Input,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Formik } from 'formik';
import { GetServerSideProps } from 'next';
import React from 'react';

type Props = {
	imageUrl: string;
	birdFact: string;
};

interface EmailForm {
	email?: string;
}

const Home = ({ birdFact, imageUrl }: Props) => {
	const {
		isOpen: isVisible,
		onClose,
		onOpen,
	} = useDisclosure({ defaultIsOpen: false });

	const initialValues: EmailForm = { email: "" };

	return (
		<Stack
			alignItems={"center"}
			justifyContent={"center"}
			h={"100vh"}
			w={"100%"}
		>
			<Stack
				w={"100%"}
				h={"80%"}
				justifyContent={"space-evenly"}
				alignItems={"center"}
			>
				<Stack alignItems={"center"}>
					<Box
						boxSize={"3xs"}
						alignItems={"center"}
						justifyContent={"center"}
						display={"flex"}
					>
						<Img src={imageUrl} alt="Bird Image" objectFit={"contain"} />
					</Box>
					<Heading size={["3xl", "4xl"]}>Bird Social</Heading>
					<Text fontSize={["2xl", "3xl"]} color={"GrayText"}>
						Squawk on, man!
					</Text>
				</Stack>
				<Stack alignItems={"center"} gap={6}>
					<Heading size={["sm", "md"]}>Get notified when we go live!</Heading>
					<Formik
						initialValues={initialValues}
						validate={(values) => {
							const errors: EmailForm = {};
							if (!values.email) {
								errors.email = "Required";
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = "Invalid email address";
							}
							return errors;
						}}
						onSubmit={async (values, { setSubmitting, setErrors }) => {
							const data = await fetch("/api/email", {
								method: "POST",
								body: JSON.stringify(values),
							});

							if (!data.ok) {
								const body: { unique: boolean } = await data.json();
								if (!body.unique)
									setErrors({ email: "Email has already been added!" });
								else setErrors({ email: "Invalid email!" });
							} else if (data.ok) {
								onOpen();
							}

							setSubmitting(false);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<Stack
									alignItems={"center"}
									gap={2}
									w={["2xs", "xs", "sm", "sm", "sm", "sm", "sm"]}
								>
									<FormControl
										isInvalid={
											errors.email && errors.email?.length > 0 ? true : false
										}
									>
										<Input
											type="text"
											name="email"
											placeholder="Email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											variant={"filled"}
											size={"lg"}
											isInvalid={errors.email ? true : false}
										/>
										{errors.email && touched.email && errors.email && (
											<FormErrorMessage>{errors.email}</FormErrorMessage>
										)}
									</FormControl>

									<Button
										type="submit"
										colorScheme={"teal"}
										disabled={isSubmitting}
										isLoading={isSubmitting}
										loadingText={"Submitting"}
									>
										Submit
									</Button>
									{isVisible && (
										<Alert status="success">
											<AlertIcon />
											<Box>
												<AlertTitle>You&apos;re signed up!</AlertTitle>
												<AlertDescription>
													We&apos;ll send you email updates as the product
													progresses!
												</AlertDescription>
											</Box>
											<CloseButton
												alignSelf="flex-start"
												position="relative"
												right={-1}
												top={-1}
												onClick={onClose}
											/>
										</Alert>
									)}
								</Stack>
							</form>
						)}
					</Formik>
				</Stack>
			</Stack>
		</Stack>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const res = await axios.get("https://some-random-api.ml/animal/bird");

	if (res.status > 299) {
		return {
			props: {
				imageUrl: "https://i.some-random-api.ml/II2LKfO9Yb.png",
				birdFact:
					"The Australian pelican has the longest bill of any bird in the world. It is nearly 2 feet (0.5 m) in length. The sword-billed hummingbird, with its 3.9-inch (10 cm) bill, is the only bird with a bill that’s longer than its body.",
			},
		};
	}

	const imageUrl = res.data.image;
	const birdFact = res.data.fact;

	return {
		props: {
			imageUrl,
			birdFact,
		},
	};
};

export default Home;
