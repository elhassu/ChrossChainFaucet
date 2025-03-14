import { ButtonPrimary } from "../buttons/DefaultButtons";
import Link from "next/link";

export function ConnectWalletCTA() {
	return (
		<ButtonPrimary
			as={Link}
			href="/delegation"
		>
			Connect wallet
		</ButtonPrimary>
	);
};
