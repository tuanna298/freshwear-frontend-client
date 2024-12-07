import { cn } from '@/lib/utils'
import { Heart, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Navigation } from './navigation'
import ShoppingCart from './shopping-cart'

export const HeaderPlacholder = () => {
	return (
		<div
			className="h-1/2 pr-0 ps-0 pt-[69px]"
			style={{
				backgroundImage: 'url(assets/img/other/page-title-blog.png)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		/>
	)
}
export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div
			className={cn(
				'fixed left-0 right-0 top-0 z-50 grid min-h-24 !w-[100vw] grid-cols-12 items-center px-[40px] align-middle transition-all duration-300',
				isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent',
				isScrolled ? 'py-4' : 'py-6',
				// !isHomePage && !isScrolled && 'relative',
			)}
		>
			<div className="col-span-3 flex justify-start">
				<span
					className={cn('font-montserrat text-2xl font-semibold uppercase')}
				>
					freshwear
				</span>
			</div>
			<div className="col-span-6 flex items-center justify-center">
				<Navigation />
			</div>
			<div className="col-span-3 flex justify-end gap-4">
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full border-transparent bg-transparent"
				>
					<UserRound size={18} />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full border-transparent bg-transparent"
				>
					<div className="relative">
						<Heart size={18} />
						<div className="absolute -right-2 -top-2 rounded-full bg-destructive px-[5px] py-[1px] text-xs font-bold text-white">
							4
						</div>
					</div>
				</Button>
				<ShoppingCart />
			</div>
		</div>
	)
}
