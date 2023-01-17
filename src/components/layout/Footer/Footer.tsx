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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaCog, FaHome, FaMoon, FaSun, FaUser } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearAuth } from "../../../features/auth/authSlice";

type Props = {};

const username = "bricewduke";

export const Footer = (props: Props) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const { colorMode, toggleColorMode } = useColorMode();

	const handleLogout = () => {
		dispatch(clearAuth());
		router.push("/auth/login");
	};

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
						<Button onClick={handleLogout}>Log Out</Button>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <FaMoon /> : <FaSun />}
						</Button>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<Link href={"/home"}>
				<Button
					size={"lg"}
					variant={router.pathname === "/home" ? "solid" : "ghost"}
				>
					<FaHome />
				</Button>
			</Link>

			<Link href={`/u/${encodeURIComponent(user ? user.username : "")}`}>
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
