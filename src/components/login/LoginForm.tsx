import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import * as Yup from "yup";

import { useLoginMutation } from "../../lib/__generated__/graphql";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required!"),
	password: Yup.string().min(8, "Too Short!").required("Required!"),
});

const initialValues = {
	email: "",
	password: "",
};

type Props = {};

const LoginForm = (props: Props) => {
	const { error, isLoading, mutateAsync } = useLoginMutation();

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={LoginSchema}
			onSubmit={async (values) => {
				try {
					await mutateAsync({
						auth: {
							email: values.email,
							password: values.password,
						},
					});
				} catch (error) {}
			}}
		>
			{({ errors, touched, isSubmitting }) => (
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

						<Button
							colorScheme={"teal"}
							type={"submit"}
							isLoading={isSubmitting}
						>
							Login
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

export default LoginForm;
