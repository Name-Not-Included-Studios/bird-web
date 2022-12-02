import {
    Avatar,
    Box,
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid,
    Text,
    useClipboard,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from 'react-icons/fa';
import { HiChatBubbleOvalLeft, HiCheckBadge, HiClipboard, HiEnvelope, HiHeart, HiShare } from 'react-icons/hi2';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
} from 'react-share';

type Props = {
	chirpId: string;
	isPage?: boolean;
};

const Chirp = ({ chirpId, isPage = false }: Props) => {
	const chirpData = {};

	const { onCopy, hasCopied } = useClipboard(
		`http://localhost:3000/c/${chirpId}`
	);
	return (
		<div>
			<Box padding={6}>
				<Box display={"flex"} gap={4}>
					<Box>
						<Link href={"/u/brice"}>
							<Avatar />
						</Link>
					</Box>
					<Box display={"flex"} flexDirection={"column"}>
						<Box display={"flex"} alignItems={"center"}>
							<Link href={"/u/brice"}>
								<Button display={"flex"} gap={1} variant={"link"} minW={0}>
									<Text
										fontWeight={"bold"}
										size={"smaller"}
										textOverflow={"ellipsis"}
										w={["20", "20", "36", "40", "auto"]}
										overflow={"hidden"}
										whiteSpace={"nowrap"}
										maxW={"100%"}
										// bgColor={"blue.600"}
									>
										This is a thirty char username
									</Text>
									<Box mb={"-1"} color={"teal.200"}>
										<HiCheckBadge />
									</Box>
									<Text
										color={"GrayText"}
										textOverflow={"ellipsis"}
										w={"16"}
										overflow={"hidden"}
										// bgColor={"blue.600"}
									>
										@thishasnineteenchar
									</Text>
								</Button>
							</Link>

							<Text color={"GrayText"}> · 30m</Text>
						</Box>
						{isPage ? (
							<Text>
								This is a test sentence that I am writing. It is pretty cool and
								I like writing. Coding never makes me angry and I never run out
								of ideas to type. I love writing filler text and lorem ipsum is
								not worth it.
							</Text>
						) : (
							<Link href={`/c/${chirpId}`}>
								<Text>
									This is a test sentence that I am writing. It is pretty cool
									and I like writing. Coding never makes me angry and I never
									run out of ideas to type. I love writing filler text and lorem
									ipsum is not worth it.
								</Text>
							</Link>
						)}
					</Box>
				</Box>
				<Box
					width={"full"}
					display={"flex"}
					justifyContent={"space-around"}
					mt={4}
				>
					<Button
						aria-label="Like Post"
						leftIcon={<HiHeart />}
						variant={"ghost"}
					>
						11.8K
					</Button>
					{isPage ? (
						<Button
							aria-label="Reply to Post"
							leftIcon={<HiChatBubbleOvalLeft />}
							variant={"ghost"}
							cursor={"default"}
							colorScheme={"teal"}
						>
							5.3K
						</Button>
					) : (
						<Link href={`/c/${chirpId}`}>
							<Button
								aria-label="Reply to Post"
								leftIcon={<HiChatBubbleOvalLeft />}
								variant={"ghost"}
							>
								5.3K
							</Button>
						</Link>
					)}

					<Popover isLazy>
						<PopoverTrigger>
							<IconButton
								aria-label="Share Post"
								icon={<HiShare />}
								variant={"ghost"}
							/>
						</PopoverTrigger>
						<PopoverContent border="none" width={"auto"}>
							<PopoverArrow />
							<PopoverHeader>Share this post</PopoverHeader>
							<PopoverBody>
								<SimpleGrid columns={2} rowGap={2} columnGap={4}>
									<Button onClick={onCopy} leftIcon={<HiClipboard />}>
										{hasCopied ? "Copied!" : "Copy"}
									</Button>

									<EmailShareButton url="http://localhost:3000/c/id">
										<HiEnvelope />
										Email
									</EmailShareButton>

									<LinkedinShareButton url="http://localhost:3000/c/id">
										<FaLinkedin />
										LinkedIn
									</LinkedinShareButton>

									<FacebookShareButton url="http://localhost:3000/c/id">
										<FaFacebook />
										Facebook
									</FacebookShareButton>

									<RedditShareButton url="http://localhost:3000/c/id">
										<FaReddit />
										Reddit
									</RedditShareButton>

									<TwitterShareButton url="http://localhost:3000/c/id">
										<FaTwitter />
										Twitter
									</TwitterShareButton>
								</SimpleGrid>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Box>
			</Box>
		</div>
	);
};

export default Chirp;
