import Image from "next/image";
import Card from "@/ui/components/cards/Card";
import { ConnectWalletCTA } from "@/ui/components/buttons/CallToActions";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_min-content] items-center justify-items-center min-h-screen py-8 gap-16 font-[family-name:var(--font-geist-sans)] bg-ebony-clay-950">
			<header className="row-start-1 w-full">
				<nav className="flex flex-row gap-8 justify-between list-none px-6">
					<li className="font-bold text-lg">Faucet</li>
					<li>
						<ConnectWalletCTA />
					</li>
				</nav>
			</header>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
				<Card>
						<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
							Choose a network to start
						</h1>
						<p className="text-base md:text-lg font-normal my-4 md:my-8 mb-6 md:mb-12 text-balance text-trout-400">
							Connect your wallet, then choose a network to view delegation data specific to that network.
						</p>
						<ConnectWalletCTA />
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
