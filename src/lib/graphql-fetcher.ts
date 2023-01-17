import axios from "axios";
import { getCookie } from "cookies-next";

import { GetMeQuery } from "./__generated__/graphql";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

export const fetchData = <TData, TVariables>(
	query: string,
	variables?: TVariables,
	options?: RequestInit["headers"]
): (() => Promise<TData>) => {
	return async () => {
		const access_token = getCookie("access_token");

		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(options ?? {}),
				AUTHORIZATION: access_token ? access_token.toString() : "",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		const json = await res.json();

		if (json.errors) {
			const { message } = json.errors[0] || "Error..";
			throw new Error(message);
		}

		return json.data;
	};
};

export const axiosGetMe = async (data: string, access_token: string) => {
	const response = await axios.post<GetMeQuery>(
		GRAPHQL_ENDPOINT,
		{ query: data },
		{
			headers: {
				Authorization: access_token,
				"Content-Type": "application/json",
			},
		}
	);
	return response.data;
};
