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
    Input,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';

type Props = {};

interface EmailForm {
	email?: string;
}

const Home = (props: Props) => {
	const {
		isOpen: isVisible,
		onClose,
		onOpen,
	} = useDisclosure({ defaultIsOpen: false });

	const initialValues: EmailForm = { email: "" };

	return (
		<Stack alignItems={"center"} justifyContent={"center"} h={"100vh"}>
			<Stack
				height={"60%"}
				justifyContent={"space-evenly"}
				alignItems={"center"}
			>
				<Stack alignItems={"center"}>
					<Heading size={"4xl"}>Bird Social</Heading>
					<Text fontSize={"3xl"} color={"GrayText"}>
						Get your squawk on!
					</Text>
				</Stack>
				<Stack alignItems={"center"} gap={6} h={"50%"}>
					<Heading size={"md"}>Get notified when we go live!</Heading>
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
								<Stack alignItems={"center"} gap={2} w={"sm"}>
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

export default Home;
