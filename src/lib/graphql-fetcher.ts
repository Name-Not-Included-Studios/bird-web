export const fetchData = <TData, TVariables>(
	query: string,
	variables?: TVariables,
	options?: RequestInit["headers"]
): (() => Promise<TData>) => {
	return async () => {
		const accessToken = localStorage.getItem("access_token");

		const res = await fetch("http://localhost:8080/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(options ?? {}),
				AUTHORIZATION: accessToken ? accessToken.replaceAll('"', "") : "",
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
