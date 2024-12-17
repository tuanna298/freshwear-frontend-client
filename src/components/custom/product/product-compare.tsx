import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ProductClient } from '@/schemas/product.schema'
import { useCompareStore } from '@/shared/hooks/use-compare-store'
import { Check, Shuffle, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

interface ProductCompareProps {
	product: ProductClient
}

const ProductCompare = ({ product }: ProductCompareProps) => {
	const navigate = useNavigate()
	const { compareItems, addToCompare, deleteFromCompare, deleteAll } =
		useCompareStore()

	return (
		<Drawer>
			<DrawerTrigger asChild>
				{compareItems.some((item) => item.id === product.id) ? (
					<Button className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background">
						<Check size={18} />
					</Button>
				) : (
					<Button
						className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background"
						onClick={() => addToCompare(product)}
					>
						<Shuffle size={18} />
					</Button>
				)}
			</DrawerTrigger>
			<DrawerContent className="overflow-y-hidden overscroll-y-contain bg-background py-[28px]">
				<div className="container m-auto flex items-center px-[65px]">
					{/* title */}
					<div className="flex basis-[22%] items-center text-[28px] leading-[34px]">
						So sánh sản phẩm
					</div>
					{/* compare */}
					<div className="flex basis-[63%] items-center overflow-x-auto">
						{/* compare item */}
						{compareItems.map((item) => (
							<div className="relative flex basis-[16%] flex-col px-[10px] text-center">
								<div className="relative">
									<div
										className="absolute right-[6px] top-[6px] z-[5] flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full bg-background text-[8px] hover:bg-destructive hover:text-background"
										onClick={() => deleteFromCompare(item.id)}
									>
										<X size={15} />
									</div>
									<a href={`product-detail/${item.id}`}>
										<img
											src={item.image[0]}
											alt="image"
											className="w-full rounded-[3px]"
										/>
									</a>
								</div>
							</div>
						))}
					</div>
					{/* buttons */}
					<div className="flex basis-[15%] items-center justify-end">
						<div className="flex flex-col items-center gap-5">
							<Button
								className="h-[47px] w-[147px] rounded-[3px] text-[14px] font-bold leading-[22.4px]"
								onClick={() => navigate('/compare')}
							>
								So sánh
							</Button>
							<Link
								to="#"
								className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
								onClick={() => deleteAll()}
							>
								Làm mới
							</Link>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default ProductCompare
