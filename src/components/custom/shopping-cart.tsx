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
import ProductHelper from '@/shared/helpers/product.helper'
import { useCartStore } from '@/shared/hooks/use-cart-store'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '../ui/separator'
import { NumberField } from './number-field'

const ShoppingCart = () => {
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()
	const { items, decrease, add, deleteOne } = useCartStore()
	const totalCartPrice = ProductHelper.getTotalCartPrice(items)

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full border-transparent bg-transparent"
				>
					<div className="relative">
						<ShoppingBag size={18} />
						<div className="absolute -right-2 -top-2 rounded-full bg-destructive px-[5px] py-[1px] text-xs font-bold text-white">
							{items.length}
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
							{items.length > 0 ? (
								items.map((item, index) => (
									<div key={item.id}>
										<div className="my-0 flex gap-[24px] px-0 py-[20px]">
											{/* image */}
											<Link
												to={`product-detail/${item.id}`}
												state={{ data: item }}
												className="inline-block h-[110px] w-[80px] cursor-pointer text-primary no-underline transition-[all_0.3s_ease]"
											>
												<img
													src={item.image}
													alt={`cart-image-${item.id}`}
													className="h-full w-full max-w-full object-cover align-middle text-transparent"
												/>
											</Link>

											<div>
												<Link
													to={`product-detail/${item.id}`}
													className="block cursor-pointer text-base text-primary no-underline transition-[all_0.3s_ease]"
												>
													{item.name}
												</Link>
												<div className="mt-[6px] text-[12px] leading-[19px]">
													{item.color.name} / {item.size.name}
												</div>
												<NumberField
													value={item.size.price}
													className="mt-[6px] font-bold leading-[14px]"
												/>
												{/* cart buttons */}
												<div className="mt-[10px] flex items-center gap-[12px]">
													<div className="flex h-[30px] w-[86px] justify-between overflow-hidden rounded-[3px] bg-[#f2f2f2] text-[0.875rem]">
														<span
															className="user-select-none flex h-[30px] w-[27px] cursor-pointer select-none items-center justify-center text-primary transition-[all_0.3s_ease]"
															onClick={() => decrease(item)}
														>
															<Minus size={20} />
														</span>
														<input
															type="text"
															min={1}
															value={item.quantity}
															name="number"
															className="h-[30px] w-[30px] border-0 bg-transparent p-0 text-center text-[12px] font-bold leading-[30px] text-primary"
															readOnly
														/>
														<span
															className="user-select-none flex h-[30px] w-[27px] cursor-pointer select-none items-center justify-center text-primary transition-[all_0.3s_ease]"
															onClick={() =>
																add({
																	...item,
																	quantity: 1,
																})
															}
														>
															<Plus size={20} />
														</span>
													</div>

													<div
														className="cursor-pointer text-[12px] leading-[19px] text-primary underline"
														onClick={() => deleteOne(item.id)}
													>
														Xóa
													</div>
												</div>
											</div>
										</div>
										{index !== items.length - 1 && <Separator />}
									</div>
								))
							) : (
								<div className="mt-[15px] flex flex-col gap-2 p-[15px]">
									<div className="text-center text-[16px]">
										Giỏ hàng của bạn đang trống
									</div>
									<Button
										className="w-full rounded-[3px]"
										onClick={() => {
											navigate('/shop')
											setIsOpen(false)
										}}
									>
										Mua sắm ngay
									</Button>
								</div>
							)}
						</div>
					</div>

					{/* Fixed Footer */}
					<SheetFooter className="mt-4 flex flex-shrink-0 !flex-col">
						<div className="flex justify-between">
							<div className="text-[20px]">Tổng cộng:</div>
							<NumberField
								className="text-[20px] font-bold leading-[32px]"
								value={totalCartPrice}
							/>
						</div>
						<Separator className="!my-4" />

						<div className="!m-0 grid w-full grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="w-full rounded-[3px]"
								type="button"
								onClick={() => {
									navigate('/view-cart')
									setIsOpen(false)
								}}
							>
								Giỏ hàng
							</Button>
							<Button
								className="w-full rounded-[3px]"
								type="button"
								onClick={() => {
									navigate('/checkout', {
										preventScrollReset: true,
									})
									setIsOpen(false)
								}}
							>
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
