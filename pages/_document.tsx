import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				{/* TODO: Change back to system for application releases */}
				<ColorModeScript initialColorMode={"dark"} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
