import { Box, Button, Divider, Textarea } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';

type Props = {
	isReply?: boolean;
	parentChirpId?: string;
};

const initialValues = {
	content: "",
};

export const Compose = ({ isReply = false }: Props) => {
	return (
		<Box w={"full"} mb={4}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}}
			>
				<Form>
					<Textarea
						id="content"
						name="content"
						placeholder={
							isReply
								? "Let 'em know what you think big dawg..."
								: "Knowing you, you'll probably get no likes but go ahead and type something..."
						}
						border={"none"}
						resize={"none"}
					/>
					<Divider mt={4} mb={4} />

					<Box w={"full"} display={"flex"} justifyContent={"flex-end"}>
						<Button type="submit" colorScheme={"teal"}>
							{isReply ? "Reply" : "Chirp"}
						</Button>
					</Box>
				</Form>
			</Formik>
		</Box>
	);
};
