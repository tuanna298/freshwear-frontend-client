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
			<DrawerContent className="overflow-y-hidden overscroll-y-contain bg-background py-[28px]">
				<div className="container m-auto flex items-center px-[65px]">
					{/* title */}
					<div className="flex basis-[22%] items-center text-[28px] leading-[34px]">
						So sánh sản phẩm
					</div>
					{/* compare */}
					<div className="flex basis-[63%] items-center overflow-x-auto">
						{/* compare item */}
						<div className="relative flex basis-[16%] flex-col px-[10px] text-center">
							<div className="relative">
								<div className="absolute right-[6px] top-[6px] z-[5] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-background text-[8px]">
									<X size={15} />
								</div>
								<a href={`product-detail/1`}>
									<img
										src="/assets/img/other/placeholder.jpg"
										alt="image"
										className="w-full rounded-[3px]"
									/>
								</a>
							</div>
						</div>
					</div>
					{/* buttons */}
					<div className="flex basis-[15%] items-center justify-end">
						<div className="flex flex-col gap-2">
							<Button className="h-[47px] w-[147px] rounded-[3px] text-[14px] font-bold leading-[22.4px]">
								So sánh
							</Button>
							<Button className="h-[47px] w-[147px] rounded-[3px] text-[14px] font-bold leading-[22.4px]">
								Làm mới
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default ProductCompare
