import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	// Handle scroll progress and button visibility
	useEffect(() => {
		const calculateScrollProgress = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const scrollHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight
			const progress = (scrollTop / scrollHeight) * 100

			setScrollProgress(progress)
			setIsVisible(scrollTop > 300)
		}

		// Add scroll event listener
		window.addEventListener('scroll', calculateScrollProgress)

		// Cleanup listener
		return () => window.removeEventListener('scroll', calculateScrollProgress)
	}, [])

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<>
			{isVisible && (
				<div
					className="fixed bottom-6 right-6 z-50 flex cursor-pointer flex-col items-center"
					onClick={scrollToTop}
				>
					{/* Scroll Progress Ring */}
					<svg width="40" height="40" viewBox="0 0 60 60" className="absolute">
						<circle
							cx="30"
							cy="30"
							r="28"
							fill="none"
							stroke="#e0e0e0"
							strokeWidth="4"
						/>
						<circle
							cx="30"
							cy="30"
							r="28"
							fill="none"
							stroke="#000"
							strokeWidth="4"
							strokeDasharray="176"
							strokeDashoffset={176 * (1 - scrollProgress / 100)}
							style={{
								transition: 'stroke-dashoffset 0.3s',
								transform: 'rotate(-90deg)',
								transformOrigin: '50% 50%',
							}}
						/>
					</svg>

					{/* Scroll To Top Button */}
					<div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors">
						<ChevronUp size={20} />
					</div>
				</div>
			)}
		</>
	)
}

export default ScrollToTopButton
