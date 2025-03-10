"use client";
import { ConnectWalletCTA } from "../../components/buttons/CallToActions";
import { ReownConnectButton } from "../../components/buttons/ReownConnectButton";
import Card from "../../components/cards/Card";
import Image from "next/image";
import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { ButtonPrimary } from "../../components/buttons/DefaultButtons";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/loaders/Spinner";

function ConnectThroughMetaMask() {
	return (
		<Card>
			<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pt-8">Choose wallet</h1>
			<div className="flex justify-center pt-8">
				<ReownConnectButton />
			</div>
			{/* <InfoList /> */}
		</Card>
	);
}

function Loader() {
	return (
		<Card>
			<div className="flex justify-center pt-24">
				<Spinner className="text-web-orange-500" />
			</div>
		</Card>
	);
}

function DisplayTransactionHash({ transactionHash }) {
	return (
		<Card>
			<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pt-8">Transaction Hash</h1>
			<p className="text-base md:text-lg font-normal my-4 md:my-8 mb-6 md:mb-12 text-balance text-trout-400">
				{transactionHash}
			</p>
		</Card>
	);
}

function ConnectCosmosAddress({ etherAddress, setTransactionHash }) {
	const [cosmosAddress, setCosmosAddress] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		axios({
			method: "POST",
			url: "http://localhost:3001/faucet",
			data: {
				cosmosAddress,
				etherAddress,
			},
		})
			.then((response) => {
				toast.success(response.data.message);
				setTransactionHash(response.data.transactionHash);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (loading) return <Loader />;

	return (
		<Card>
			<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight pt-8">Faucet</h1>
			<p className="text-base md:text-lg font-normal my-4 md:my-8 mb-6 md:mb-12 text-balance text-trout-400">
				Connect your wallet, then choose a network to view delegation data specific to that network.
			</p>

			<form
				className="grid grid-cols-1 sm:grid-cols-2 gap-2"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					value={cosmosAddress}
					onChange={(e) => setCosmosAddress(e.target.value)}
					placeholder="Wallet Address"
					required
					className="w-full bg-trout-600 rounded-md px-4 min-h-12"
				/>
				<ButtonPrimary type="submit">Connect wallet</ButtonPrimary>
			</form>
		</Card>
	);
}

export default function DelegationAnalysis() {
	const { address: etherAddress } = useAppKitAccount();
	const [transactionHash, setTransactionHash] = useState("");

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
			<main className="flex flex-col gap-8 row-start-2 items-center xs:items-start ">
				{!etherAddress ? <ConnectThroughMetaMask /> : null}
				{etherAddress && !transactionHash ? (
					<ConnectCosmosAddress
						etherAddress={etherAddress}
						setTransactionHash={(hash) => setTransactionHash(hash)}
					/>
				) : null}
				{transactionHash ? <DisplayTransactionHash transactionHash={transactionHash} /> : null}
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
