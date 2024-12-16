import { cn } from '@/lib/utils'
import { useAuthStore } from '@/shared/hooks/use-auth-store'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AccountNav from './account-nav'
import { Navigation } from './navigation'
import ShoppingCart from './shopping-cart'
import { TextShine } from './text-shine'

export const HeaderPlacholder = () => {
	return (
		<div
			className="h-1/2 pr-0 ps-0 pt-[69px]"
			style={{
				backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		/>
	)
}
export const Header = () => {
	const { profile } = useAuthStore()

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
			)}
		>
			<div className="col-span-3 flex items-center justify-start gap-4">
				<TextShine
					text={
						profile ? (
							<>
								<span className="mr-5">FRESHWEAR</span>
								<span className="text-base 2xl:text-xl">
									xin chào, {profile.full_name}
								</span>
							</>
						) : (
							'FRESHWEAR'
						)
					}
					shineColor="#FFD700"
					duration={10}
				/>
			</div>
			<div className="col-span-6 flex items-center justify-center">
				<Navigation />
			</div>
			<div className="col-span-3 flex items-center justify-end gap-4">
				<AccountNav />
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
