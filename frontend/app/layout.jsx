import { Toaster } from "react-hot-toast";
import "./globals.css";
import ContextProvider from "@/ui/context";

export const metadata = {
	title: "AppKit in Next.js + ethers",
	description: "AppKit example dApp",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ContextProvider>
					<Toaster position="bottom-center" />
					{children}
				</ContextProvider>
			</body>
		</html>
	);
}
