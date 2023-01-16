import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import { Footer, LeftSideBar, RightSidebar } from '..';

type Props = {
	children?: React.ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
	return (
		<Grid
			templateAreas={[
				`"main main main"
                 "footer footer footer"`,
				`"nav main main"
                 "nav footer footer"`,
				`"nav main side"
                 "nav main side"`,
			]}
			gridTemplateRows={["1fr 60px", "1fr 0px"]}
			gridTemplateColumns={[
				"50px 1fr 0fr",
				"150px 1fr 0fr",
				"150px 1fr 150px",
				"300px 1fr 300px",
				"1fr 1.5fr 1fr",
			]}
			h={"100vh"}
			position={"fixed"}
		>
			<GridItem
				pl="2"
				area={"nav"}
				display={["none", "block", "block", "block", "block"]}
			>
				<LeftSideBar />
			</GridItem>
			<GridItem pl="2" area={"main"} position={"relative"} overflowY={"scroll"}>
				{children}
			</GridItem>
			<GridItem
				pl="2"
				area={"footer"}
				display={["block", "none", "none", "none"]}
			>
				<Footer />
			</GridItem>
			<GridItem
				pl="2"
				area={"side"}
				display={["none", "none", "block", "block"]}
			>
				<RightSidebar />
			</GridItem>
		</Grid>
	);
};
