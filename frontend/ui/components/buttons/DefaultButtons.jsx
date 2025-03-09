export function ButtonPrimary(props) {
	const { className = "", children, as: Element = "button", ...rest } = props;

	return (
		<Element
			className={`rounded-xl bg-web-orange-500 px-3 py-3 whitespace-nowrap font-bold ${className} cursor-pointer`}
			{...rest}
		>
			{children}
		</Element>
	);
}
