import {
    Avatar,
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCog, FaHome, FaMoon, FaSun, FaUser } from 'react-icons/fa';

type Props = {};

const username = "bricewduke";

const Footer = (props: Props) => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex w={"full"} h={"full"} justifyContent={"center"} gap={6}>
			<Popover>
				<PopoverTrigger>
					<Button size={"lg"} variant="ghost">
						<Avatar size="sm" />
					</Button>
				</PopoverTrigger>
				<PopoverContent border={"none"} width="auto">
					<PopoverArrow />
					<PopoverBody display="flex" justifyContent={"center"} gap={"3"}>
						<Button>Log Out</Button>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <FaMoon /> : <FaSun />}
						</Button>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Link href={"/"}>
				<Button
					size={"lg"}
					variant={router.pathname === "/" ? "solid" : "ghost"}
				>
					<FaHome />
				</Button>
			</Link>

			<Link href={`/u/${encodeURIComponent(username)}`}>
				<Button
					size={"lg"}
					variant={router.pathname === `/u/[username]` ? "solid" : "ghost"}
				>
					<FaUser />
				</Button>
			</Link>

			<Link href={"/settings"}>
				<Button
					size={"lg"}
					variant={router.pathname === "/settings" ? "solid" : "ghost"}
				>
					<FaCog />
				</Button>
			</Link>
		</Flex>
	);
};

export default Footer;
