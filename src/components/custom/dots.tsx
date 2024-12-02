interface DotsProps {
	count: number
	size?: number
	color?: string
}

const Dots = ({ count, size = 6, color = '#999999' }: DotsProps) => {
	const dots = Array.from({ length: count })

	return (
		<>
			{dots.map((_, index) => (
				<div
					key={index}
					className="rounded-full"
					style={{
						width: `${size}px`,
						height: `${size}px`,
						backgroundColor: color,
					}}
				/>
			))}
		</>
	)
}

export default Dots
