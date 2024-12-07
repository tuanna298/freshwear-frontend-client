import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { NumberField } from './number-field'

const ShoppingCart = () => {
	const navigate = useNavigate()

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full border-transparent bg-transparent"
				>
					<div className="relative">
						<ShoppingBag size={18} />
						<div className="absolute -right-2 -top-2 rounded-full bg-destructive px-[5px] py-[1px] text-xs font-bold text-white">
							4
						</div>
					</div>
				</Button>
			</SheetTrigger>
			<SheetContent className="flex w-full !max-w-[477px] flex-col">
				<div className="flex h-full flex-col gap-3 overflow-hidden">
					<SheetHeader className="flex flex-shrink-0 !flex-row items-center justify-between align-middle">
						<SheetTitle>Giỏ hàng</SheetTitle>
						<SheetClose className="!m-0">
							<X className="!m-0 cursor-pointer" />
						</SheetClose>
					</SheetHeader>

					{/* Scrollable Sheet body */}
					<div className="flex-grow overflow-auto">
						<Separator className="!my-4" />

						{/* empty cart state */}
						{false && (
							<div className="mt-[15px] flex flex-col gap-2 p-[15px]">
								<div className="text-[16px]">Giỏ hàng của bạn đang trống</div>
								<Button className="w-full rounded-[3px]">Mua sắm ngay</Button>
							</div>
						)}

						{/* cart items */}
						<div>
							{Array.from({ length: 10 }).map((_, index) => (
								<div key={index}>
									<div className="my-0 flex gap-[24px] px-0 py-[20px]">
										{/* image */}
										<Link
											to={'product-detail/1'}
											className="inline-block h-[110px] w-[80px] cursor-pointer text-primary no-underline transition-[all_0.3s_ease]"
										>
											<img
												src="https://picsum.photos/700/1000"
												alt="cart-image-1"
												className="h-full w-full max-w-full object-cover align-middle text-transparent"
											/>
										</Link>

										<div>
											<Link
												to={'product-detail/1'}
												className="block cursor-pointer text-base text-primary no-underline transition-[all_0.3s_ease]"
											>
												Product name
											</Link>
											<div className="mt-[6px] text-[12px] leading-[19px]">
												Color
											</div>
											<NumberField
												value={0}
												className="mt-[6px] font-bold leading-[14px]"
											/>
											{/* cart buttons */}
											<div className="mt-[10px] flex items-center gap-[12px]">
												<div className="flex h-[30px] w-[86px] justify-between overflow-hidden rounded-[3px] bg-[#f2f2f2] text-[0.875rem]">
													<span className="flex h-[30px] w-[27px] cursor-pointer items-center justify-center text-primary transition-[all_0.3s_ease]">
														<Minus size={20} />
													</span>
													<input
														type="text"
														min={1}
														value={1}
														name="number"
														className="h-[30px] w-[30px] border-0 bg-transparent p-0 text-center text-[12px] font-bold leading-[30px] text-primary"
													/>
													<span className="flex h-[30px] w-[27px] cursor-pointer items-center justify-center text-primary transition-[all_0.3s_ease]">
														<Plus size={20} />
													</span>
												</div>

												<div className="cursor-pointer text-[12px] leading-[19px] text-primary underline">
													Xóa
												</div>
											</div>
										</div>
									</div>
									{index !== 9 && <Separator />}
								</div>
							))}
						</div>
					</div>

					{/* Fixed Footer */}
					<SheetFooter className="mt-4 flex flex-shrink-0 !flex-col">
						<div className="flex justify-between">
							<div className="text-[20px]">Tổng cộng:</div>
							<NumberField
								className="text-[20px] font-bold leading-[32px]"
								value={0}
							/>
						</div>
						<Separator className="!my-4" />

						<div className="!m-0 grid w-full grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="w-full rounded-[3px]"
								type="button"
								onClick={() => navigate('/view-cart')}
							>
								Giỏ hàng
							</Button>
							<Button className="w-full rounded-[3px]" type="button">
								Thanh toán
							</Button>
						</div>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default ShoppingCart
