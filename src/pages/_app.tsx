import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

import { store } from "../app/store";
import { RouteGuard } from "../components/layout";
import { queryClient } from "../lib/react-query";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<CookiesProvider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Provider store={store}>
						<ChakraProvider>
							<RouteGuard requireAuth={pageProps.requireAuth}>
								<Component {...pageProps} />
							</RouteGuard>
						</ChakraProvider>
					</Provider>
				</Hydrate>
			</QueryClientProvider>
		</CookiesProvider>
	);
}
