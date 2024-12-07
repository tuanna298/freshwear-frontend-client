import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Shuffle, X } from 'lucide-react'

const ProductCompare = () => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background">
					<Shuffle size={18} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="overflow-y-auto overscroll-y-contain bg-background py-[28px]">
				<div className="m-auto flex w-full max-w-[1540px] items-center px-[65px]">
					{/* title */}
					<div className="flex basis-[22%] items-center text-[28px] leading-[34px]">
						So sánh sản phẩm
					</div>
					{/* compare */}
					<div className="flex basis-[63%] items-center overflow-x-auto">
						{/* compare item */}
						<div className="relative flex basis-[16%] flex-col px-[10px] text-center">
							<div className="relative">
								<X className="absolute right-[6px] top-[6px] z-[5] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-background text-[8px]" />
								<a href={`product-detail/1`}>
									<img src="" alt="image" className="w-full rounded-[3px]" />
								</a>
							</div>
						</div>
					</div>
					{/* buttons */}
					<div className="flex basis-[15%] items-center justify-end ">
						<div>
							<Button className="h-[47px] w-[147px] ">So sánh</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default ProductCompare
