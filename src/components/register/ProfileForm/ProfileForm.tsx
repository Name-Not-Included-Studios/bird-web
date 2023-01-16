import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../../app/hooks";
import { setUser } from "../../../features/auth/authSlice";
import { useUpdateUserMutation } from "../../../lib/__generated__/graphql";

export const ProfileForm = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const { mutateAsync, error, isLoading } = useUpdateUserMutation();

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
				try {
					const { updateUser } = await mutateAsync({
						user: {
							username: values.username,
							displayName: values.displayName,
							bio: values.bio,
							websiteUrl: values.websiteUrl,
							avatarUrl: values.avatarUrl,
						},
					});

					if (updateUser) {
						dispatch(setUser(updateUser));

						// navigate to the home page
						if (!error) router.push("/home");
					}
				} catch (error) {
					console.error(error);
				}
			}}
		>
			{({ touched, errors, isSubmitting }) => (
				<Form>
					<Stack w={"md"}>
						<Field
							type="text"
							name="username"
							placeholder="Username"
							as={Input}
						/>
						{errors.username && touched.username ? (
							<Text variant={"error"}>{errors.username}</Text>
						) : null}

						<Field
							type="text"
							name="displayName"
							placeholder="Display Name"
							as={Input}
						/>
						{errors.displayName && touched.displayName ? (
							<Text variant={"error"}>{errors.displayName}</Text>
						) : null}

						<Field type="text" name="bio" placeholder="Bio" as={Input} />
						{errors.bio && touched.bio ? (
							<Text variant={"error"}>{errors.bio}</Text>
						) : null}

						<Field
							type="url"
							name="websiteUrl"
							placeholder="Website URL"
							as={Input}
						/>
						{errors.websiteUrl && touched.websiteUrl ? (
							<Text variant={"error"}>{errors.websiteUrl}</Text>
						) : null}

						<Field
							type="url"
							name="avatarUrl"
							placeholder="Avatar URL"
							as={Input}
						/>
						{errors.avatarUrl && touched.avatarUrl ? (
							<Text variant={"error"}>{errors.avatarUrl}</Text>
						) : null}

						<Button type="submit" isLoading={isSubmitting}>
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
