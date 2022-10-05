import {
	Button,
	Group,
	Card,
	Image,
	Text,
	createStyles,
	Divider,
	Center,
	Space,
	PasswordInput,
	TextInput,
	Stack,
	Header,
	Container,
	Title,
} from "@mantine/core";
import Link from "next/link";
import logo from "../images/logo.png";
import useAuth from "../util/useAuth";

export default function LandingPage() {
	const status = useAuth();
	return (
		<div className="min-h-screen from-bgPrimary via-bgMiddle to-bgSecondary bg-gradient-[140deg]">
			<Header height={56} className="flex items-center justify-between bg-bgNavBar">
				<Title color="orange" weight={700} size={35} className="ml-14 font-libre">
					KENTAN
				</Title>
				<Link href="/login">
					<Button color="orange" radius={5} className="mr-14 shadow-lg">
						<Text weight={700} size={18}>
							Login
						</Text>
					</Button>
				</Link>
			</Header>
			<Container fluid>
				<Group position="apart" className="mt-36">
					<div className="ml-20">
						<Container size={800}>
							<Title size={80} className="font-sora">
								Touch Grass Together
							</Title>
							<Space h="lg"></Space>
							<Text size={20} weight={200}>
								A safe space for creating new relationships. Kentan provides hundreds of users a
								cozy platform to meet new people and make new friends.
							</Text>
							<Space h={50}></Space>
							<Link href="/register">
								<Button color="orange" radius={5} size="lg" className="shadow-lg">
									<Text weight={700} size={22}>
										Register Now
									</Text>
								</Button>
							</Link>
						</Container>
					</div>
					<Image height={560} width={520} src={logo.src} alt="logo" className="mr-32"></Image>
				</Group>
			</Container>
		</div>
	);
}
