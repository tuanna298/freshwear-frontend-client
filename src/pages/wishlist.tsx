import { HeaderPlacholder } from '@/components/custom/header'
import { ProductGridSingle } from '@/components/custom/product/product-grid'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/shared/hooks/use-wishlist-store'
import { motion, Variants } from 'framer-motion'
import { Trash } from 'lucide-react'
import { Fragment, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnClickOutside } from 'usehooks-ts'

const buttonVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: (custom) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: custom * 0.2,
			duration: 0.1,
			ease: 'easeOut',
		},
	}),
}

const Wishlist = () => {
	const [isHovered, setIsHovered] = useState(false)
	const ref = useRef(null)
	const navigate = useNavigate()
	const { wishlistItems, deleteFromWishlist } = useWishlistStore()

	useOnClickOutside(ref, () => {
		setIsHovered(false)
	})

	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full pr-[40px] ps-[40px]">
					<div className="text-center text-[42px] font-[400] leading-[50px]">
						Danh sách yêu thích
					</div>
				</div>
			</div>

			<section className="container m-auto w-full pb-[70px] pt-[45px] ">
				{wishlistItems.length === 0 && (
					<div className="text-center">
						<div className="text-center text-[18px] font-[400] leading-[1.4]">
							Danh sách yêu thích trống
						</div>
						<Button
							className="mt-3 w-56 rounded-[3px]"
							onClick={() => navigate('/shop')}
						>
							Mua sắm ngay
						</Button>
					</div>
				)}
				<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
					{wishlistItems.map((item) => {
						return (
							<div
								className="relative"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<ProductGridSingle product={item.product} key={item.id} />

								<motion.div
									className={`absolute right-[15px] top-[15px] z-50 flex items-center justify-center gap-[6px] transition-all duration-300 ${
										isHovered
											? 'translate-y-0 opacity-100'
											: 'translate-y-10 opacity-0'
									}`}
									initial="hidden"
									animate={isHovered ? 'visible' : 'hidden'}
									variants={buttonVariants}
								>
									<Button
										className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background"
										onClick={() => deleteFromWishlist(item.id)}
									>
										<Trash size={18} />
									</Button>
								</motion.div>
							</div>
						)
					})}
				</div>
			</section>
		</Fragment>
	)
}

export default Wishlist
