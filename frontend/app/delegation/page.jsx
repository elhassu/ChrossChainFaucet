import { ConnectWalletCTA } from "@/ui/components/buttons/CallToActions";
import { ReownConnectButton } from "@/ui/components/buttons/ReownConnectButton";
import Card from "@/ui/components/cards/Card";
import Image from "next/image";
import { InfoList } from "@/ui/components/info/InfoList";

export default function DelegationAnalysis() {
	return (
		<div className="grid grid-rows-[20px_1fr_min-content] items-center justify-items-center min-h-screen py-8 gap-16 font-[family-name:var(--font-geist-sans)] bg-ebony-clay-950">
			<header className="row-start-1 w-full">
				<nav className="flex flex-row gap-8 justify-between list-none px-6">
					<li className="font-bold text-lg">Delegation Analysis</li>
					<li>
						<ConnectWalletCTA />
					</li>
				</nav>
			</header>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
				<Card>
					<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pt-8">Choose wallet</h1>
					<ReownConnectButton />
					<InfoList />
				</Card>
			</main>
			<footer className="row-start-3">
				<Image
					aria-hidden
					src="/faucet-background.svg"
					alt="Background Illustration"
					layout="responsive"
					width={1920}
					height={1080}
				/>
			</footer>
		</div>
	);
}
