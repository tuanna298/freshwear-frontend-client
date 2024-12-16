import { motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

interface TextShineProps {
	text: React.ReactNode
	shineColor: string
	duration: number
}

export const TextShine: React.FC<TextShineProps> = ({
	text,
	shineColor,
	duration,
}) => {
	const controls = useAnimationControls()
	const textRef = useRef<HTMLSpanElement>(null)

	const updateAnimation = useCallback(() => {
		if (textRef.current) {
			const textWidth = textRef.current.offsetWidth
			const startPos = textWidth * -0.5
			const endPos = textWidth * 1.25

			controls.start({
				backgroundPosition: [`${startPos}px`, `${endPos}px`],
				transition: {
					duration,
					ease: 'linear',
					repeat: Infinity,
				},
			})
		}
	}, [controls])

	useEffect(() => {
		updateAnimation()
		window.addEventListener('resize', updateAnimation)

		return () => {
			window.removeEventListener('resize', updateAnimation)
		}
	}, [updateAnimation])

	return (
		<motion.span
			ref={textRef}
			className="relative flex w-fit items-center bg-clip-text text-2xl font-bold text-transparent"
			style={{
				backgroundImage: `linear-gradient(to right, #222 0%, ${shineColor} 10%, #222 20%)`,
				backgroundSize: '200%',
			}}
			animate={controls}
		>
			{text}
		</motion.span>
	)
}
