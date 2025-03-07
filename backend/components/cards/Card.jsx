export default function Card({ children, ...props }) {
	return (
		<div
			className="pt-4 p-8 md:p-12 md:pt-4 bg-trout-700 border-trout-550 border-solid border rounded-4xl shadow-2xl"
			{...props}
		>
			<div className="flex flex-row justify-center pb-6">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						className="w-[10px] h-[10px] rounded-full m-1 bg-trout-600"
						key={i}
					/>
				))}
			</div>
			<div className="text-center w-[392px] min-h-[240px]">{children}</div>
		</div>
	);
}
