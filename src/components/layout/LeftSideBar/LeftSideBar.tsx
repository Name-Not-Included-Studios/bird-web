import {
	Avatar,
	Button,
	Flex,
	Heading,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaCog, FaHome, FaMoon, FaSun, FaUser } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearAuth } from "../../../features/auth/authSlice";

export const LeftSideBar = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();
	const { user } = useAppSelector((state) => state.auth);

	const { colorMode, toggleColorMode } = useColorMode();

	const handleLogout = () => {
		dispatch(clearAuth());
		router.push("/auth/login");
	};

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
				alignItems={"flex-end"}
				justifyContent={"center"}
				gap={6}
			>
				<Heading>Bird</Heading>
			</Flex>
			<Flex
				direction={"column"}
				w={"full"}
				h={"3/4"}
				alignItems={"flex-end"}
				gap={6}
				flexGrow={"1"}
			>
				<Link href={"/home"}>
					<Button
						leftIcon={<FaHome />}
						size={"lg"}
						width={["auto", "auto", "auto", "52"]}
						justifyContent={"start"}
						variant={router.pathname === "/home" ? "solid" : "ghost"}
					>
						<Text display={["none", "none", "none", "block"]}>Home</Text>
					</Button>
				</Link>

				<Link href={`/u/${encodeURIComponent(user ? user.username : "brice")}`}>
					<Button
						leftIcon={<FaUser />}
						size={"lg"}
						width={["auto", "auto", "auto", "52"]}
						justifyContent={"start"}
						variant={router.pathname === `/u/[username]` ? "solid" : "ghost"}
					>
						<Text display={["none", "none", "none", "block"]}>Profile</Text>
					</Button>
				</Link>

				<Link href={"/settings"}>
					<Button
						leftIcon={<FaCog />}
						size={"lg"}
						width={["auto", "auto", "auto", "52"]}
						justifyContent={"start"}
						variant={router.pathname === "/settings" ? "solid" : "ghost"}
					>
						<Text display={["none", "none", "none", "block"]}>Settings</Text>
					</Button>
				</Link>
			</Flex>

			<Flex
				direction={"column"}
				w={"full"}
				h={"36"}
				alignItems={"flex-end"}
				justifyContent={"center"}
				gap={6}
			>
				<Popover>
					<PopoverTrigger>
						<Button
							size={"lg"}
							height={"20"}
							width={["20", "20", "20", "52"]}
							variant="ghost"
						>
							<Avatar marginRight={[0, 0, 0, 3]} src={user?.avatarUrl} />
							<Stack
								textAlign={"left"}
								spacing={"0.5"}
								display={["none", "none", "none", "block"]}
							>
								<Text fontSize={"smaller"}>{user?.displayName}</Text>
								<Text fontSize={"sm"} color={"GrayText"}>
									@{user?.username}
								</Text>
							</Stack>
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
			</Flex>
		</Flex>
	);
};
