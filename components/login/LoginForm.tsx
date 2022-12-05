import { Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

const initialValues = {
	email: "",
	password: "",
};

type Props = {};

const LoginForm = (props: Props) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				console.log({ values, actions });
				alert(JSON.stringify(values, null, 2));
				actions.setSubmitting(false);
			}}
		>
			<Form>
				<Stack alignItems={"center"}>
					<Input variant="filled" placeholder="Username" size={"lg"} mb={4} />
					<InputGroup size={"lg"}>
						<Input
							pr="4.5rem"
							variant="filled"
							type={show ? "text" : "password"}
							placeholder="Password"
						/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm" onClick={handleClick}>
								{show ? <HiEyeSlash /> : <HiEye />}
							</Button>
						</InputRightElement>
					</InputGroup>

					<Button colorScheme={"teal"} type={"submit"}>
						Login
					</Button>
				</Stack>
			</Form>
		</Formik>
	);
};

export default LoginForm;
