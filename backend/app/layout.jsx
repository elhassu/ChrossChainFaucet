import "./globals.css";
import ContextProvider from "@/context";

export const metadata = {
	title: "AppKit in Next.js + ethers",
	description: "AppKit example dApp",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ContextProvider>{children}</ContextProvider>
			</body>
		</html>
	);
}
