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

import { useAppDispatch } from "../../../app/hooks";
import { setAuth } from "../../../features/auth/authSlice";
import { useCreateAccountMutation } from "../../../lib/__generated__/graphql";

export const RegisterForm = ({
	setStep,
}: {
	setStep: Dispatch<SetStateAction<number>>;
}) => {
	const dispatch = useAppDispatch();

	const { mutate, error, isLoading } = useCreateAccountMutation({
		onSuccess: (data) => {
			if (data.createAccount) {
				dispatch(setAuth(data.createAccount));

				setStep(1);
			}
		},
	});

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values) => {
				mutate({
					auth: {
						email: values.email,
						password: values.password,
					},
				});
			}}
		>
			{({ errors, touched }) => (
				<Form>
					<Stack alignItems={"center"} gap={4}>
						<Stack gap={2}>
							<Field
								variant="filled"
								placeholder="Email"
								size={"lg"}
								as={Input}
								name="email"
							/>
							{errors.email && touched.email ? (
								<Text variant={"error"}>{errors.email}</Text>
							) : null}
							<InputGroup size={"lg"}>
								<Field
									pr="4.5rem"
									variant="filled"
									type={show ? "text" : "password"}
									placeholder="Password"
									as={Input}
									name="password"
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
						</Stack>

						<Button colorScheme={"teal"} type={"submit"} isLoading={isLoading}>
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
