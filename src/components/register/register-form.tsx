import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { useCreateAccountMutation } from "../../lib/__generated__/graphql";

export const RegisterForm = ({
	setStep,
}: {
	setStep: Dispatch<SetStateAction<number>>;
}) => {
	const { mutateAsync, error, isLoading } = useCreateAccountMutation();

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={async (values) => {
				try {
					console.log(values.password);

					const { createAccount } = await mutateAsync({
						auth: {
							email: values.email,
							password: values.password,
						},
					});

					console.log(createAccount?.access_token);

					// if (createAccount?.access_token && createAccount?.refresh_token)
					// 	authContext?.setAuthState({
					// 		access_token: createAccount.access_token,
					// 		refresh_token: createAccount.refresh_token,
					// 	});

					setStep(1);
				} catch (error) {}
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<Stack w={"md"}>
						<Field
							type="email"
							name="email"
							variant="filled"
							placeholder="Email"
							size={"lg"}
							as={Input}
						/>
						{errors.email && touched.email ? (
							<Text variant={"error"}>{errors.email}</Text>
						) : null}

						<InputGroup size={"lg"}>
							<Field
								pr="4.5rem"
								variant="filled"
								type={show ? "text" : "password"}
								name="password"
								placeholder="Password"
								as={Input}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? <HiEyeSlash /> : <HiEye />}
								</Button>
							</InputRightElement>
						</InputGroup>
						{errors.password && touched.password ? (
							<Text variant={"error"}>{errors.password}</Text>
						) : null}

						<Button type="submit" isLoading={isSubmitting}>
							Register
						</Button>

						{error && !isLoading ? (
							<Text variant={"error"}>{error.toString()}</Text>
						) : null}
					</Stack>
				</Form>
			)}
		</Formik>
	);
};
