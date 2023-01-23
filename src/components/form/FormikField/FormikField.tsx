import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

type Props = {
	error: string | undefined;
	touched: boolean | undefined;
	name: string;
	placeholder: string;
};

export const FormikField = ({ error, touched, name, placeholder }: Props) => {
	return (
		<>
			<Field
				variant="filled"
				size={"lg"}
				type="text"
				name={name}
				placeholder={placeholder}
				as={Input}
			/>
			{error && touched ? <Text variant={"error"}>{error}</Text> : null}
		</>
	);
};

export const FormikPasswordField = ({
	error,
	touched,
	name,
	placeholder,
}: Props) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<>
			<InputGroup size={"lg"}>
				<Field
					pr="4.5rem"
					variant="filled"
					type={show ? "text" : "password"}
					placeholder={placeholder}
					as={Input}
					name={name}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleClick}>
						{show ? <HiEyeSlash /> : <HiEye />}
					</Button>
				</InputRightElement>
			</InputGroup>
			{error && touched ? <Text variant={"error"}>{error}</Text> : null}
		</>
	);
};
