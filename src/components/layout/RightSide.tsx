import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

type Props = {};

const RightSide = (props: Props) => {
	return (
		<Flex
			direction={"column"}
			w={"full"}
			h={"full"}
			alignItems={"flex-end"}
			paddingRight={6}
			gap={6}
		>
			<Flex
				direction={"column"}
				w={"full"}
				h={"36"}
				alignItems={"flex-start"}
				justifyContent={"center"}
				gap={6}
			>
				<InputGroup>
					<InputLeftElement pointerEvents="none" color={"GrayText"}>
						<HiMagnifyingGlass />
					</InputLeftElement>
					<Input
						placeholder="Search for a user, you stalker"
						w={["full", "full", "75%", "75%"]}
						variant="filled"
					/>
				</InputGroup>
			</Flex>
		</Flex>
	);
};

export default RightSide;
