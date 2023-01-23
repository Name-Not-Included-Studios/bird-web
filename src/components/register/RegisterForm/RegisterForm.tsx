import { Button, Stack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../app/hooks';
import { setAuth } from '../../../features/auth/authSlice';
import { useCreateAccountMutation } from '../../../lib/__generated__/graphql';
import { FormikField, FormikPasswordField } from '../../form';

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
