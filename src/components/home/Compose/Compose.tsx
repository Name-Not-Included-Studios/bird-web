import { Box, Button, Divider, Textarea } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

import { useCreatePostMutation } from "../../../lib/__generated__/graphql";

type Props = {
	isReply?: boolean;
	parentChirpId?: string;
};

const initialValues = {
	content: "",
};

export const Compose = ({ isReply = false, parentChirpId }: Props) => {
	const { mutate, error, isLoading } = useCreatePostMutation({
		onSuccess: (data) => {
			if (data.createPost) {
				console.log("created");

				console.log(data.createPost);
			}
		},
	});

	return (
		<Box w={"full"} mb={4}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					if (isReply) {
						mutate({
							post: {
								content: values.content,
								parentId: parentChirpId,
							},
						});
					} else {
						mutate({
							post: {
								content: values.content,
							},
						});
					}

					actions.setSubmitting(false);
				}}
			>
				<Form>
					<Field
						id="content"
						name="content"
						placeholder={
							isReply
								? "Let 'em know what you think big dawg..."
								: "Knowing you, you'll probably get no likes but go ahead and type something..."
						}
						border={"none"}
						resize={"none"}
						as={Textarea}
					/>
					<Divider mt={4} mb={4} />

					<Box w={"full"} display={"flex"} justifyContent={"flex-end"}>
						<Button type="submit" colorScheme={"teal"} isLoading={isLoading}>
							{isReply ? "Reply" : "Chirp"}
						</Button>
					</Box>
				</Form>
			</Formik>
		</Box>
	);
};
