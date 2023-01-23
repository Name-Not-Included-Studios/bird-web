import { Button, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../../app/hooks";
import { setUser } from "../../../features/auth/authSlice";
import { useUpdateUserMutation } from "../../../lib/__generated__/graphql";
import { FormikField } from "../../form";

export const ProfileForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { mutate, error, isLoading } = useUpdateUserMutation({
		onSuccess: (data) => {
			if (data.updateUser) {
				dispatch(setUser(data.updateUser));

				router.push("/home");
			}
		},
	});

	return (
		<Formik
			initialValues={{
				username: "",
				displayName: "",
				bio: "",
				websiteUrl: "",
				avatarUrl: "",
			}}
			onSubmit={async (values) => {
				mutate({
					user: {
						username: values.username,
						displayName: values.displayName,
						bio: values.bio,
						websiteUrl: values.websiteUrl,
						avatarUrl: values.avatarUrl,
					},
				});
			}}
		>
			{({ touched, errors }) => (
				<Form>
					<Stack alignItems={"center"} gap={4}>
						<Stack gap={2}>
							<FormikField
								name="username"
								placeholder="Username"
								error={errors.username}
								touched={touched.username}
							/>

							<FormikField
								name="displayName"
								placeholder="Display Name"
								error={errors.displayName}
								touched={touched.displayName}
							/>

							<FormikField
								name="bio"
								placeholder="Bio"
								error={errors.bio}
								touched={touched.bio}
							/>

							<FormikField
								name="websiteUrl"
								placeholder="Website URL"
								error={errors.websiteUrl}
								touched={touched.websiteUrl}
							/>

							<FormikField
								name="avatarUrl"
								placeholder="Avatar URL"
								error={errors.avatarUrl}
								touched={touched.avatarUrl}
							/>
						</Stack>

						<Button colorScheme={"teal"} type={"submit"} isLoading={isLoading}>
							Create Profile
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
