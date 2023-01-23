import { Button, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

import { useAppDispatch } from "../../../app/hooks";
import { setAuth } from "../../../features/auth/authSlice";
import { useLoginMutation } from "../../../lib/__generated__/graphql";
import { FormikField, FormikPasswordField } from "../../form";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required!"),
	password: Yup.string().min(8, "Too Short!").required("Required!"),
});

const initialValues = {
	email: "",
	password: "",
};

export const LoginForm = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const { mutate, error, isLoading } = useLoginMutation({
		onSuccess: (data) => {
			if (data.login) {
				dispatch(setAuth(data.login));

				router.push("/home");
			}
		},
	});

	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={LoginSchema}
			onSubmit={(values) => {
				mutate({
					auth: {
						email: values.email,
						password: values.password,
					},
				});
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<Stack alignItems={"center"} gap={4}>
						<Stack gap={2}>
							<FormikField
								name="email"
								placeholder="Email"
								error={errors.email}
								touched={touched.email}
							/>

							<FormikPasswordField
								name="password"
								placeholder="Password"
								error={errors.password}
								touched={touched.password}
							/>
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
