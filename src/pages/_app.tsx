import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "../app/store";
import { queryClient } from "../lib/react-query";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</Provider>
		</QueryClientProvider>
	);
}
